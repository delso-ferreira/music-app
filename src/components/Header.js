import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  state = {
    isLoading: false,
    findUser: '',
  };

  componentDidMount() {
    this.handleRequistion();
  }

  handleRequistion = async () => {
    this.setState({
      isLoading: true });

    const findUser = await getUser();
    this.setState({
      isLoading: false,
      findUser: findUser.name,
    });
  };

  render() {
    const { findUser, isLoading } = this.state;

    return (
      <header data-testid="header-component">
        <p>
          {isLoading ? <Loading />
            : <h3 data-testid="header-user-name">{ findUser }</h3> }
          eu sou o Header
        </p>
        <nav>
          <Link to="/search" data-testid="link-to-search"> Busca </Link>
          <Link to="/favorites" data-testid="link-to-favorites"> Favoritos</Link>
          <Link to="/profile" data-testid="link-to-profile"> Perfil </Link>

        </nav>
      </header>
    );
  }
}
export default Header;
