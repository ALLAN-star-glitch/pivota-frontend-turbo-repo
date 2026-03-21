import { render, screen } from '@testing-library/react'
import { PrimaryButton } from './primary-button'
 
describe('PrimaryButton component', () => {
  it('renders children', () => {
    render(<PrimaryButton>Test content</PrimaryButton>)
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })
})