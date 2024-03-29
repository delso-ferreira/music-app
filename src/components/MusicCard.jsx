import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import './musiccard.css';

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
    const { trackId, updateFavorites, previewUrl, trackName } = this.props;
    this.setState({
      isLoading: true,
    });
    if (isCheck === false) {
      await addSong({ trackId, previewUrl, trackName });
      this.setState({
        isLoading: false,
        isCheck: true,
      });
    } else {
      await removeSong({ trackId, previewUrl, trackName });
      if (updateFavorites) {
        await updateFavorites();
      }
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
      <div className="music__container">
        { isLoading
          ? <Loading />
          : (
            <div className="music__card-container">
              <h3 className="music__card-trackname">{trackName}</h3>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                Your browser does not support the element
                {' '}
                <code>audio</code>
                .
              </audio>
              <form>
                <label
                  htmlFor={ trackId }
                  data-testid={ `checkbox-music-${trackId}` }
                >
                  Favorite Music
                </label>
                <input
                  type="checkbox"
                  name={ previewUrl }
                  id={ trackId }
                  onChange={ this.handleMusic }
                  checked={ isCheck }
                  className="music__card-favorite"
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
