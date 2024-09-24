import { Module } from '@nestjs/common';
import { CurrencyService } from './currency.service';
@Module({
  controllers: [],
  providers: [CurrencyService],
  exports: [],
})
export class CurrencyModule {}
