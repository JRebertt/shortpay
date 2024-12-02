/**
 * Converte um valor em reais (ex: 5.00) para centavos (ex: 500)
 * @param amount Valor em reais como número decimal
 * @returns Valor em centavos como int32
 */
export function toCents(amount: number): number {
  return Math.round(amount * 100)
}

/**
 * Converte um valor em centavos (ex: 500) para reais (ex: 5.00)
 * @param cents Valor em centavos como número inteiro
 * @returns Valor em reais como número decimal
 */
export function fromCents(cents: number): number {
  return cents / 100
}
