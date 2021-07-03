import React from 'react'
import PropTypes from 'prop-types'
import './ColorProgressBar.scss'

class ColorProgressBar extends React.Component {

  indicatorTextWidth = 100
  indicatorWidth = 2

  render() {
    let max = 0
    this.props.range.forEach(item => {
      max += item.size
    })
    const percent = Math.round(this.props.progress * 100 / max);
    console.log('current, percent, max', this.props.progress, percent, max)
    const barHtml = this.props.range.map((item, i) => {
      return (
        <div className="range" key={i} style={{ backgroundColor: item.color, flexGrow: item.size }}>
          {item.text}
        </div>
      )
    })
    return (
      <div className="color-progress-bar">
        <div className="bar">
          {barHtml}
        </div>
        <div className="indicator-text" style={{ width: this.indicatorTextWidth, marginLeft: `calc(${percent}% - ${this.indicatorTextWidth / 2}px)` }}>
          {this.props.progress}%
        </div>
        <div className="indicator" style={{ width: this.indicatorWidth, marginLeft: `calc(${percent}% - ${this.indicatorWidth / 2}px)` }}>
        </div>
      </div>
    )
  }
}

ColorProgressBar.propTypes = {
  progress: PropTypes.number,
  range: PropTypes.array, // [{size: 50, color: red, text: 'Killed'}]
}

ColorProgressBar.defaultProps = {
  progress: 66,
  range: [{
    size: 125,
    color: 'rgb(250, 127, 102)',
    text: 'Killed',
  }, {
    size: 125,
    color: 'rgb(247, 230, 80)',
    text: 'High Risk',
  }, {
    size: 125,
    color: 'rgb(175, 226, 76)',
    text: 'Master',
  }, {
    size: 125,
    color: 'rgb(134, 223, 79)',
    text: 'Healthy',
  }]
}

export default ColorProgressBar
