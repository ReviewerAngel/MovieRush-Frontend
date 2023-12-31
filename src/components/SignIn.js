/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error] = useState(true);

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post('https://movie-rush.onrender.com/login', {
        user: {
          email,
          password,
        },
      })
      .then((response) => {
        localStorage.setItem('token', response.headers.authorization);
        // eslint-disable-next-line camelcase
        const { role, id, full_name } = response.data.data;
        localStorage.setItem('role', role);
        localStorage.setItem('userId', id);
        localStorage.setItem('full_name', full_name);
        navigate('/');
      })
      .catch((error) => {
        const { message } = error.response.data;
        document.getElementById('show-error').innerHTML = message;
      });
  };

  return (

    <div className="col-md col-sm-12 col-xs-12 container-main d-flex flex-row align-items-center login p-0">
      <div className="col-md-12 d-flex flex-column align-items-center session-overlay justify-content-center">
        <div className="input-box col-md d-flex flex-column align-items-center justify-content-center">
          <div className="intro">
            <span className="line" />
            <h4 className="intro__title">Welcome to <span className="book">Book</span>Flix</h4>
            <p className="intro__text">Login to get started!</p>
          </div>
          <form onSubmit={handleLogin} className="sign-form">
            <div className="input-field">
              <input
                className="sign-form__input"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-field">
              <input
                className="sign-form__input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary rounded-pill px-4 py-2 text-light"
            >
              Login
            </button>
          </form>
          <div className="sign-in mt-4">
            <p>
              Do not have an account?&nbsp;
              <Link to="/signup" className="session-link-btn">Sign Up</Link>
            </p>
            {error === true && <p id="show-error" />}
            {error === false && <p>Please enter valid username and password</p>}
          </div>
        </div>
      </div>
    </div>

  );
};

export default SignIn;
