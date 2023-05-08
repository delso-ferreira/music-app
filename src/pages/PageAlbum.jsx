import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

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
      <div data-testid="page-album">
        PageAlbum
        <Header />
        <h1 data-testid="artist-name">{ album.artistName }</h1>
        <img src={ album.artworkUrl100 } alt={ album.artistName } />
        <p data-testid="album-name">{ album.collectionName }</p>
        { isLoading
          ? <Loading />
          : musics.map((music) => (
            <div key={ music.trackName }>
              <MusicCard
                trackId={ music.trackId }
                previewUrl={ music.previewUrl }
                trackName={ music.trackName }
              />
            </div>
          ))}
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
