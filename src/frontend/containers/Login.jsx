import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { loginUser } from '../actions';
import Header from '../components/Header';
import notification from '../utils/notification';

import googleIcon from '../assets/static/icons8-google-plus-50.png';
import twitterIcon from '../assets/static/icons8-twitter-50.png';
import '../assets/styles/components/Login.scss';

function Login(props) {
  const [form, setForm] = useState({ email: '' });
  // eslint-disable-next-line react/destructuring-assignment
  const { message, type } = props.notification;

  useEffect(() => {
    notification({ message, type });
    // eslint-disable-next-line react/destructuring-assignment
  }, [props.notification]);

  const handleInput = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.loginUser(form, '/');
  };

  return (
    <>
      <Header isLogin />
      <section className='login'>
        <section className='login__container'>
          <h2>Inicia sesión</h2>
          <form className='login__container--form' onSubmit={handleSubmit}>
            <input
              name='email'
              className='input'
              type='text'
              placeholder='Correo'
              onChange={handleInput}
            />
            <input
              name='password'
              className='input'
              type='password'
              placeholder='Contraseña'
              onChange={handleInput}
            />
            <button type='submit' className='button'>
              Iniciar sesión
            </button>
            <div className='login__container--remember-me'>
              <label htmlFor='cbox1'>
                <input type='checkbox' id='cbox1' value='first_checkbox' />
                Recuérdame
              </label>
              <a href='/'>Olvidé mi contraseña</a>
            </div>
          </form>
          <section className='login__container--social-media'>
            <div>
              <img src={googleIcon} alt='Google icon' />
              Inicia sesión con Google
            </div>
            <div>
              <img src={twitterIcon} alt='twitter icon' />
              Inicia sesión con Twitter
            </div>
          </section>
          <p className='login__container--register'>
            No tienes ninguna cuenta
            <Link to='/register'>Regístrate</Link>
          </p>
        </section>
      </section>
    </>
  );
}

const mapDispatchToProps = {
  loginUser,
};

const mapStateToProps = (reducer) => reducer;

export default connect(mapStateToProps, mapDispatchToProps)(Login);
