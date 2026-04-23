export const calculatedAmountWhitInterest = (baseAmount: number, createdAt: Date) => {
  const now = new Date();
  const day = now.getDay()


  if(day <= 15) return baseAmount;
  if(day <= 21) return Math.round(baseAmount * 1.10) // 10%

  return Math.round(baseAmount * 1.15) // 15%

}