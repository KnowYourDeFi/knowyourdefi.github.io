import React from 'react'
import PropTypes from 'prop-types';
import classNames from 'classnames'
import './DropDownWithDelete.scss'

class DropDownWithDelete extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      showDropDown: false,
      options: props.options,
      value: props.value,
    }

    this.dropdown = React.createRef()
    this.onExpandClick = this.onExpandClick.bind(this)
    this.onItemClick = this.onItemClick.bind(this)
    this.onDeleteClick = this.onDeleteClick.bind(this)
    this.onClickOutside = this.onClickOutside.bind(this)
  }

  getOptions() {
    return this.state.options
  }

  getValue() {
    return this.state.value
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.onClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.onClickOutside);
  }

  onClickOutside(event) {
    if (this.state.showDropDown && this.dropdown && !this.dropdown.current.contains(event.target)) {
      event.stopPropagation()
      this.setState({
        showDropDown: false
      })
    }
  }

  addOption(option) {
    const options = [option, ...this.state.options]
    this.setState({
      options: options,
      value: option,
    })
    this.props.onOptionsChange(options)
    this.props.onValueChange(option)
  }

  onExpandClick() {
    const show = this.state.options.length === 0 ? false : !this.state.showDropDown
    this.setState({
      showDropDown: show
    })
  }

  onItemClick(option) {
    if (option === this.state.value) {
      this.setState({
        showDropDown: false,
      })
    } else {
      this.setState({
        value: option,
        showDropDown: false,
      })
      this.props.onValueChange(option)
    }
  }

  onDeleteClick(option) {
    const options = this.state.options
    const index = options.indexOf(option)
    if (index === -1) {
      return
    }
    options.splice(index, 1)
    if (options.indexOf(this.state.value) === -1) {
      // value changed
      const newValue = options[0]
      this.setState({
        options: options,
        value: newValue,
      })
      this.props.onOptionsChange(options)
      this.props.onValueChange(newValue)
    } else {
      // value not change
      this.setState({
        options: options,
      })
      this.props.onOptionsChange(options)
    }
  }

  options() {
    return (this.state.options || []).map(option => {
      return (
        <li className={classNames({ 'm-option': true, selected: option === this.state.value })} onClick={(e) => { e.preventDefault(); this.onItemClick(option) }} key={option}>
          <span className="m-option-text">{option}</span>
          <button className="m-option-delete" onClick={(e) => { e.preventDefault(); this.onDeleteClick(option) }}>x</button>
        </li>
      )
    })
  }

  render() {
    return (
      <div ref={this.dropdown} className={classNames("m-dropdown", this.props.mClassName)}>
        <div className="m-box" onClick={this.onExpandClick}>
          <input className="m-box-value" placeholder={this.props.placeholder} readOnly value={this.state.value || ''}></input>
          <div className="m-box-expand" >
            <i className="m-arrow-down"></i>
          </div>
        </div>
        <ul className={classNames({ 'm-options': true, show: this.state.showDropDown })}>
          {this.options()}
        </ul>
      </div>
    )
  }
}

DropDownWithDelete.propTypes = {
  mClassName: PropTypes.string,
  options: PropTypes.array,
  value: PropTypes.string,
  onOptionsChange: PropTypes.func,
  onValueChange: PropTypes.func,
};

DropDownWithDelete.defaultProps = {
  options: [],
  value: null,
  onOptionsChange: function(options) { console.log('on options change', options)},
  onValueChange: function (value) { console.log('on value change', value) },
};

export default DropDownWithDelete
