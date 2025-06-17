const { Comentario, Usuario } = require('../models');

exports.agregarComentario = async (req, res) => {
  const { imagen_id, texto } = req.body;
  const usuario_id = req.usuario.id;

  if (!imagen_id || !texto) {
    return res.status(400).json({ error: 'Faltan campos' });
  }

  try {
    const nuevoComentario = await Comentario.create({
      imagen_id,
      usuario_id,
      texto
    });

    res.status(201).json(nuevoComentario);
  } catch (err) {
    console.error("❌ Error al agregar comentario:", err);
    res.status(500).json({ error: 'Error al comentar' });
  }
};

exports.obtenerComentariosPorImagen = async (req, res) => {
  const { imagen_id } = req.params;

  try {
    const comentarios = await Comentario.findAll({
      where: { imagen_id },
      include: {
        model: Usuario,
        attributes: ['id_usuario', 'nombre_usuario']
      },
      order: [['fecha', 'ASC']]
    });

    res.json(comentarios);
  } catch (err) {
    console.error("❌ Error al obtener comentarios:", err);
    res.status(500).json({ error: 'Error al obtener comentarios' });
  }
};