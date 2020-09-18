import React from 'react'
import { mount } from 'enzyme'
import { InputGroup } from './inputGroup'

describe("<InputGroup>", () => {
    it("supports custom props", () => {
        const input = mount(<InputGroup />)
        const inputElement = input.find('input')
        expect(inputElement.exists()).toEqual(true)
        const inputElementDom = inputElement.getDOMNode() as HTMLElement
    })
})