import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import './header.css';
import Logo from '../images/test1-removebg-preview.png';

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
          <img src={ Logo } alt="logo" />
          <header>
            <p className="card-title">
              Welcome to Music-App
              {isLoading ? <Loading />
                : <p className="header-user-name">{ findUser }</p> }
            </p>
            <nav className="header__nav--buttons">
              <Link
                to="/search"
                className="btn btn-outline-secondary btn-sm"
              >
                {' '}
                Busca
                {' '}

              </Link>
              <Link
                to="/favorites"
                className="btn btn-outline-secondary btn-sm"
              >
                {' '}
                Favoritos

              </Link>
              <Link
                to="/profile"
                className="btn btn-outline-secondary btn-sm"
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
