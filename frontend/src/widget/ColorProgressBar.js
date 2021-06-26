import React from 'react'
import PropTypes from 'prop-types';
import './ColorProgressBar.scss'

class ColorProgressBar extends React.Component {

  indicatorTextHeight = 40
  indicatorTextWidth = 80
  indicatorWidth = 2

  render() {
    return (
      <div className="color-progress-bar">
        <div className="bar">
          <div className="range" style={{background: 'rgb(250, 127, 102)'}}>
          </div>
          <div className="range" style={{background: 'rgb(247, 230, 80)'}}>
          </div>
          <div className="range" style={{background: 'rgb(175, 226, 76)'}}>
          </div>
          <div className="range" style={{background: 'rgb(134, 223, 79)'}}>
          </div>
        </div>
        <div className="indicator-text" style={{marginLeft: `calc(${this.props.progress}% - ${this.indicatorTextWidth/2}px)`}}>
          {this.props.progress}%
        </div>
        <div className="indicator" style={{marginLeft: `calc(${this.props.progress}% - ${this.indicatorWidth/2}px)`}}>
        </div>
      </div>
    )
  }
}

ColorProgressBar.propTypes = {
  progress: PropTypes.number,
};

ColorProgressBar.defaultProps = {
  progress: 66,
};

export default ColorProgressBar
