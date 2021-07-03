import React from 'react'
import PropTypes from 'prop-types'
import './ColorProgressBar.scss'

class ColorProgressBar extends React.Component {

  indicatorTextWidth = 100
  rangeLabelWidth = 100
  indicatorWidth = 2

  render() {
    let sum = 0
    const ranges = [0]
    this.props.range.forEach(item => {
      sum += item.size
      ranges.push(sum)
    })
    const percent = Math.round(Math.min(this.props.progress * 100 / sum, 100));
    // console.log('current, percent, max', this.props.progress, percent, sum)
    const barHtml = this.props.range.map((item, i) => {
      const descHtml = item.desc ? <div className="range-desc">{item.desc}</div> : null
      return (
        <div className="range" key={i} style={{ backgroundColor: item.color, flexGrow: item.size }}>
          <div className="range-name">{item.name}</div>
          {descHtml}
        </div>
      )
    })
    const labelsHtml = ranges.map((range, i) => {
      return (
        <span className="range-label" key={i} style={{ width: this.rangeLabelWidth, marginLeft: `calc(${Math.round(range * 100 / sum)}% - ${this.rangeLabelWidth / 2}px)` }}>
          {range}%
        </span>
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
        {labelsHtml}
      </div>
    )
  }
}

ColorProgressBar.propTypes = {
  progress: PropTypes.number,
  range: PropTypes.array, // [{size: 50, color: red, name: 'Killed'}]
}

ColorProgressBar.defaultProps = {
  progress: 66,
  range: [{
    size: 125,
    color: 'rgb(250, 127, 102)',
    name: 'Killed',
  }, {
    size: 125,
    color: 'rgb(247, 230, 80)',
    name: 'High Risk',
  }, {
    size: 125,
    color: 'rgb(175, 226, 76)',
    name: 'Master',
  }, {
    size: 125,
    color: 'rgb(134, 223, 79)',
    name: 'Healthy',
  }]
}

export default ColorProgressBar
