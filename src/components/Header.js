import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  state = {
    isLoading: false,
    findUser: '',
  };

  // 1- cria um state inicial nome: '' e isloading: false [OK]

  // 2- faz a funçao que vai:
  // setar o loading pra true antes de fazer a requisiçao getUser
  // fazer a requisiçao
  // setar o loading pra false e setar o retorno da getUser no state nome[OK]

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

  // 3- colocar essa funçao dentro do DidMount(), que é quando monta o componente[OK]
  // 4- dentro do render vc declara desestruturando o state[OK]
  // 5- retorna o state nome dentro da tag html[OK]

  render() {
    const { findUser, isLoading } = this.state;

    return (
      <header data-testid="header-component">
        {isLoading ? <Loading />
          : <h3 data-testid="header-user-name">{ findUser }</h3> }
        eu sou o Header
      </header>
    );
  }
}
export default Header;
