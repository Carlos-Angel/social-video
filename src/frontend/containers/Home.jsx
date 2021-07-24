import React from 'react';
import { connect } from 'react-redux';

import Header from '../components/Header';
import Search from '../components/Search';
import Categories from '../components/Categories';
import Carousel from '../components/Carousel';
import CarouselItem from '../components/CarouselItem';

import '../assets/styles/App.scss';

function Home({ myList, trends, originals }) {
  return (
    <>
      <Header />
      <Search />
      {myList.length > 0 && (
        <Categories title='Mi lista'>
          <Carousel>
            {myList.map((item) => (
              // eslint-disable-next-line react/jsx-props-no-spreading
              <CarouselItem key={item.id} {...item} isList={true} />
            ))}
          </Carousel>
        </Categories>
      )}

      {trends.length > 0 && (
        <Categories title='Tendencias'>
          <Carousel>
            {trends.map((item) => (
              // eslint-disable-next-line react/jsx-props-no-spreading
              <CarouselItem key={item.id} {...item} />
            ))}
          </Carousel>
        </Categories>
      )}

      {originals.length > 0 && (
        <Categories title='Originales de Platzi Video'>
          <Carousel>
            {originals.map((item) => (
              // eslint-disable-next-line react/jsx-props-no-spreading
              <CarouselItem key={item.id} {...item} />
            ))}
          </Carousel>
        </Categories>
      )}
    </>
  );
}

function mapStateToProps(state) {
  return {
    myList: state.myList,
    trends: state.trends,
    originals: state.originals,
  };
}

export default connect(mapStateToProps, null)(Home);
