import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import './pagesearch.css';

// criar div pai para encapsular os resulados do card

class PageSearch extends Component {
  state = {
    searchButtonDisabled: true,
    name: '',
    isLoading: false,
    artistList: [],
    collectionId: '',
    retornoAPI: false,
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
      retornoAPI: true,
    });
  };

  render() {
    const { searchButtonDisabled, name, isLoading,
      artistList, collectionId, retornoAPI } = this.state;

    return (
      <div className="page-search">
        <Header />
        <div className="search_label">
          { isLoading
            ? <Loading />
            : (
              <form>
                <label htmlFor="artista">
                  Artist
                  <input
                    type="text"
                    name="artista"
                    id="artista"
                    value={ name }
                    data-testid="search-artist-input"
                    onChange={ this.handleInputChange }
                  />
                </label>
                <div className="search__button-input">
                  <button
                    type="submit"
                    name="searchButtonDisabled"
                    data-testid="search-artist-button"
                    disabled={ searchButtonDisabled }
                    onClick={ this.handleSearch }
                  >
                    Search
                  </button>
                </div>
              </form>)}
          {/* { artistName && <p>{`Resultado de álbuns de: ${artistName}`}</p>} */}
          { isLoading
          && <Loading />}
          { retornoAPI && artistList.length > 0
            ? (
              <div className="search_map">
                {artistList.map((album) => (
                  <div key={ album.artistId } className="search__artist-id">
                    <div data-testid={ `link-to-album${collectionId}` } />
                    <p>{album.artistName}</p>
                    <p>{album.collectionName}</p>
                    <img
                      src={ album.artworkUrl100 }
                      alt={ album.collectionName }
                      className="search__album-image"
                    />
                    <Link
                      to={ `/album/${album.collectionId}` }
                      data-testid={ `link-to-album-${album.collectionId}` }
                    >
                      Album
                    </Link>
                  </div>
                ))}
              </div>
            )
            : <p>No results found</p>}

        </div>
      </div>
    );
  }
}

export default PageSearch;
