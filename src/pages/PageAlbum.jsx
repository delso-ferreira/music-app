import React, { Component } from 'react';
import Header from '../components/Header';

class PageAlbum extends Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-album">PageAlbum</div>
      </>
    );
  }
}

export default PageAlbum;
