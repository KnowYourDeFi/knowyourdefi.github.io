import React from 'react'
import PropTypes from 'prop-types';
import './ConnectButton.scss'

class ConnectButton extends React.Component {

  render() {
    return (
      <a class="connect-button" href="#" onClick={this.props.onClick}>
        {text}
      </a>
    )
  }
}

ColorProgressBar.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
};

ColorProgressBar.defaultProps = {
  text: 'Button',
  onClick: function () { console.log('onClick') }
};

export default ConnectButton
