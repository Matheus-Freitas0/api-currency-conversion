import {
  Controller,
  Get,
  Patch,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { CurrencyService } from './currency.service';

@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get('convert')
  convertCurrency(
    @Query('amount') amount: number,
    @Query('from') from: string,
    @Query('to') to: string,
  ): { convertedAmount: number } {
    try {
      const convertedAmount = this.currencyService.convertCurrency(
        amount,
        from,
        to,
      );
      return { convertedAmount };
    } catch (error) {
      throw new HttpException('Currency not found', HttpStatus.NOT_FOUND);
    }
  }

  @Get('list')
  getAvailableCurrencies(): string[] {
    return this.currencyService.getAvailableCurrencies();
  }

  @Patch('update-rate')
  updateExchangeRate(
    @Query('code') code: string,
    @Query('newRate') newRate: number,
  ): { message: string } {
    try {
      this.currencyService.updateExchangeRate(code, newRate);
      return { message: `Exchange rate for ${code} updated to ${newRate}` };
    } catch (error) {
      throw new HttpException('Currency not found', HttpStatus.NOT_FOUND);
    }
  }
}
