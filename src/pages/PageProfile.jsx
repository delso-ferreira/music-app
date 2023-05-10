import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { getUser } from '../services/userAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';

class Profile extends Component {
  state = {
    isLoading: true,
    name: '',
    email: '',
    image: '',
    description: '',
  };

  async componentDidMount() {
    const information = await getUser();
    const { name, email, image, description } = information;
    this.setState({
      isLoading: false,
      name,
      email,
      image,
      description,
    });
  }

  render() {
    const { isLoading, name, email, image, description } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        <div>
          {isLoading
            ? <Loading />
            : (
              <div>
                <img src={ image } alt="Foto" data-testid="profile-image" />
                <h2>Nome</h2>
                <p>{name}</p>
                <h2>E-mail</h2>
                <p>{email}</p>
                <h2>Descrição</h2>
                <p>{description}</p>
                <Link to="/profile/edit">Editar perfil</Link>
              </div>
            )}
        </div>

      </div>
    );
  }
}

export default Profile;
