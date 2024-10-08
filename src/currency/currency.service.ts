import { Injectable } from '@nestjs/common';
@Injectable()
export class CurrencyService {
  private currencies = [
    { code: 'USD', rate: 1.0 },
    { code: 'EUR', rate: 0.85 },
    { code: 'BRL', rate: 5.25 },
    { code: 'GBP', rate: 0.75 },    
    { code: 'JPY', rate: 110.0 },  
    { code: 'AUD', rate: 1.35 },
  ];

  getAvailableCurrencies(): string[] {
    return this.currencies.map((currency) => currency.code);
  }

  convertCurrency(amount: number, from: string, to: string): number {
    const fromRate = this.currencies.find(
      (currency) => currency.code === from,
    )?.rate;

    const toRate = this.currencies.find(
      (currency) => currency.code === to,
    )?.rate;

    if (!fromRate || !toRate) {
      throw new Error('Currency not found');
    }

    const convertedAmount = (amount / fromRate) * toRate;

    return convertedAmount;
  }
  updateExchangeRate(code: string, newRate: number): void {
    const currency = this.currencies.find(
      (currency) => currency.code === code,
    );

    if (!currency) {
      throw new Error('Currency not found');
    }

    currency.rate = newRate;
    console.log(`Rate for ${code} updated to ${newRate}`);
  }
}
