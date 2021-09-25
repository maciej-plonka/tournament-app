/**
 * @jest-environment jsdom
 */

import React from 'react'
import {render, screen} from '@testing-library/react'
import NewTournament from './new'

describe('NewTournament', () => {
    it('renders a heading', () => {
        render(<NewTournament availablePlayers={[]} />);
        const heading = screen.getByRole('heading', {
            name: /New Tournament/i
        })
        expect(heading).toBeInTheDocument()
    })

    it('renders a button \"Create\"', () => {
        render(<NewTournament availablePlayers={[]} />);
        const button = screen.getByRole('button', {
            name: /Create/i
        })
        expect(button).toBeInTheDocument()
    })

    it('renders, by default, a disabled button', () => {
        render(<NewTournament availablePlayers={[]} />);
        const button = screen.getByRole('button', {
            name: /Create/i
        })
        expect(button).toBeDisabled()
    })
})

