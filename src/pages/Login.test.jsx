import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Login from './Login'
import AutorizacionesProvider from '../context/AutorizacionesContext'

const renderLogin = () =>
  render(
    <MemoryRouter>
      <AutorizacionesProvider>
        <Login />
      </AutorizacionesProvider>
    </MemoryRouter>
  )

describe('Login', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('muestra error si el email esta vacio y se envia el formulario', () => {
    renderLogin()
    fireEvent.click(screen.getByRole('button', { name: /ingresar/i }))
    expect(screen.getByText(/el email es obligatorio/i)).toBeInTheDocument()
  })

  it('muestra error si el email tiene formato invalido', () => {
    renderLogin()
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'noesunmail' },
    })
    fireEvent.click(screen.getByRole('button', { name: /ingresar/i }))
    expect(screen.getByText(/email inválido/i)).toBeInTheDocument()
  })

  it('muestra "Verifique los datos" con credenciales incorrectas', async () => {
    renderLogin()
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'antonella@gmail.com' },
    })
    fireEvent.change(screen.getByLabelText(/contraseña/i), {
      target: { value: 'incorrecta' },
    })
    fireEvent.click(screen.getByRole('button', { name: /ingresar/i }))
    await waitFor(() =>
      expect(screen.getByText(/verifique los datos/i)).toBeInTheDocument()
    )
  })

  it('no muestra ningun selector de sector en el formulario', () => {
    renderLogin()
    expect(screen.queryByRole('combobox')).not.toBeInTheDocument()
  })

  it('loguea correctamente y guarda el sector del usuario en la sesion', async () => {
    renderLogin()
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'antonella@gmail.com' },
    })
    fireEvent.change(screen.getByLabelText(/contraseña/i), {
      target: { value: 'Admin123' },
    })
    fireEvent.click(screen.getByRole('button', { name: /ingresar/i }))

    await waitFor(() => {
      const admin = JSON.parse(localStorage.getItem('admin'))
      expect(admin).toMatchObject({
        nombre: 'Antonella',
        email: 'antonella@gmail.com',
        sector: 'Soporte',
      })
    })
  })
})
