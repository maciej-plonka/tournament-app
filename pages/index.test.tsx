/**
 * @jest-environment jsdom
 */

import React from 'react'
import {render, screen} from '@testing-library/react'
import Home from './index'

describe('Home', () => {
    it('renders a heading', () => {
        render(<Home tournaments={[]}/>);
        const heading = screen.getByRole('heading', {
            name: /Tournaments/i
        })
        expect(heading).toBeInTheDocument()
    })

    it('renders a list of tournaments', () => {
        const titles = ['first', 'second', 'last']
        const tournaments = titles.map((title, id) => ({title, id, winnerTeamId: null}))
        render(<Home tournaments={tournaments}/>);

        for (const title of titles) {
            const link = screen.getByRole('link', {
                name: new RegExp(title)
            })
            expect(link).toBeInTheDocument()
        }
    })

    it('renders list of tournaments with proper links', () => {
        const tournaments = [
            {id: 1, title: "First", winnerTeamId: null},
            {id: 2, title: "Second", winnerTeamId: null}
        ]
        render(<Home tournaments={tournaments}/>);
        for (const tournament of tournaments) {
            const link = screen.getByRole('link', {
                name: new RegExp(tournament.title)
            })
            expect(link.getAttribute('href')).toBe(`/tournament/${tournament.id}`)
        }
    })
})

