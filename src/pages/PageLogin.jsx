import React, { Component } from 'react';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class PageLogin extends Component {
  state = {
    saveButtonDisable: true,
    isLoading: true,
  };

  handleValidButton = () => {
    const { name } = this.state;

    const maxNumber = 3;

    this.setState({
      saveButtonDisable: name.length < maxNumber,
    });
  };

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, this.handleValidButton);
  };

  handleClick = async () => {
    const { name } = this.state;

    this.setState({
      isLoading: true,
    });
    await createUser({ name });
    this.setState({
      isLoading: false,
    });
  };

  render() {
    // se for falso entao history.push e redireciona para o search

    const { saveButtonDisable, isLoading } = this.state;

 /*  const location = {
      pathname: '/search',
    };
 */
    if (isLoading) {
      <Loading />;
    } else {
      history.push(location);
    }

    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="login">
            Nome:
          </label>
          <input
            data-testid="login-name-input"
            type="text"
            name="name"
            onChange={ this.handleInputChange }
          />
          <button
            type="button"
            name="saveButtonDisable"
            data-testid="login-submit-button"
            disabled={ saveButtonDisable }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default PageLogin;
