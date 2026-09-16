// Genera un hash SHA-256 de un string usando la Web Crypto API del navegador.
const hashPassword = async (password) => {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

// Mitigación de seguridad: las contraseñas ya no están en texto plano, sino
// hasheadas con SHA-256. Esto evita que queden expuestas al leer el código
// fuente. Limitación conocida: la validación sigue haciéndose en el cliente;
// una solución completa requiere un backend propio con hashing server-side
// (ver hallazgo #1 del backlog priorizado del análisis técnico).
const usuarios = [
  {
    email: 'antonella@gmail.com',
    passwordHash: '3b612c75a7b5048a435fb6ec81e52ff92d6d795a8b5a9c17070f6a63c97a53b2',
    nombre: 'Antonella',
    sector: 'Soporte'
  },
  {
    email: 'jimena@gmail.com',
    passwordHash: '3b612c75a7b5048a435fb6ec81e52ff92d6d795a8b5a9c17070f6a63c97a53b2',
    nombre: 'Jimena',
    sector: 'Gerencia'
  },
  {
    email: 'maia@gmail.com',
    passwordHash: '3b612c75a7b5048a435fb6ec81e52ff92d6d795a8b5a9c17070f6a63c97a53b2',
    nombre: 'Maia',
    sector: 'Gerencia'
  },
  {
    email: 'abril@gmail.com',
    passwordHash: '3b612c75a7b5048a435fb6ec81e52ff92d6d795a8b5a9c17070f6a63c97a53b2',
    nombre: 'Abril',
    sector: 'Soporte'
  },
  {
    email: 'guadalupe@gmail.com',
    passwordHash: '3b612c75a7b5048a435fb6ec81e52ff92d6d795a8b5a9c17070f6a63c97a53b2',
    nombre: 'Guadalupe',
    sector: 'Soporte'
  },
  {
    email: 'lourdes@gmail.com',
    passwordHash: '3b612c75a7b5048a435fb6ec81e52ff92d6d795a8b5a9c17070f6a63c97a53b2',
    nombre: 'Lourdes',
    sector: 'Gerencia'
  }
]

const login = async (email, password, sector) => {
  const passwordHash = await hashPassword(password)
  if (import.meta.env.DEV) {
    console.log('Intento de login:', email, sector)
  }
  return usuarios.find(
    usuario =>
      usuario.email === email &&
      usuario.passwordHash === passwordHash &&
      usuario.sector === sector
  )
}

export default {
  login
}