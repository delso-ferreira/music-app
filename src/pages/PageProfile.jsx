import React, { Component } from 'react';
import Header from '../components/Header';

class PageProfile extends Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-profile">PageProfile</div>
      </>
    );
  }
}

export default PageProfile;
