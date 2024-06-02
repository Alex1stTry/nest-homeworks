import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Sentry from '@sentry/node';
import { nodeProfilingIntegration } from '@sentry/profiling-node';

import { Config, SentryConfig } from '../../configs/configs.type';

@Injectable()
export class SentryLogger {
  private isLocal: boolean;
  private readonly logger = new Logger();
  constructor(private readonly configService: ConfigService<Config>) {
    const sentryConfig = configService.get<SentryConfig>('sentry');
    this.isLocal = sentryConfig.env === 'local';
    Sentry.init({
      dsn: sentryConfig.dsn,
      integrations: [
        nodeProfilingIntegration(),
        Sentry.anrIntegration({ captureStackTrace: true }),
      ],
      tracesSampleRate: 1.0,
      profilesSampleRate: 1.0,
      debug: sentryConfig.debug,
      environment: sentryConfig.env,
    });
  }
  public log(message: string) {
    if (this.isLocal) {
      this.logger.log(message);
    } else {
      Sentry.captureMessage(message, 'log');
    }
  }

  public error(error: any) {
    if (this.isLocal) {
      this.logger.error(error, error.stack);
    } else {
      Sentry.captureException(error, {
        level: 'error',
      });
    }
  }
  public info(message: string) {
    if (this.isLocal) {
      this.logger.log(message);
    } else {
      Sentry.captureMessage(message, 'info');
    }
  }
  public warn(message: string) {
    if (this.isLocal) {
      this.logger.log(message);
    } else {
      Sentry.captureMessage(message, 'warning');
    }
  }
}
