import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Login from './Login'
import { AutorizacionesContext } from '../context/AutorizacionesContext'

const renderLogin = () => {
  const utils = render(
    <AutorizacionesContext.Provider value={{ setAdmin: () => {} }}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </AutorizacionesContext.Provider>
  )
  return {
    ...utils,
    emailInput: screen.getByRole('textbox'),
    passwordInput: utils.container.querySelector('input[type="password"]'),
    sectorSelect: screen.getByRole('combobox'),
    submitButton: screen.getByRole('button', { name: /ingresar/i }),
  }
}

describe('Login - validación', () => {
  it('muestra error si el email no cumple el formato esperado', async () => {
    const user = userEvent.setup()
    const { emailInput, passwordInput, sectorSelect, submitButton } = renderLogin()

    // "admin@localhost" pasa la validación nativa del navegador (tiene @),
    // pero no la nuestra, que exige un punto después del @.
    await user.type(emailInput, 'admin@localhost')
    await user.type(passwordInput, 'Password1')
    await user.selectOptions(sectorSelect, 'Gerencia')
    await user.click(submitButton)

    expect(screen.getByText('Email inválido')).toBeInTheDocument()
  })

  it('muestra error si la contraseña tiene menos de 8 caracteres', async () => {
    const user = userEvent.setup()
    const { emailInput, passwordInput, sectorSelect, submitButton } = renderLogin()

    await user.type(emailInput, 'admin@empresa.com')
    await user.type(passwordInput, 'Abc1')
    await user.selectOptions(sectorSelect, 'Gerencia')
    await user.click(submitButton)

    expect(screen.getByText('Mínimo 8 caracteres')).toBeInTheDocument()
  })

  it('muestra error si la contraseña no tiene mayúscula', async () => {
    const user = userEvent.setup()
    const { emailInput, passwordInput, sectorSelect, submitButton } = renderLogin()

    await user.type(emailInput, 'admin@empresa.com')
    await user.type(passwordInput, 'abcdefg1')
    await user.selectOptions(sectorSelect, 'Gerencia')
    await user.click(submitButton)

    expect(screen.getByText('Debe tener una mayúscula')).toBeInTheDocument()
  })

  it('muestra error si la contraseña no tiene número', async () => {
    const user = userEvent.setup()
    const { emailInput, passwordInput, sectorSelect, submitButton } = renderLogin()

    await user.type(emailInput, 'admin@empresa.com')
    await user.type(passwordInput, 'Abcdefgh')
    await user.selectOptions(sectorSelect, 'Gerencia')
    await user.click(submitButton)

    expect(screen.getByText('Debe tener un número')).toBeInTheDocument()
  })

  it('muestra error si no se selecciona un sector', async () => {
    const user = userEvent.setup()
    const { emailInput, passwordInput, submitButton } = renderLogin()

    await user.type(emailInput, 'admin@empresa.com')
    await user.type(passwordInput, 'Password1')
    await user.click(submitButton)

    expect(screen.getByText('Seleccione un sector', { selector: 'p' })).toBeInTheDocument()
  })
})