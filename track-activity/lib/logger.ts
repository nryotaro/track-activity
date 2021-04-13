import getConfig from 'next/config';
import { v4 as uuidv4 } from 'uuid';
import fluentLogger, { FluentSender } from 'fluent-logger';
import { GetServerSidePropsContext } from 'next';

const { serverRuntimeConfig, } = getConfig();

interface AccessLogger {
    logRequest: (request: object) => void,
}

class NopLogger implements AccessLogger {
    logRequest(request: object): void {
        // NOP
    }
}

class FluentdLogger implements AccessLogger {
    private readonly fluentSender: FluentSender<object>

    constructor(fluentSender: FluentSender<object>) {
        this.fluentSender = fluentSender;
    }

    logRequest(request: object): void {
        const request_id = uuidv4();
        const event = JSON.stringify(request);
        this.fluentSender.emit(
            'request', {
            request_id, request: event, timestamp: new Date().toISOString()
        });
    }
}
function createAccessLogger(): AccessLogger {
    if (serverRuntimeConfig.fluentdHost != null) {
        return new FluentdLogger(fluentLogger.createFluentSender('access', {
            host: serverRuntimeConfig.fluentdHost,
            port: 24224,
            timeout: 3.0,
            reconnectInterval: 600000 // 10 minutes
        }));
    }
    return new NopLogger();
}

const accessLogger: AccessLogger = createAccessLogger();

export function logPageAccess(context: GetServerSidePropsContext) {
    if (maybeRobotUserAgent(context.req.headers['user-agent']))
        return;
    const req = context.req;
    const event = {
        headers: req.headers,
        url: req.url, method: req.method,
        query: context.query,
        resolvedUrl: context.resolvedUrl,
    }
    accessLogger.logRequest(event);
}

function maybeRobotUserAgent(userAgent: undefined | string): boolean {
    if (userAgent == undefined)
        return false;
    return userAgent.toLowerCase().includes('datadog');
}