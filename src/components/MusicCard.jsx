import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  state = {
    isCheck: false,
    isLoading: false,
  };

  handleMusic = async ({ target }) => {
    const { checked } = target;
    const { trackId } = this.props;
    this.setState({
      isLoading: true,
      isCheck: checked,
    });
    if (checked) {
      await addSong(trackId);
    }
    this.setState({
      isLoading: false,
    });
  };

  render() {
    const { trackId, previewUrl, trackName } = this.props;
    const { isCheck, isLoading } = this.state;
    return (
      <div>
        <h3>{trackName}</h3>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        { isLoading
          ? <Loading />
          : (
            <div>
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
