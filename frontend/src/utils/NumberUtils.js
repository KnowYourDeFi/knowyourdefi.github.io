
function numberWithCommas(x) {
  const parts = parseFloat(x).toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  return parts.join(".")
}

export { numberWithCommas }
