import React, { Component } from 'react';
import Header from '../components/Header';

class PageSearch extends Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-search">PageSearch</div>
      </>
    );
  }
}

export default PageSearch;
