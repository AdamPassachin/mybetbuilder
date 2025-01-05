// Function to convert odds to decimal or fractional
export const convertOdds = (odds, format) => {
  // Handle fractional to decimal conversion
  if (format === 'decimal' && typeof odds === 'string' && odds.includes('/')) {
    const [numerator, denominator] = odds.split('/').map(Number);
    return (numerator / denominator) + 1;
  }
  
  // Original decimal to fractional conversion
  if (format === 'fractional') {
    const decimalOdds = parseFloat(odds) - 1;
    let numerator = Math.round(decimalOdds * 100);
    let denominator = 100;
    
    // Simplify the fraction
    const gcd = (a, b) => b ? gcd(b, a % b) : a;
    const divisor = gcd(numerator, denominator);
    numerator = numerator / divisor;
    denominator = denominator / divisor;
    
    return `${numerator}/${denominator}`;
  }

  return odds;
}; 