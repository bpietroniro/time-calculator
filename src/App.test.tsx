import { render, screen } from '@testing-library/react'
import App from './App'

test('renders App component', () => {
  render(<App />)
  const appElement = screen.getByTestId('app')
  expect(appElement).toBeInTheDocument()
})

test('renders TimeField component', () => {
  render(<App />)
  const timeFieldElement = screen.getByTestId('time-field')
  expect(timeFieldElement).toBeInTheDocument()
})

// Add more tests for other functionality of the App component
