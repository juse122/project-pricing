// Current VAT percentage
export const VAT = 0.19

// DHL services and surcharges 2025
export const ONE_KILO = 4.60
export const THREE_KILO = 5.15
export const FIVE_KILO = 6.20
export const TEN_KILO = 8.25
export const TWENTY_KILO = 13.15
export const MAX_KILO = 15.90

export const SMALL_PARCEL = 3.19
export const RETURN = 6.19

export const INSURANCE = 6.99
export const INSURANCE_BIG = 19.99
export const PERSONAL_HANDOVER = 1.69
export const ROUTING = 1.99
export const ROUTING_SMALL = 1.49

export const ENERGY_SURCHARGE = 1.0125
export const EMISSION_SURCHARGE = 0.19
export const PEAK_SURCHARGE = 0.19 // November and December
export const PEAK_IN_PEAK_SURCHARGE = 0.50 // The 2 weeks surrounding Black Friday and Cyber Monday

export const platformData: Platform[] = [
  {
    id: 0,
    name: "OTTO Market",
    percentageProvision: 15.00,
    flatProvision: 0.00,
    shippingCost: 6.99
  },
  {
    id: 1,
    name: "Kaufland",
    percentageProvision: 13.00,
    flatProvision: 0.00,
    shippingCost: 6.99
  },
  {
    id: 2,
    name: "Cardmarket",
    percentageProvision: 4.20,
    flatProvision: 0.00,
    shippingCost: 7.19
  }
]
