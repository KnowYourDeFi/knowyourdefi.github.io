import React from 'react'
import PropTypes from 'prop-types';
import './ColorProgressBar.scss'

class ColorProgressBar extends React.Component {

  indicatorTextHeight = 40
  indicatorTextWidth = 80
  indicatorWidth = 2

  render() {
    return (
      <div class="color-progress-bar">
        <div class="bar">
          <div class="range" style={{background: 'rgb(250, 127, 102)'}}>
          </div>
          <div class="range" style={{background: 'rgb(247, 230, 80)'}}>
          </div>
          <div class="range" style={{background: 'rgb(175, 226, 76)'}}>
          </div>
          <div class="range" style={{background: 'rgb(134, 223, 79)'}}>
          </div>
        </div>
        <div class="indicator-text" style={{marginLeft: `calc(${this.props.progress}% - ${this.indicatorTextWidth/2}px)`}}>
          {this.props.progress}%
        </div>
        <div class="indicator" style={{marginLeft: `calc(${this.props.progress}% - ${this.indicatorWidth/2}px)`}}>
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
