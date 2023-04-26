import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class PageSearch extends Component {
  state = {
    searchButtonDisabled: true,
    name: '',
    isLoading: false,
    artistList: [],
    collectionId: '',
  };

  handleValidation = () => {
    const { name } = this.state;

    const maxNumber = 2;
    const minLength = name.length >= maxNumber;

    this.setState({
      searchButtonDisabled: !minLength,
    });
  };

  handleInputChange = ({ target: { value } }) => {
    this.setState({
      name: value,
    }, this.handleValidation);
  };

  callbackFunction = async () => {
    const { name } = this.state;
    const inputSearch = await searchAlbumsAPI(name);
    this.setState({
      isLoading: false,
      name: '',
      artistList: inputSearch,
      collectionId: inputSearch.collectionId,
    });
  };

  handleSearch = async () => {
    this.setState({
      isLoading: true,
    }, this.callbackFunction);
  };

  render() {
    const { searchButtonDisabled, name, isLoading,
      artistList, collectionId } = this.state;

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
            onChange={ this.handleInputChange }
          />
          <button
            type="button"
            name="searchButtonDisabled"
            data-testid="search-artist-input"
            disabled={ searchButtonDisabled }
            onClick={ this.handleSearch }
          >
            Pesquisar
          </button>
        </form>

        { isLoading
          && <Loading />}
        { isLoading === false
          ? artistList.map((album) => (
            <>
              <h1>{`Resultado de álbuns de: ${album}`}</h1>
              <div
                key={ album.artistId }
                data-testid={ `link-to-album${collectionId}` }
              >
                <div>{album.artistName}</div>
                <img src={ album.artworkUrl100 } alt={ album.collectionName } />
              </div>
              <Link
                to={ `/album/${album.collectionId}` }
                data-testid={ `link-to-album-${album.collectionId}` }
              >
                { album.artistName }
              </Link>
            </>
          ))
          : <p>Nenhum álbum foi encontrado</p>}
      </>
    );
  }
}

export default PageSearch;
