import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import './header.css';

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
      <div className="container">
        <div className="card text-center">
          <header data-testid="header-component" className="card-title">
            Music App
            <h1 className="card-text">
              {isLoading ? <Loading />
                : <p data-testid="header-user-name">{ findUser }</p> }
            </h1>
            <nav>
              <Link
                to="/search"
                data-testid="link-to-search"
                className="btn btn-primary"
              >
                {' '}
                Busca
                {' '}

              </Link>
              <Link
                to="/favorites"
                data-testid="link-to-favorites"
                className="btn btn-primary"
              >
                {' '}
                Favoritos

              </Link>
              <Link
                to="/profile"
                data-testid="link-to-profile"
                className="btn btn-primary"
              >
                {' '}
                Perfil
                {' '}

              </Link>

            </nav>
          </header>
        </div>
      </div>
    );
  }
}
export default Header;
