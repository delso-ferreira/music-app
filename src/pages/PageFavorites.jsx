import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class PageFavorites extends Component {
  state = {
    isLoading: false,
    favorites: [],
    isCheck: false,
  };

  async componentDidMount() {
    this.setState({
      isLoading: true,
    });
    const favSongs = await getFavoriteSongs();
    this.setState({
      isLoading: false,
      favorites: favSongs,
    });
  }

  updateFavorites = async () => {
    const favSongs = await getFavoriteSongs();
    this.setState({
      favorites: favSongs,
    });
  };

  handleFavortes = async () => {
    const { isCheck } = this.state;
    const { trackId } = this.props;
    const favSongs = await getFavoriteSongs();
    this.setState({
      favorites: favSongs,
    });
    if (isCheck === true) {
      this.setState({
        isLoading: false,
        isCheck: true,
      });
    } else {
      await removeSong(trackId);
      this.setState({
        isLoading: false,
        isCheck: false,
      });
    }
  };

  render() {
    const { isLoading, favorites } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {isLoading
          ? <Loading />
          : (favorites.map((favoritas) => (
            <MusicCard
              updateFavorites={ this.updateFavorites }
              trackId={ favoritas.trackId }
              previewUrl={ favoritas.previewUrl }
              trackName={ favoritas.trackName }
              handleFavortes={ this.handleFavortes }
              key={ favoritas.trackId }
            />
          )))}
      </div>
    );
  }
}

PageFavorites.propTypes = {
  trackId: PropTypes.string,
}.isRequired;

export default PageFavorites;
