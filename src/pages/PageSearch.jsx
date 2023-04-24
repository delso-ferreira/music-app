import React, { Component } from 'react';
import Header from '../components/Header';

class PageSearch extends Component {
  state = {
    searchButtonDisabled: true,
    name: '',
  };

  handleSearch = () => {
    const { name } = this.state;

    const maxNumber = 2;
    const minLength = name.length >= maxNumber;

    this.setState({
      searchButtonDisabled: !minLength,
    });

    handleInputChange = ({ target: { value } }) => {
      this.setState({
        [name]: value,
      }, this.handleSearch);
    };
  };

  render() {
    const { searchButtonDisabled, name } = this.state;

    return (
      <>
        <Header />
        <div data-testid="page-search">PageSearch</div>
        <form>
          <label htmlFor="artista">
            Artista
          </label>
          <input
            type="text"
            name={ name }
            data-testid="search-artist-input"
          />
          <button
            type="button"
            name="searchButtonDisabled"
            data-testid="search-artist-input"
            disabled={ searchButtonDisabled }
          >
            Buscar
          </button>
        </form>
      </>
    );
  }
}

export default PageSearch;
