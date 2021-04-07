import fluentLogger from 'fluent-logger';

export const analyticsLogger = fluentLogger;

analyticsLogger.configure('analytics', {
    host: 'localhost',
    port: 24224,
    timeout: 3.0,
    reconnectInterval: 600000 // 10 minutes
});