import React from 'react';
import HomeScreen from '../src/screens/home/home.screen';
import { shallow } from 'enzyme';
// import renderer from 'react-test-renderer';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
describe('sample test', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<HomeScreen />).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('should show counter title', () => {
        const wrapper = shallow(<HomeScreen />);
        expect(
            wrapper.findWhere((node) => node.prop('testID') === 'counter-title'),
        ).toExist();
    });
})