import { Global, Module } from '@nestjs/common';

import { SentryLogger } from './logger.service';

@Global()
@Module({
  providers: [SentryLogger],
  exports: [SentryLogger],
})
export class LoggerModule {}
