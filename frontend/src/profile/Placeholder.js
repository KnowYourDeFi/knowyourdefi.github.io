import React from 'react'
import PropType from 'prop-types'
import './Placeholder.scss'

class EmptyPage extends React.Component {

  render() {
    return (
      <div className="empty-page">{this.props.text}</div>
    )
  }
}

EmptyPage.propTypes = {
  text: PropType.string,
}

EmptyPage.defaultProps = {
  text: 'No Ethereum address selected.',
}

class ErrorPage extends React.Component {

  render() {
    return (
      <div className="error-page">{this.props.text}</div>
    )
  }
}

ErrorPage.propTypes = {
  text: PropType.string,
}

ErrorPage.defaultProps = {
  text: 'Sorry, we could not find any DeFi information from this address! Please check it for accuracy!',
}

export { EmptyPage, ErrorPage }
