// Base de datos simulada
const usuariosSimulados = [
  { email: 'antonella@gmail.com', password: 'Admin123', nombre: 'Antonella', sector: 'Soporte' },
  { email: 'jimena@gmail.com', password: 'Admin123', nombre: 'Jimena', sector: 'Gerencia' },
  { email: 'maia@gmail.com', password: 'Admin123', nombre: 'Maia', sector: 'Gerencia' },
  { email: 'abril@gmail.com', password: 'Admin123', nombre: 'Abril', sector: 'Soporte' },
  { email: 'guadalupe@gmail.com', password: 'Admin123', nombre: 'Guadalupe', sector: 'Soporte' },
  { email: 'lourdes@gmail.com', password: 'Admin123', nombre: 'Lourdes', sector: 'Gerencia' }
];

/**
 * Retorna la lista de usuarios omitiendo datos sensibles.
 */
export const obtenerUsuarios = () => {
  return usuariosSimulados.map(({ password, ...resto }) => resto);
};

/**
 * Simula el proceso de autenticación de un usuario.
 * @param {string} email - Correo del usuario.
 * @param {string} password - Contraseña ingresada.
 * @param {string} sector - Sector seleccionado (Soporte/Gerencia).
 * @returns {Promise<Object|null>} Datos del usuario con token de sesión o null si falla.
 */
export const login = async (email, password, sector) => {
  // 1. Simulamos la petición a un servidor backend
  await new Promise((resolve) => setTimeout(resolve, 500));

  // 2. Buscamos el usuario en la base de datos simulada
  const usuarioEncontrado = usuariosSimulados.find(
    (u) => u.email === email && u.password === password && u.sector === sector
  );

  if (!usuarioEncontrado) {
    return null;
  }

  // 3. Retorna solo los datos públicos + un token simulado
  return {
    nombre: usuarioEncontrado.nombre,
    email: usuarioEncontrado.email,
    sector: usuarioEncontrado.sector,
    token: `fake-jwt-token-${usuarioEncontrado.nombre.toLowerCase()}-12345`
  };
};

export default {
  obtenerUsuarios,
  login
};