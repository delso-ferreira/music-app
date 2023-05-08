import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  state = {
    isCheck: false,
    isLoading: false,
  };

  async componentDidMount() {
    // https://stackoverflow.com/questions/47970276/is-using-async-componentdidmount-good
    const queryFavorites = await getFavoriteSongs();
    const { trackId } = this.props;
    const mapAllFavorites = queryFavorites.some((music) => music.trackId === trackId);
    if (mapAllFavorites) {
      this.setState({
        isCheck: true,
      });
    }
  }

  handleMusic = async () => {
    const { isCheck } = this.state;
    const { trackId } = this.props;
    this.setState({
      isLoading: true,
    });
    if (isCheck === false) {
      await addSong(trackId);
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
    const { trackId, previewUrl, trackName } = this.props;
    const { isCheck, isLoading } = this.state;
    return (
      <div>
        { isLoading
          ? <Loading />
          : (
            <div>
              <h3>{trackName}</h3>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                <code>audio</code>
                .
              </audio>
              <form>
                <label
                  htmlFor={ trackId }
                  data-testid={ `checkbox-music-${trackId}` }
                >
                  Favorita
                </label>
                <input
                  type="checkbox"
                  name={ previewUrl }
                  id={ trackId }
                  onChange={ this.handleMusic }
                  checked={ isCheck }
                />
              </form>
            </div>
          )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string,
  trackName: PropTypes.string,
}.isRequired;

export default MusicCard;
