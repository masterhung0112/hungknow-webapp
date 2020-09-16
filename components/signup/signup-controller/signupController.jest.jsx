import {shallow} from 'enzyme'
import SignupController from './signupController'

describe('components/SignupController', () => {
    const baseProps = {

    }

    test('should match snapshot for all signup options enabled with isLicensed enabled', () => {
        const wrapper = shallow(
            <SignupController {...baseProps}/>,
        );
        expect(wrapper).toMatchSnapshot();
    })
})