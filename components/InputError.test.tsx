/**
 * @jest-environment jsdom
 */

import React from 'react'
import {render, screen} from '@testing-library/react'
import {InputError} from "@/components/InputError";

describe('InputError', () => {
    it('renders error message', () => {
        render(<InputError messages={["Error message"]} /> )

        const errorMessageElement = screen.getByText(/Error message/i)

        expect(errorMessageElement).toBeInTheDocument()
    })

})

