import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { getUser } from '../services/userAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';
import './pageprofile.css';

class PageProfile extends Component {
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
          <div className="page__profile-container">
            {isLoading
              ? <Loading />
              : (
                <div className="page__profile-form">
                  <img src={ image } alt="Foto" className="profile-image" />
                  <h2 className="profile-name">Name</h2>
                  <p className="profile__name-input">{name}</p>
                  <h2 className="profile-email">E-mail</h2>
                  <p className="profile__email-input">{email}</p>
                  <h2 className="profile-about">About</h2>
                  <p className="profile__about-input">{description}</p>
                  <Link
                    to="/profile/edit"
                    className="btn btn-outline-secondary btn-sm"
                  >
                    Edit

                  </Link>
                </div>
              )}
          </div>
        </div>

      </div>
    );
  }
}

export default PageProfile;
