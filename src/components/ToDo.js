import React from 'react'
import ReactDOM from 'react-dom'

import data from '../data'

const ALL = data.CONSTANTS.ALL,
      REMAINED = data.CONSTANTS.REMAINED,
      COMPLETED = data.CONSTANTS.COMPLETED

export default class ToDo extends React.Component {

  componentWillMount () {
    this.state = {
      filter: ALL,
      allDone: false,
      items:  [] || data.items
    }
  }

  _toUpperCase (text) {
    text = (text.charAt(0) === ' ') ? text.replace(' ', '') : text
    return text.replace(
      text.charAt(0),
      text.charAt(0).toUpperCase()
    )
  }

  addItem (e) {
    if (e.keyCode == 13 && e.target.value) {
      this.state.items.unshift({
        text: this._toUpperCase(e.target.value),
        done: false,
        editing: false
      })
      this.setState({
        items: this.state.items
      })
      e.target.value = ""
    }
  }

  removeItem (index) {
    this.state.items.splice(index, 1)
    this.setState({
      items: this.state.items
    })
  }

  setItemIsEditable (index) {
    this.state.items[index].editing = true
    this.setState({items: this.state.items})
  }

  editItem (index, e) {
    this.state.items[index].text = this._toUpperCase(e.target.value)
    this.setState({items: this.state.items})
  }

  saveEditedItem (index, e) {
    if (e.type == 'keyup') {
      if (e.keyCode == 13 || e.keyCode == 27) {
        this.state.items[index].editing = false
        this.setState({items: this.state.items})
      }
    } else {
      this.state.items[index].editing = false
      this.setState({items: this.state.items})
    }
  }

  toggleMarkAsDone (index) {
    this.state.items[index].done = (!this.state.items[index].done) ? true : false
    this.setState({
      items: this.state.items
    })
  }

  toggleMarkAllAsDone () {
    let allDone = (!this.state.allDone) ? true : false
    this.setState({
      allDone,
      items: this.state.items.map((item) => {
        item.done = allDone
        return item
      })
    })
  }

  switchItemsFilter (filter) {
    this.setState({filter})
  }

  filterItems (filter) {
    switch (filter) {
      case ALL:
        return this.state.items
      case REMAINED:
        return this.state.items.filter((item) => {
          return item.done === false
        })
      case COMPLETED:
        return this.state.items.filter((item) => {
          return item.done === true
        })
    }
  }

  renderItems () {
    return this.filterItems(this.state.filter)
      .map((item, index) => {
        if (item.editing) {
          return (
            <input
              autoFocus={true}
              key={index}
              value={this.state.items[index].text}
              type="text"
              onChange={this.editItem.bind(this, index)}
              onKeyUp={this.saveEditedItem.bind(this, index)}
              onBlur={this.saveEditedItem.bind(this, index)}
            />
          )
        } else {
          let classes = (item.done) ? 'item-is-done' : null
          let colors = (item.done)
            ? {circle: '#bddad5', path: '#5dc2af'}
            : {circle: 'rgba(0, 0, 0, 0.1)', path: 'rgba(0, 0, 0, 0)'}

          return (
            <li key={index} className={classes}
              onDoubleClick={this.setItemIsEditable.bind(this, index)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="control toggle-done"
                onClick={this.toggleMarkAsDone.bind(this, index)}
                width="36" height="36"
                viewBox="-10 -18 100 135"
              >
                <circle cx="50" cy="50" r="50" fill="none" stroke={colors.circle} strokeWidth="3"/>
                <path fill={colors.path} d="M72 25L42 71 27 56l-4 4 20 20 34-52z"/>
              </svg>
              <span>{item.text}</span>
              <i className="control remove"
                onClick={this.removeItem.bind(this, index)}
              >
                &#x000D7;
              </i>
            </li>
          )
        }
      })
  }

  clearAllCompleted (e) {
    e.preventDefault()
    this.state.items = this.state.items.filter((item) => {
      return item.done !== true
    })
    this.setState(this.state.items)
  }

  renderItemsForm () {
    let completeAll = (this.state.items.length)
      ? <i className="control" onClick={this.toggleMarkAllAsDone.bind(this)}>&#x025BE;</i>
      : false
    return (
      <div className="input-form">
        {completeAll}
        <input autoFocus={true} type="text" onKeyUp={this.addItem.bind(this)} />
      </div>
    )
  }

  renderFilters () {
    if (this.state.items.length) {
      let remainedItemsNumber = this.filterItems(REMAINED).length || false
      if (remainedItemsNumber) {
        remainedItemsNumber = (remainedItemsNumber > 1)
          ? <span>{remainedItemsNumber} items left</span>
          : <span>{remainedItemsNumber} item left</span>
      }

      let clearCompleted = this.filterItems(COMPLETED).length
        ? <a onClick={this.clearAllCompleted.bind(this)} href="#">Clear completed</a>
        : false

      return (
        <div className={`filters-block-wrapper`}>
          <div className="column">{remainedItemsNumber}</div>
          <div className={`filters-block ${this.state.filter} column center`}>
            <button onClick={this.switchItemsFilter.bind(this, ALL)}>All</button>
            <button onClick={this.switchItemsFilter.bind(this, REMAINED)}>Remained</button>
            <button onClick={this.switchItemsFilter.bind(this, COMPLETED)}>Completed</button>
          </div>
          <div className="column right">{clearCompleted}</div>
        </div>
      )
    }
    return false;
  }

  renderStyles () {
    return {__html:`
      .filters-block-wrapper .filters-block.${ALL} button:first-child {background-color: #ce1e00; color: #fff;}
      .filters-block-wrapper .filters-block.${REMAINED} button:nth-child(2) {background-color: #ce1e00; color: #fff;}
      .filters-block-wrapper .filters-block.${COMPLETED} button:last-child {background-color: #ce1e00; color: #fff;}
    `}
  }

  render () {
    return (
      <div>
        <div className="panel">
          <h3>Things to achieve</h3>
        </div>
        <div className="todo-app">
          <div className="dynamic-block">
            {this.renderItemsForm()}
            <ul>
              {this.renderItems()}
            </ul>
            {this.renderFilters()}
          </div>
        </div>
        <style dangerouslySetInnerHTML={this.renderStyles()}></style>
      </div>
    )
  }
}