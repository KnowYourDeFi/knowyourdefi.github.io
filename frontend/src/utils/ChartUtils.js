export const chartGreen = '#91CC75'
export const chartBlue = '#5470C6'
export const chartRed = '#EE6666'
export const loadingOption = {
    text: '',
    color: '#5470C6',
    maskColor: 'rgba(255, 255, 255, 0.9)',
    showSpinner: true,
    spinnerRadius: 20,
    lineWidth: 5
  }
export const ellipsesStr = (str) => {return str.length > 13 ? str.substr(0, 6) + '...' + str.substr(str.length-4, str.length) : str}
export const toLink = (url, display) => {
    return (
        <a href={url} target="_blank" rel="noreferrer" style={{color: chartBlue}}> {display} </a>
    )
}