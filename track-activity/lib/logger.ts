import getConfig from 'next/config';
import { v4 as uuidv4 } from 'uuid';
import fluentLogger, { FluentSender } from 'fluent-logger';

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
        console.log({
            request_id, request: event, timestamp: new Date().toISOString()
        });
        /*
        this.fluentSender.emit(
            'request', {
            request_id, request: event, timestamp: new Date().toISOString()
        });
        */
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

export const accessLogger: AccessLogger = createAccessLogger();