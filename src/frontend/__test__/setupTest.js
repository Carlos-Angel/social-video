// eslint-disable-next-line import/no-extraneous-dependencies
import Enzyme from 'enzyme';
// eslint-disable-next-line import/no-extraneous-dependencies
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createSerializer } from 'enzyme-to-json';

Enzyme.configure({ adapter: new Adapter() });
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));
