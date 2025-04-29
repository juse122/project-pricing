export const calculateMarginsWithSellingPrice = (
  sellingPrice: number,
  purchasingPrice: number,
  isNetPurchasingPrice: boolean,
  platformId: number
) => {
  return (price * margin) / 100
}

export const calculateSellingPricesWithPurchasingPrice = (
  purchasingPrice: number,
  margin: number,
  isNetPurchasingPrice: boolean,
  platformId: number
) => {
  return (price * margin) / 100
}

console.log("test", calculateMarginsWithSellingPrice(150, 70, false, 0))
