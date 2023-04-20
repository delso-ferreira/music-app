import React, { Component } from 'react';
import Header from '../components/Header';

class PageFavorites extends Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-favorites">PageFavorites</div>
      </>
    );
  }
}

export default PageFavorites;
