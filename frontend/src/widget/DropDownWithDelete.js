import React from 'react'
import PropTypes from 'prop-types';
import classNames from 'classnames'
import './DropDownWithDelete.scss'
import { log } from '../utils/DebugUtils';

class DropDownWithDelete extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      showDropDown: false,
      options: props.options,
      current: props.current,
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

  getCurrent() {
    return this.state.current
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

  addAndSelectOption(current) {
    log('dropdown add select option', current)
    const oldOptions = this.state.options;
    const index = oldOptions.findIndex(o => {
      return this.props.comparator(o, current)
    })
    if (index !== -1) {
      // select option if already exists
      current = oldOptions[index]
      this.setState({ current })
      this.props.onCurrentChange(current)
    } else {
      // add and select option if not exists
      const options = [current, ...oldOptions]
      this.setState({ options, current })
      this.props.onOptionsChange(options)
      this.props.onCurrentChange(current)
    }
  }

  onExpandClick() {
    const show = this.state.options.length === 0 ? false : !this.state.showDropDown
    this.setState({
      showDropDown: show
    })
  }

  onItemClick(option) {
    log('dropdown item click', option)
    if (option === this.state.current) {
      this.setState({
        showDropDown: false,
      })
    } else {
      this.setState({
        current: option,
        showDropDown: false,
      })
      this.props.onCurrentChange(option)
    }
  }

  onDeleteClick(deleted) {
    log('dropdown detete click', deleted)
    const options = this.state.options
    const index = options.findIndex(o => {
      return this.props.comparator(o, deleted)
    })
    if (index === -1) {
      console.error('can not delete non-existent option', deleted)
      return
    }
    log('delete', deleted, options, index)
    options.splice(index, 1)
    if (this.props.comparator(deleted, this.state.current)) {
      // current changed
      const current = options[0]
      this.setState({ options, current })
      this.props.onOptionsChange(options)
      this.props.onCurrentChange(current)
      log('delete reselect', current)
    } else {
      // current not change
      this.setState({ options })
      this.props.onOptionsChange(options)
    }
  }

  renderOptions() {
    return (this.state.options || []).map(option => {
      return (
        <li className={classNames({ 'm-option': true, selected: this.props.comparator(option, this.state.current) })} key={this.props.formatter(option)}>
          <span className="m-option-text" onClick={(e) => { e.preventDefault(); this.onItemClick(option) }}>{this.props.formatter(option)}</span>
          <div className="m-option-delete" onClick={(e) => { e.preventDefault(); this.onDeleteClick(option) }}>x</div>
        </li>
      )
    })
  }

  render() {
    return (
      <div ref={this.dropdown} className={classNames("m-dropdown", this.props.mClassName)}>
        <div className="m-box" onClick={this.onExpandClick}>
          <input className="m-box-value" placeholder={this.props.placeholder} readOnly value={(this.state.current && this.props.formatter(this.state.current)) || ''}></input>
          <div className="m-box-expand">
            <i className="m-arrow-down"></i>
          </div>
        </div>
        <ul className={classNames({ 'm-options': true, show: this.state.showDropDown })}>
          {this.renderOptions()}
        </ul>
      </div>
    )
  }
}

DropDownWithDelete.propTypes = {
  mClassName: PropTypes.string, // extra class name for the root DOM element
  options: PropTypes.array, // all options
  current: PropTypes.oneOfType([PropTypes.string, PropTypes.object]), // current selected option, may be null
  placeholder: PropTypes.string, // placeholder if no option selected
  comparator: PropTypes.func, // compare if two options are the same one
  formatter: PropTypes.func, // format option to string to display
  onOptionsChange: PropTypes.func,
  onCurrentChange: PropTypes.func,
};

DropDownWithDelete.defaultProps = {
  mClassName: null,
  options: [],
  current: null,
  placeholder: null,
  comparator: function (o1, o2) { return o1 === o2; },
  formatter: function (option) { return option; },
  onOptionsChange: function (options) { log('on options change', options) },
  onCurrentChange: function (current) { log('on current change', current) },
};

export default DropDownWithDelete
