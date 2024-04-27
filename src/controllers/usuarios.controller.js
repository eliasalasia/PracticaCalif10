import { pool } from '../config/db.js'
import { fotoNombre } from '../config/multer.js'

export const index = async (req, res) => {
  try {
    const sql = 'SELECT u.usuario_id, u.usuario_nombre, u.email, u.foto, r.rol_nombre FROM usuarios u INNER JOIN roles r ON u.rol_id = r.rol_id;'
    const [usuarios] = await pool.query(sql)
    res.json(usuarios)
  } catch (error) {
    res.status(500).json({ message: 'hubo un error interno' })
  }
}

export const remove = async (req, res) => {
  try {
    const { id } = req.params
    await pool.query('DELETE FROM usuarios WHERE usuario_id = ?', [id])
    res.json({ message: 'Usuario eliminado' })
  } catch (error) {
    res.status(500).json({ message: 'hubo un error interno' })
  }
}

export const save = async (req, res) => {
  try {
    const { nombre, email, foto, rol_id: rolId } = req.body

    if (!nombre || !email || !foto || !rolId) {
      return res.status(400).json({ message: 'Datos faltantes' })
    }

    await pool.execute('INSERT INTO usuarios(usuario_nombre, email, foto, rol_id) VALUES (?, ?, ?, ? )', [nombre, email, fotoNombre, rolId])
    res.status(201).json({ message: 'Usuario Creado' })
  } catch (error) {
    res.status(500).json({ message: 'hubo un error interno', details: error.message })
  }
}

export const update = async (req, res) => {
  try {
    const { id } = req.params

    if (!id) return res.status(400).json({ message: 'No se reconoce al usuario' })

    const { nombre, email, foto, rol_id: rolId } = req.body

    if (!nombre || !email || !foto || !rolId) {
      return res.status(400).json({ message: 'Datos faltantes' })
    }

    await pool.execute('UPDATE usuarios SET usuario_nombre = ?, email = ?, foto = ?, rol_id = ? WHERE usuario_id = ?', [nombre, email, foto, rolId, id])
    res.status(201).json({ message: 'Usuario Actualizado' })
  } catch (error) {
    res.status(500).json({ message: 'hubo un error interno', details: error.message })
  }
}
