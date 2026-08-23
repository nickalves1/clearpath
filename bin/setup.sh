#!/usr/bin/env bash
set -e

echo "==> Setting up .env"
if [ ! -f .env ]; then
    cp .env.example .env
fi

echo "==> Building and starting containers"
docker compose up -d --build

echo "==> Waiting for the app container to accept commands"
until docker compose exec -T laravel.test true > /dev/null 2>&1; do
    sleep 2
done

echo "==> Installing PHP dependencies"
docker compose exec -T laravel.test composer install

echo "==> Generating application key"
docker compose exec -T laravel.test php artisan key:generate --force

echo "==> Waiting for the database"
until docker compose exec -T pgsql pg_isready -U "${DB_USERNAME:-sail}" > /dev/null 2>&1; do
    sleep 2
done

echo "==> Running migrations"
docker compose exec -T laravel.test php artisan migrate --force

echo "==> Installing JS dependencies and building assets"
docker compose exec -T laravel.test npm install
docker compose exec -T laravel.test npm run build

echo "==> Starting SonarQube temporarily (to configure a token and prove the scan works)"
docker compose --profile sonar up -d sonarqube sonarqube-db

echo "==> Waiting for SonarQube"
until curl -s http://localhost:9000/api/system/status 2>/dev/null | grep -q '"status":"UP"'; do
    sleep 3
done

echo "==> Generating a SonarQube token"
curl -s -u admin:admin -X POST "http://localhost:9000/api/user_tokens/revoke" -d "name=local-setup" > /dev/null
token=$(curl -s -u admin:admin -X POST "http://localhost:9000/api/user_tokens/generate" -d "name=local-setup" | grep -o '"token":"[^"]*"' | cut -d'"' -f4)
echo "$token" > .sonar-token

echo "==> Running the SonarQube analysis"
docker compose --profile sonar --profile scan run --rm sonar-scanner -Dsonar.token="$token"

echo "==> Stopping SonarQube (on-demand only — see README for how to bring it back)"
docker compose stop sonarqube sonarqube-db

echo ""
echo "Setup complete!"
echo "  App: http://localhost:8000"
echo ""
echo "SonarQube and Kibana don't run by default — see the README for how to"
echo "start them on demand. Postgres, Redis, and Elasticsearch stay up as long"
echo "as Docker is running."
