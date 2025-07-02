// Studio configuration constants
export const WORKING_HOURS = {
  START: 10, // 10am
  END: 22,   // 10pm
} as const

// Pricing structure
export const PRICING = {
  REGULAR: { // Monday to Wednesday
    '1-3': { '1h': 30000, '2h': 50000 },
    '4-5': { '1h': 40000, '2h': 60000 },
    '6+': { '1h': 50000, '2h': 70000 },
  },
  PRIME: { // Thursday to Sunday
    '1-3': { '1h': 40000, '2h': 60000 },
    '4-5': { '1h': 50000, '2h': 70000 },
    '6+': { '1h': 55000, '2h': 80000 },
  },
} as const

export type PricingTier = keyof typeof PRICING
export type GroupSize = keyof typeof PRICING.REGULAR
export type Duration = '1h' | '2h'

export function isPrimeTime(date: Date): boolean {
  const day = date.getDay() // 0 = Sunday, 1 = Monday, etc.
  return day === 0 || day === 4 || day === 5 || day === 6 // Thu, Fri, Sat, Sun
}

export function getGroupSizeCategory(count: number): GroupSize {
  if (count <= 3) return '1-3'
  if (count <= 5) return '4-5'
  return '6+'
}

export function getPrice(date: Date, groupSize: number, duration: Duration): number {
  const tier: PricingTier = isPrimeTime(date) ? 'PRIME' : 'REGULAR'
  const category = getGroupSizeCategory(groupSize)
  return PRICING[tier][category][duration]
}

export function formatPrice(price: number): string {
  return `$${price.toLocaleString('es-CO')}`
}