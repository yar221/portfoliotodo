import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';

import './app.css';
import AddButton from '../add-button/add-button';

export default class App extends Component {

  maxId = 100

  state = {
    todoData: [
      this.createItem('Drink Coffee'),
      this.createItem('Make Awesome App'),
      this.createItem('Have a lunch'),
  ],
  searchText: '',
  filter: 'all'
  }

  createItem(label){
    return{
      label,
      important: false,
      done: false,
      id: this.maxId++
    }
  }

  toggleProperty(arr, id, propName){
      const idx = arr.findIndex((el) => el.id === id)
      
      const oldItem = arr[idx]
      const newItem = {...oldItem, [propName]: !oldItem[propName]}
      return[
        ...arr.slice(0, idx), newItem,...arr.slice(idx + 1)
      ]
      
  }

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return{
        todoData: this.toggleProperty(todoData, id, 'important')
      }
    })
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return{
        todoData: this.toggleProperty(todoData, id, 'done')
      }
    })
  }

  addNewItem = (text) => {
    const newItem = this.createItem(text)

    this.setState(({todoData}) => {
      const newArr = [...todoData, newItem]
      return{
        todoData: newArr
      }
    
    })
    

  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)

      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]

      return{
        todoData: newArray
      }
    })
  }

  searchInput = (searchText) => {
    this.setState({ searchText })
  }

  searchItems(items, search) {
    if (search.length === 0) {
      return items;
    }

    return items.filter((item) => {
      return item.label.toLowerCase().indexOf(search.toLowerCase()) > -1;
    });
  }

  filterItems(items, filter){
    switch(filter){
      case 'all': 
        return items
      case 'active': 
        return items.filter((el) => !el.done)
      case 'done': 
        return items.filter((el) => el.done)
      default:
        return items  
    }
  }

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  render(){
    const {todoData, searchText, filter} = this.state

    const visibleItems = this.filterItems(this.searchItems(todoData, searchText), filter)
    
    const doneCount = todoData.filter((el) => el.done).length
    const todoCount = todoData.length - doneCount

    return (
    <div className="todo-app">
      <AppHeader toDo={todoCount} done={doneCount} />
      <div className="top-panel d-flex">
        <SearchPanel searchInput = {this.searchInput}/>
        <ItemStatusFilter filter = {filter} onFilterChange = {this.onFilterChange}/>
      </div>

      <TodoList 
      todos={visibleItems} 
      onDeleted = {this.deleteItem}
      onToggleImportant = {this.onToggleImportant}
      onToggleDone = {this.onToggleDone}
      />
      <AddButton addNewItem = {this.addNewItem}/>
    </div>
  );
  }

  
};