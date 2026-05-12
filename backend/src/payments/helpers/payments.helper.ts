export const calculatedAmountWhitInterest = (baseAmount: number, createdAt: Date) => {
  const now = new Date();
  // getDate() = day of month (1-31). getDay() = day of week (0-6).
  const day = now.getDate();


  if (day <= 15) return baseAmount;
  if (day <= 21) return Math.round(baseAmount * 1.1); // 10%

  return Math.round(baseAmount * 1.15); // 15%

}
