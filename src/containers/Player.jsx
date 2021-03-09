import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import NotFound from './NotFound';

import { getVideoSource } from '../actions';

import '../assets/styles/components/Player.scss';

function Player(props) {
  // eslint-disable-next-line react/destructuring-assignment
  const { id } = props.match.params;
  const hasPlaying = Object.keys(props.playing).length > 0;

  useEffect(() => {
    props.getVideoSource(id);
  }, []);

  return hasPlaying ? (
    <div className='Player'>
      <video controls autoPlay>
        <source src={props.playing.source} type='video/mp4' />
        <div className='Player-back'>
          <button type='button' onClick={() => props.history.goBack()}>
            Regresar
          </button>
        </div>
      </video>
    </div>
  ) : (
    <NotFound />
  );
}

const mapStateToProps = (state) => {
  return {
    playing: state.playing
  };
};

const mapDispatchToProps = {
  getVideoSource
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
