import { render, screen } from '@testing-library/react'
import { MainNav } from './main-nav'
import '@testing-library/jest-dom';
 
describe('MainNav component', () => {
  it('renders children', () => {
    render(<MainNav>Test content</MainNav>)
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })
})