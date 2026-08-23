<?php

namespace App\Logging;

use Aws\CloudWatchLogs\CloudWatchLogsClient;
use Maxbanton\Cwh\Handler\CloudWatch;
use Monolog\Formatter\JsonFormatter;
use Monolog\Level;
use Monolog\Logger;

class CloudWatchLoggerFactory
{
    /**
     * Create a Monolog instance that ships log records to AWS CloudWatch Logs.
     *
     * @param  array<string, mixed>  $config
     */
    public function __invoke(array $config): Logger
    {
        $client = new CloudWatchLogsClient([
            'region' => config('services.aws.region'),
            'version' => 'latest',
            'credentials' => [
                'key' => (string) config('services.aws.key'),
                'secret' => (string) config('services.aws.secret'),
            ],
        ]);

        // This app writes logs in short-lived processes (an HTTP request, one
        // queue job) rather than a long-running worker, so a low batch size
        // is used to flush every record immediately instead of waiting for
        // the buffer to fill (which may never happen before the process ends).
        $handler = new CloudWatch(
            client: $client,
            group: $config['group'],
            stream: $config['stream'],
            retention: $config['retention'] ?? 14,
            batchSize: 1,
            level: Level::fromName($config['level'] ?? 'debug'),
        );
        $handler->setFormatter(new JsonFormatter);

        return new Logger('cloudwatch', [$handler]);
    }
}
