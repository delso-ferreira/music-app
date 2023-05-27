import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import './pagelogin.css';
import test1 from '../images/test1-removebg-preview.png';

class PageLogin extends Component {
  state = {
    saveButtonDisable: true,
    isLoading: false,
    name: '',
  };

  handleValidButton = () => {
    const { name } = this.state;

    const maxNumber = 3;
    const minLength = name.length >= maxNumber;

    this.setState({
      saveButtonDisable: !minLength,
    });
  };

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, this.handleValidButton);
  };

  handleClick = async () => {
    const { name } = this.state;
    const { history } = this.props;

    this.setState({
      isLoading: true,
    });
    await createUser({ name });
    this.setState({
      isLoading: false,
    });
    history.push('/search');
  };

  render() {
    const { saveButtonDisable, isLoading } = this.state;

    return (
      <div data-testid="page-login" className="form__login">
        {isLoading
          ? <Loading />
          : (
            <form>
              <div className="form__login--image">
                <img src={ test1 } alt="logo" />
              </div>
              <label htmlFor="login">
                Sign Up
              </label>
              <input
                placeholder="Type your name"
                className="form__login--input"
                type="text"
                name="name"
                onChange={ this.handleInputChange }
              />
              <div className="form__button--container">
                <button
                  type="button"
                  name="saveButtonDisable"
                  disabled={ saveButtonDisable }
                  onClick={ this.handleClick }
                  className="btn btn-outline-info"
                >
                  Entrar
                </button>
              </div>
            </form>
          )}
      </div>
    );
  }
}

PageLogin.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default PageLogin;
