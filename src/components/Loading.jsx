import React from 'react';
import './loading.css';

class Loading extends React.Component {
  render() {
    return (
      <div className="spinner-border text-light" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }
}

export default Loading;
