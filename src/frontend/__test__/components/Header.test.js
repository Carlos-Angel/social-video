import 'jsdom-global/register';
import React from 'react';
import { mount, shallow } from 'enzyme';

import Header from '../../components/Header';
import ProviderMock from '../../__mocks__/ProviderMock';

describe('<Header />', () => {
  test('Header logo image ', () => {
    const header = mount(
      <ProviderMock>
        <Header />
      </ProviderMock>,
    );

    expect(header.find('.header__img')).toHaveLength(1);
  });

  test('Header Snapshot', () => {
    const header = shallow(
      <ProviderMock>
        <Header />
      </ProviderMock>,
    );

    expect(header).toMatchSnapshot();
  });
});
