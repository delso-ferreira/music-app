import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import PageLogin from '../pages/PageLogin';
import PageAlbum from '../pages/PageAlbum';
import PageFavorites from '../pages/PageFavorites';
import PageNotFound from '../pages/PageNotFound';
import PageProfile from '../pages/PageProfile';
import PageProfileEdit from '../pages/PageProfileEdit';
import PageSearch from '../pages/PageSearch';

class main extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={ PageLogin } />
          <Route exact path="/search" component={ PageSearch } />
          <Route exact path="/album/:id" component={ PageAlbum } />
          <Route exact path="/favorites" component={ PageFavorites } />
          <Route exact path="/profile" component={ PageProfile } />
          <Route exact path="/profile/edit" component={ PageProfileEdit } />
          <Route path="*" component={ PageNotFound } />
        </Switch>
      </div>

    );
  }
}

export default main;
