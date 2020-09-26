import React from 'react'
import { mount } from 'enzyme'
import InputGroup from './inputGroup'
import Icon from '../icon'
import { CssClasses } from 'common'

describe('<InputGroup>', () => {
  it('supports custom props', () => {
    const input = mount(<InputGroup style={{ background: 'yellow' }} tabIndex={4} />)
    const inputElement = input.find('input')
    // Check if <input> element exists
    expect(inputElement.exists()).toEqual(true)

    // Check if the props is equal to what is input
    const inputElementDom = inputElement.getDOMNode() as HTMLElement
    expect(inputElementDom.style.background).toEqual('yellow')
    expect(inputElementDom.tabIndex).toEqual(4)
  })

  it('would work like a text input', () => {
    const onChangeMock = jest.fn()
    const input = mount(<InputGroup value="value" onChange={onChangeMock} />).find('input')

    // Check if the default value for input is "text" and value is value
    expect(input.prop('type')).toStrictEqual('text')
    expect(input.prop('value')).toStrictEqual('value')

    const mockEvent = {
      preventDefault() {},
      target: { value: 'test-value' },
    } as React.ChangeEvent<HTMLInputElement>
    input.simulate('change', mockEvent)

    expect(onChangeMock).toHaveBeenCalledTimes(1)

    //TODO: Find out how to chec
    // expect(onChangeMock).toHaveBeenCalledWith(mockEvent)
  })

  it('supports custom type attribute', () => {
    const emailInput = mount(<InputGroup type="email" />).find('input')
    expect(emailInput.prop('type')).toStrictEqual('email')

    const passwordInput = mount(<InputGroup type="password" />).find('input')
    expect(passwordInput.prop('type')).toStrictEqual('password')
  })

  it('supports inputRef', () => {
    let input: HTMLInputElement | null = null
    // tslint:disable-next-line:jsx-no-lambda
    mount(<InputGroup inputRef={(ref) => (input = ref)} />)
    expect(input).toBeInstanceOf(HTMLInputElement)
  })

  it('renders left icon before input', () => {
    const input = mount(<InputGroup leftIcon="star" />).children()
    expect(input.childAt(0).is(Icon)).toBeTruthy()
    expect(input.childAt(1).hasClass(CssClasses.INPUT)).toEqual(true)
  })

  it(`renders right element inside .${CssClasses.INPUT_ACTION} after input`, () => {
    const action = mount(<InputGroup rightElement={<address />} />)
      .children()
      .childAt(1)
    expect(action.hasClass(CssClasses.INPUT_ACTION)).toEqual(true)
    expect(action.find('address')).toHaveLength(1)
  })
})
