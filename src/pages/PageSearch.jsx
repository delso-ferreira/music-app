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
    retornoAPI: false,
    artistName: '',
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

  handleSearch = async () => {
    const { name } = this.state;
    this.setState({
      isLoading: true,
      artistList: [],
    });
    const inputSearch = await searchAlbumsAPI(name);
    this.setState({
      isLoading: false,
      name: '',
      artistList: inputSearch,
      artistName: name,
      retornoAPI: true,
    });
  };

  render() {
    const { searchButtonDisabled, name, isLoading,
      artistList, collectionId, retornoAPI, artistName } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        { isLoading
          ? <Loading />
          : (
            <form>
              <label htmlFor="artista">
                Artista
                <input
                  type="text"
                  name="artista"
                  id="artista"
                  value={ name }
                  data-testid="search-artist-input"
                  onChange={ this.handleInputChange }
                />
              </label>
              <button
                type="button"
                name="searchButtonDisabled"
                data-testid="search-artist-button"
                disabled={ searchButtonDisabled }
                onClick={ this.handleSearch }
              >
                Pesquisar
              </button>
            </form>)}
        { artistName && <p>{`Resultado de álbuns de: ${artistName}`}</p>}
        { isLoading
          && <Loading />}
        { retornoAPI && artistList.length > 0
          ? (artistList.map((album) => (
            <div key={ album.artistId }>
              <div data-testid={ `link-to-album${collectionId}` } />
              <p>{album.artistName}</p>
              <p>{album.collectionName}</p>
              <img src={ album.artworkUrl100 } alt={ album.collectionName } />
              <Link
                to={ `/album/${album.collectionId}` }
                data-testid={ `link-to-album-${album.collectionId}` }
              >
                Acessar
              </Link>
            </div>
          ))
          )
          : <p>Nenhum álbum foi encontrado</p>}

      </div>
    );
  }
}

export default PageSearch;
