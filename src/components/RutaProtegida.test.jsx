import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import RutaProtegida from './RutaProtegida'
import { AutorizacionesContext } from '../context/AutorizacionesContext'

const renderConContexto = (admin) => {
  return render(
    <AutorizacionesContext.Provider value={{ admin, setAdmin: () => {}, cerrarSesion: () => {} }}>
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/login" element={<div>Pantalla de Login</div>} />
          <Route
            path="/"
            element={
              <RutaProtegida>
                <div>Contenido protegido</div>
              </RutaProtegida>
            }
          />
        </Routes>
      </MemoryRouter>
    </AutorizacionesContext.Provider>
  )
}

describe('RutaProtegida', () => {
  it('redirige a /login cuando no hay admin logueado', () => {
    renderConContexto(null)
    expect(screen.getByText('Pantalla de Login')).toBeInTheDocument()
    expect(screen.queryByText('Contenido protegido')).not.toBeInTheDocument()
  })

  it('renderiza el contenido protegido cuando hay un admin logueado', () => {
    renderConContexto({ nombre: 'Alessandro', sector: 'Gerencia' })
    expect(screen.getByText('Contenido protegido')).toBeInTheDocument()
    expect(screen.queryByText('Pantalla de Login')).not.toBeInTheDocument()
  })
})