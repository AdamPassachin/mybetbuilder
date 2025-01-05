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

// Function to format currency with fallback to USD
export const formatCurrency = (amount, currency = 'USD') => {
    try {
        return new Intl.NumberFormat(undefined, {
            style: 'currency',
            currency: currency,
        }).format(amount);
    } catch (error) {
        // Fallback to USD if there's any formatting error
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    }
};

// Function to convert date to hours and minutes format
export const convertTime = (fullDate) => {
    const date = new Date(fullDate);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
};

// Add these arrays at the top of the file
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Function to convert and format the date 
export const convertDateHeader = (fullDate) => {
    const date = new Date(fullDate);
    const day = date.getDay();
    const dateDay = date.getDate();
    const month = date.getMonth();

    // Determine the ordinal suffix
    const suffix = (dateDay) => {
        if (dateDay > 3 && dateDay < 21) return 'th'; // Catch 11th-13th
        switch (dateDay % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    };
    return `${daysOfWeek[day]}, ${dateDay}${suffix(dateDay)} ${months[month]}`;
}; 