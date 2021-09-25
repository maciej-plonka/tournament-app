/**
 * @jest-environment jsdom
 */

import React from 'react'
import {fireEvent, render, screen} from '@testing-library/react'
import {RadioInput} from "@/components/RadioInput";

const defaultOnChange = () => {
}

describe('RadioInput', () => {
    it('renders all labels', () => {
        const values = ['1', '2', '3'];
        render(<RadioInput values={values} value={'1'} onChange={defaultOnChange}/>)

        for (const value of values) {
            const valueElement = screen.getByLabelText(value)

            expect(valueElement).toBeInTheDocument()
        }
    })

    it('renders inputs with proper values', () => {
        const values = ['1', '2', '3'];
        render(<RadioInput values={values} value={'1'} onChange={defaultOnChange}/>)

        for (const value of values) {
            const stringValue = value.toString()
            const valueElement = screen.getByLabelText(stringValue) as HTMLInputElement
            expect(valueElement.value).toBe(stringValue)
        }
    })

    it('emits proper event', () => {
        const values = ['1', '2', '3'];
        let value = '1';
        const onChange = (newValue: string) => value = newValue

        render(<RadioInput values={values} value={'1'} onChange={onChange}/>)

        fireEvent.click(screen.getByLabelText('2'))

        expect(value).toEqual('2');
    })

    it('renders correctly selected value as checked', () => {
        const values = ['1', '2', '3'];
        let selectedValue = '2';
        render(<RadioInput values={values} value={selectedValue} onChange={defaultOnChange}/>)

        const selectedValueElement = screen.getByLabelText(selectedValue)

        expect(selectedValueElement).toBeChecked()
    })

    it('rerenders when selected value has changed', () => {
        const values = ['1', '2', '3'];
        let selectedValue = '1';
        const updateSelectedValue = (value: string) => selectedValue = value
        const {rerender} = render(<RadioInput values={values} value={selectedValue} onChange={updateSelectedValue}/>)

        expect(screen.getByLabelText('1')).toBeChecked()

        fireEvent.click(screen.getByLabelText('2'))

        rerender(<RadioInput values={values} value={selectedValue} onChange={updateSelectedValue}/>)

        expect(screen.getByLabelText('2')).toBeChecked()
    })

})

