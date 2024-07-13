import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { App } from '../App'
import { AppState } from '../AppState.state'
import { UserState } from '../components/users/UserState'

jest.mock('../AppState.state')
jest.mock('../components/users/UserState')

describe('App', () => {
  let mockAppState: jest.Mocked<AppState>
  let mockUserState: jest.Mocked<UserState>

  beforeEach(() => {
    mockUserState = {
      isLoading: false,
      isAuth: false,
      userId: null,
      isSignedUp: false,
      signOutUser: jest.fn(),
    } as unknown as jest.Mocked<UserState>

    mockAppState = {
      userState: mockUserState,
      isMobile: false,
    } as unknown as jest.Mocked<AppState>

    (AppState as jest.Mock).mockImplementation(() => mockAppState)
  })

  it('renders LoaderApp when userState is loading', () => {
    mockUserState.isLoading = true
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )
    expect(screen.getByTestId('loader-app')).toBeInTheDocument()
  })

  it('renders UserForm when user is not authenticated', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )
    expect(screen.getByTestId('user-form')).toBeInTheDocument()
  })

  it('renders WorkoutGenerator when user is authenticated', () => {
    mockUserState.isAuth = true
    mockUserState.userId = 'test-user-id'
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )
    expect(screen.getByTestId('workout-generator')).toBeInTheDocument()
  })

  it('passes correct props to WorkoutGenerator', () => {
    mockUserState.isAuth = true
    mockUserState.userId = 'test-user-id'
    mockUserState.isSignedUp = true
    mockAppState.isMobile = true

    render(
      <MemoryRouter initialEntries={['/workout']}>
        <App />
      </MemoryRouter>
    )

    const workoutGenerator = screen.getByTestId('workout-generator')
    expect(workoutGenerator).toHaveAttribute('userId', 'test-user-id')
    expect(workoutGenerator).toHaveAttribute('isSignedUp', 'true')
    expect(workoutGenerator).toHaveAttribute('isMobile', 'true')
    expect(workoutGenerator).toHaveAttribute('currentView', '/workout')
  })
})
