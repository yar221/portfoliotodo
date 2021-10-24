import React, { Component } from 'react'
import './add-button.css'

export default class AddButton extends Component{
    
    state = {
        label: ''
    }

    onSubmit = (e) => {
        e.preventDefault()
        this.props.addNewItem(this.state.label)
        this.setState({
            label: '' 
        }) 
    }

    onLabelChange = (e) => {
        this.setState({
            label: e.target.value
        })
    }
    render(){
        return(
            <form className = "item-add-form d-flex" onSubmit = {this.onSubmit}>

                <input type = "text" className = "form-control" placeholder = "What needs to be done?" onChange = {this.onLabelChange} value = {this.state.label}></input>

                <button type="button" className ="btn btn-primary button-add" onClick = {this.onSubmit}>Add Item</button>
            </form>
    ) 
    }
}
