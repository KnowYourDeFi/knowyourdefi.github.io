
const symbols = ["", "k", "m", "b", "t", "q"]
export const abbreviateNumber = (number, fixed = 1) => {

    // what tier? (determines symbol)
    var tier = Math.log10(Math.abs(number)) / 3 | 0

    // if zero, we don't need a suffix
    if(tier === 0) return number;
    // get suffix and determine scale
    tier = Math.min(tier, symbols.length - 1)
    var suffix = symbols[tier];
    var scale = Math.pow(10, tier * 3);

    // scale the number
    var scaled = number / scale;

    // format number and add suffix, use the parseFloat function to remove trailing zeros
    return parseFloat(scaled.toFixed(fixed)) + suffix;
}

