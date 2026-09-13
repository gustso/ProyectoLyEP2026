const usuarios = [
  {
    email: 'antonella@gmail.com',
    password: 'Admin123',
    nombre: 'Antonella',
    sector: 'Soporte'
  },
  {
    email: 'jimena@gmail.com',
    password: 'Admin123',
    nombre: 'Jimena',
    sector: 'Gerencia'
  },
  {
    email: 'maia@gmail.com',
    password: 'Admin123',
    nombre: 'Maia',
    sector: 'Gerencia'
  },
  {
    email: 'abril@gmail.com',
    password: 'Admin123',
    nombre: 'Abril',
    sector: 'Soporte'
  },
  {
    email: 'guadalupe@gmail.com',
    password: 'Admin123',
    nombre: 'Guadalupe',
    sector: 'Soporte'
  },
  {
    email: 'lourdes@gmail.com',
    password: 'Admin123',
    nombre: 'Lourdes',
    sector: 'Gerencia'
  }
]
// COMMIT: "fix: el sector del login lo determina el usuario, no un select"
// (antes: const login = (email, password, sector) => { ... usuario.sector === sector })
const login = (email, password) => {
  return usuarios.find(
    usuario =>
      usuario.email === email &&
      usuario.password === password
  )
}
export default {
  login
}