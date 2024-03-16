import { render, screen } from '@testing-library/react'
import App from './App'

test('renders App component', () => {
  render(<App />)
  const appElement = screen.getByTestId('App')
  expect(appElement).toBeInTheDocument()
})

test('renders a single TimeField component by default', () => {
  render(<App />)
  const timeFieldElements = screen.getAllByAltText(/^(hours|minutes|seconds)$/);
  expect(timeFieldElements).toHaveLength(3)
})

// Add more tests for other functionality of the App component
