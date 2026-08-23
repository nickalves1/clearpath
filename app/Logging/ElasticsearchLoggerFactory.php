<?php

namespace App\Logging;

use Elastic\Elasticsearch\ClientBuilder;
use Monolog\Formatter\ElasticsearchFormatter;
use Monolog\Handler\ElasticsearchHandler;
use Monolog\Level;
use Monolog\Logger;

class ElasticsearchLoggerFactory
{
    /**
     * Create a Monolog instance that ships log records to Elasticsearch.
     *
     * @param  array<string, mixed>  $config
     */
    public function __invoke(array $config): Logger
    {
        $client = ClientBuilder::create()
            ->setHosts([$config['host']])
            ->build();

        $handler = new ElasticsearchHandler(
            client: $client,
            options: [
                'index' => $config['index'] ?? 'clearpath-patients',
                'ignore_error' => false,
            ],
            level: Level::fromName($config['level'] ?? 'debug'),
        );
        $handler->setFormatter(new ElasticsearchFormatter($config['index'] ?? 'clearpath-patients', '_doc'));

        return new Logger('elasticsearch', [$handler]);
    }
}
