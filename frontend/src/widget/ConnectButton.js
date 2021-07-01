import React from 'react'
import PropTypes from 'prop-types';
import './ConnectButton.scss'
import { log } from '../utils/DebugUtils';

class ConnectButton extends React.Component {

  render() {
    return (
      <div className="connect-button" onClick={this.props.onClick}>
        {this.props.text}
      </div>
    )
  }
}

ConnectButton.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
}

ConnectButton.defaultProps = {
  text: 'Button',
  onClick: function () { log('on click') }
}

export default ConnectButton
