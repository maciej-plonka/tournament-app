/**
 * @jest-environment jsdom
 */

import React from 'react'
import {fireEvent, render, screen} from '@testing-library/react'
import NewTournament from './new'
import {Player} from "@prisma/client";

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

    it('renders all available players after clicking on player select', async() => {
        const availablePlayers:Player[] = [
            {id: 1, name: "First"},
            {id: 2, name: "Second"},
            {id: 2, name: "Last"},
        ];

        render(<NewTournament availablePlayers={availablePlayers} />);

        fireEvent.click(screen.getByText('Select...'))

        for(const player of availablePlayers) {
            const option = screen.getByRole('option',{
                name: new RegExp(player.name)
            })
            expect(option).toBeInTheDocument()
        }
    })
})

