import React, { Component } from 'react';

import './search-panel.css';

export default class SearchPanel extends Component {

  state = {
    term: ''
  };

  searchInput = (e) => {
    const {searchInput = () => {}} = this.props;
    this.setState({
      term: e.target.value
    });

    searchInput(e.target.value);
  };

  render() {
    return (
      <input type="text"
             className="form-control search-input"
             placeholder="type to search"
             value={this.state.term}
             onChange={ this.searchInput } />
    );
  };
}
