import {shallow} from 'enzyme'
import SignupController from './signupController'

describe('components/SignupController', () => {
    const baseProps = {
        isLicensed: false,
        enableSignUpWithEmail: false
    }

    test('should match snapshot for all signup options enabled with isLicensed enabled', () => {
        const wrapper = shallow(
            <SignupController {...baseProps}/>,
        );
        expect(wrapper).toMatchSnapshot();
    })
})