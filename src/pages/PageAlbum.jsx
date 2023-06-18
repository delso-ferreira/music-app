import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import './pagealbum.css';

class PageAlbum extends Component {
  state = {
    musics: [],
    album: {},
    isLoading: false,
  };

  componentDidMount() {
    this.musicRequisition();
  }

  musicRequisition = async () => {
    const { match: { params: { id } } } = this.props;
    // https://v5.reactrouter.com/web/api/match
    const albumList = await getMusics(id);

    this.setState({
      musics: albumList.slice(1),
      album: albumList[0],
    });
  };

  render() {
    const { album, isLoading, musics } = this.state;
    return (
      <div className="page__album-container">
        <Header />
        <div className="page-album">
          {/* <img src={ album.artworkUrl100 } alt={ album.artistName } /> */}
          <h1 className="artist-name">{ album.artistName }</h1>
          <p className="album-name">{ album.collectionName }</p>
          { isLoading
            ? <Loading />
            : musics.map((music) => (
              <div
                key={ music.trackName }
                className="page__album-map"
              >
                <MusicCard
                  trackId={ music.trackId }
                  previewUrl={ music.previewUrl }
                  trackName={ music.trackName }
                />
              </div>
            ))}
        </div>
      </div>
    );
  }
}

PageAlbum.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default PageAlbum;
