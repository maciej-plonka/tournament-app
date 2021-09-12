/**
 * @jest-environment jsdom
 */

import React from 'react'
import {fireEvent, render, screen} from '@testing-library/react'
import {RadioInput} from "@/components/RadioInput";

const defaultOnValueChanged = () => {
}

describe('RadioInput', () => {
    it('renders all labels', () => {
        const values = [1, 2, 3];
        render(<RadioInput values={values} value={1} onValueChanged={defaultOnValueChanged}/>)

        for (const value of values) {
            const valueElement = screen.getByLabelText(value.toString())

            expect(valueElement).toBeInTheDocument()
        }
    })

    it('renders inputs with proper values', () => {
        const values = [1, 2, 3];
        render(<RadioInput values={values} value={1} onValueChanged={defaultOnValueChanged}/>)

        for (const value of values) {
            const stringValue = value.toString()
            const valueElement = screen.getByLabelText(stringValue) as HTMLInputElement
            expect(valueElement.value).toBe(stringValue)
        }
    })

    it('emits proper event', () => {
        const values = [1, 2, 3];
        let value = 1;
        const onValueChanged = (newValue: number) => value = newValue

        render(<RadioInput values={values} value={1} onValueChanged={onValueChanged}/>)

        fireEvent.click(screen.getByLabelText('2'))

        expect(value).toEqual(2);
    })

    it('renders correctly selected value as checked', () => {
        const values = [1, 2, 3];
        let selectedValue = 2;
        render(<RadioInput values={values} value={selectedValue} onValueChanged={defaultOnValueChanged}/>)

        const selectedValueElement = screen.getByLabelText(selectedValue.toString())

        expect(selectedValueElement).toBeChecked()
    })

})

