import React from 'react';
import '../assets/styles/components/Header.scss';

export default function Header() {
  return (
    <header className='header'>
      <img className='header__img' src='#' alt='Platzi Video' />
      <div className='header__menu'>
        <div className='header__menu--profile'>
          <img src='#' alt='' />
          <p>Perfil</p>
        </div>
        <ul>
          <li>
            <a href='/'>Cuenta</a>
          </li>
          <li>
            <a href='/'>Cerrar Sesión</a>
          </li>
        </ul>
      </div>
    </header>
  );
}
