import { CssClasses, Intent } from 'common'
import { shallow } from 'enzyme'
import React from 'react'

import FormGroup from './formGroup'

describe('<FormGroup>', () => {
  it('render children in form content', () => {
    const wrapper = shallow(
      <FormGroup>
        <input id="yes" />
      </FormGroup>
    )
    const content = wrapper.find(`.${CssClasses.FORMGROUP_CONTENT}`)
    const input = content.find('input')
    expect(input.exists()).toEqual(true)
    expect(input.prop('id')).toEqual('yes')
  })

  it('render label and labelFor', () => {
    const labelText = 'This is the label.'
    const label = shallow(<FormGroup label={labelText} labelFor="foo"></FormGroup>).find('label')
    expect(label.exists()).toEqual(true)
    expect(label.text().trim()).toEqual(labelText)
    expect(label.prop('htmlFor')).toEqual('foo')
  })

  it('hide label when not specified', () => {
    const label = shallow(<FormGroup></FormGroup>).find('label')
    expect(label.exists()).toEqual(false)
  })

  it('labelInfo=JSX renders JSX content in label', () => {
    const info = <em>Hello label</em>
    const label = shallow(<FormGroup label="label" labelInfo={info}></FormGroup>).find('label')
    expect(label.exists()).toEqual(true)
    expect(label.containsMatchingElement(info)).toBeTruthy()
  })

  it('renders helperText', () => {
    const helperText = 'Help me out'
    const wrapper = shallow(<FormGroup helperText={helperText} />)
    const helper = wrapper.find(`.${CssClasses.FORMGROUP_HELPER_TEXT}`)
    expect(helper.text()).toEqual(helperText)
  })

  it('supports className & intent', () => {
    const wrapper = shallow(<FormGroup className="foo" intent={Intent.SUCCESS} />)
    expect(wrapper.hasClass(CssClasses.FORMGROUP)).toBeTruthy()
    expect(wrapper.hasClass(CssClasses.INTENT_SUCCESS)).toBeTruthy()
    expect(wrapper.hasClass('foo')).toBeTruthy()
  })
})
