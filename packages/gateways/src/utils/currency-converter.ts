export class CurrencyConverter {
  static toCents(value: number): number {
    return Math.round(value * 100)
  }

  static toReais(value: number): number {
    return value / 100
  }
}
