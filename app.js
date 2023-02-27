const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')
const { json } = require('express')
const app = express()

app.use(express.json())
app.use(cors())
//Establecemos los prámetros de conexión
const conexion = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'qwerty21',
  database: 'encomiendas'
})
//Conexión a la database
conexion.connect(function (error) {
  if (error) {
    throw error
  } else {
    console.log("¡Conexión exitosa a la base de datos!")
  }
})
app.get('/', function (req, res) {
  res.send('Ruta INICIO')
})
//Mostrar todos los camiones
app.get('/api/camiones', (req, res) => {
  conexion.query('SELECT * FROM camiones', (error, filas) => {
    if (error) {
      throw error
    } else {
      res.send(filas)
    }
  })
})

//Mostrar todos los clientes
app.get('/api/clientes', (req, res) => {
  conexion.query('SELECT * FROM clientes', (error, filas) => {
    if (error) {
      throw error
    } else {
      res.send(filas)
    }
  })
})

//Mostrar todos las encomiendas
app.get('/api/encomiendas', (req, res) => {
  conexion.query('SELECT * FROM encomiendas', (error, filas) => {
    if (error) {
      throw error
    } else {
      res.send(filas)
    }
  })
})

//Mostrar todos las envio
app.get('/api/envio', (req, res) => {
  conexion.query('SELECT * FROM envio', (error, filas) => {
    if (error) {
      throw error
    } else {
      res.send(filas)
    }
  })
})

//Mostrar todos las envio_encomienda
app.get('/api/envio_encomienda', (req, res) => {
  conexion.query('SELECT * FROM envio_encomienda', (error, filas) => {
    if (error) {
      throw error
    } else {
      res.send(filas)
    }
  })
})

//Mostrar un SOLO camion
app.get('/api/camiones/:id', (req, res) => {
  conexion.query('SELECT * FROM camiones WHERE id = ?', [req.params.id], (error, fila) => {
    if (error) {
      throw error
    } else {
      res.send(fila)
    }
  })
})

//Mostrar un SOLO cliente
app.get('/api/clientes/:id', (req, res) => {
  conexion.query('SELECT * FROM clientes WHERE codigo = ?', [req.params.id], (error, fila) => {
    if (error) {
      throw error
    } else {
      res.send(fila)
    }
  })
})

//Mostrar un SOLO encomienda
app.get('/api/encomiendas/:id', (req, res) => {
  conexion.query('SELECT * FROM encomiendas WHERE codigo = ?', [req.params.id], (error, fila) => {
    if (error) {
      throw error
    } else {
      res.send(fila)
    }
  })
})

//Mostrar un SOLO envio
app.get('/api/envio/:id', (req, res) => {
  conexion.query('SELECT * FROM envio WHERE id = ?', [req.params.id], (error, fila) => {
    if (error) {
      throw error
    } else {
      res.send(fila)
    }
  })
})

//Mostrar un SOLO envio_encomienda
app.get('/api/envio_encomienda/:id', (req, res) => {
  conexion.query('SELECT * FROM envio_encomienda WHERE id = ?', [req.params.id], (error, fila) => {
    if (error) {
      throw error
    } else {
      res.send(fila)
    }
  })
})

// Eliminar camion
app.delete('/api/camiones/:id', (req, res) => {
  conexion.query('DELETE FROM camiones WHERE id = ?', [req.params.id], function (error, filas) {
    if (error) {
      throw error
    } else {
      res.send(filas)
    }
  })
})

// Eliminar cliente
app.delete('/api/clientes/:id', (req, res) => {
  conexion.query('DELETE FROM clientes WHERE codigo = ?', [req.params.id], function (error, filas) {
    if (error) {
      throw error
    } else {
      res.send(filas)
    }
  })
})

// Eliminar encomienda
app.delete('/api/encomiendas/:id', (req, res) => {
  conexion.query('DELETE FROM encomiendas WHERE codigo = ?', [req.params.id], function (error, filas) {
    if (error) {
      throw error
    } else {
      res.send(filas)
    }
  })
})

// Eliminar envio
app.delete('/api/envio/:id', (req, res) => {
  conexion.query('DELETE FROM envio WHERE id = ?', [req.params.id], function (error, filas) {
    if (error) {
      throw error
    } else {
      res.send(filas)
    }
  })
})

// Eliminar envio_encomienda
app.delete('/api/envio_encomienda/:id', (req, res) => {
  conexion.query('DELETE FROM envio_encomienda WHERE id = ?', [req.params.id], function (error, filas) {
    if (error) {
      throw error
    } else {
      res.send(filas)
    }
  })
})

//Editar Cliente
app.put('/api/clientes/:id', (req, res) => {
  let codigo = req.params.id
  let cedula = req.body.cedula
  let nombres = req.body.nombres
  let telefono = req.body.telefono
  let direccion = req.body.direccion

  let sql = "UPDATE clientes SET cedula = ?, nombres = ?, telefono = ?, direccion = ? WHERE codigo = ?"
  conexion.query(sql, [cedula, nombres, telefono, direccion, codigo], function (error, results) {
    if (error) {
      throw error
    } else {
      res.send(results)
    }
  })
})

//Editar Camion
app.put('/api/camiones/:id', (req, res) => {
  let id = req.params.id
  let placa = req.body.placa
  let propietario = req.body.propietario
  let peso = req.body.peso
  let estado = req.body.estado

  let sql = "UPDATE camiones SET placa = ?, propietario = ?, peso = ?, estado = ? WHERE id = ?"
  conexion.query(sql, [placa, propietario, peso, estado, id], function (error, results) {
    if (error) {
      throw error
    } else {
      res.send(results)
    }
  })
})

//Editar Encomiendas
app.put('/api/encomiendas/:id', (req, res) => {
  let codigo = req.params.id
  let peso = req.body.peso
  let direccion = req.body.direccion
  let costo_envio = req.body.costo_envio
  let estado = req.body.estado

  let sql = "UPDATE encomiendas SET peso = ?, direccion = ?, costo_envio = ?, estado = ? WHERE codigo = ?"
  conexion.query(sql, [peso, direccion, costo_envio, estado, codigo], function (error, results) {
    if (error) {
      throw error
    } else {
      res.send(results)
    }
  })
})

// Editar Envio
app.put('/api/envio/:id', (req, res) => {
  let id = req.params.id
  let id_camion = req.body.id_camion
  let peso_total = req.body.peso_total
  let total_recaudado = req.body.total_recaudado
  let porcentaje_entrega = req.body.porcentaje_entrega
  let num_viajes = req.body.num_viajes

  let sql = "UPDATE envio SET id_camion = ?, peso_total = ?, total_recaudado = ?, porcentaje_entrega = ?, num_viajes = ? WHERE id = ?"
  conexion.query(sql, [id_camion, peso_total, total_recaudado, porcentaje_entrega, num_viajes, id], function (error, results) {
    if (error) {
      throw error
    } else {
      res.send(results)
    }
  })
})

// Editar Envio Encomienda
app.put('/api/envio_encomienda/:id', (req, res) => {
  let id = req.params.id
  let id_envio = req.body.id_envio
  let codigo_encomienda = req.body.codigo_encomienda
  let estado_entrega = req.body.estado_entrega

  let sql = "UPDATE envio_encomienda SET id_envio = ?, codigo_encomienda = ?, estado_entrega = ? WHERE id = ?"
  conexion.query(sql, [id_envio, codigo_encomienda, estado_entrega, id], function (error, results) {
    if (error) {
      throw error
    } else {
      res.send(results)
    }
  })
})

// Crear Clientes
app.post('/api/clientes', (req, res) => {
  let data = {
    cedula: req.body.cedula,
    nombres: req.body.nombres,
    telefono: req.body.telefono,
    direccion: req.body.direccion
  }
  let sql = "INSERT INTO clientes SET ?"
  conexion.query(sql, data, function (err, result) {
    if (err) {
      throw err
    } else {
      /*Esto es lo nuevo que agregamos para el CRUD con Javascript*/
      Object.assign(data, { codigo: result.insertId }) //agregamos el ID al objeto data             
      res.send(data) //enviamos los valores                         
    }
  })
})

// Crear Camiones
app.post('/api/camiones', (req, res) => {
  let data = {
    placa: req.body.placa,
    propietario: req.body.propietario,
    peso: req.body.peso,
    estado: req.body.estado,
  }
  let sql = "INSERT INTO camiones SET ?"
  conexion.query(sql, data, function (err, result) {
    if (err) {
      throw err
    } else {
      /*Esto es lo nuevo que agregamos para el CRUD con Javascript*/
      Object.assign(data, { id: result.insertId }) //agregamos el ID al objeto data             
      res.send(data) //enviamos los valores                         
    }
  })
})

// Crear Encomiendas
app.post('/api/encomiendas', (req, res) => {
  let data = {
    peso: req.body.peso,
    direccion: req.body.direccion,
    costo_envio: req.body.costo_envio,
    estado: req.body.estado
  }
  let sql = "INSERT INTO encomiendas SET ?"
  conexion.query(sql, data, function (err, result) {
    if (err) {
      throw err
    } else {
      /*Esto es lo nuevo que agregamos para el CRUD con Javascript*/
      Object.assign(data, { codigo: result.insertId }) //agregamos el ID al objeto data             
      res.send(data) //enviamos los valores                         
    }
  })
})

// Crear Envio
app.post('/api/envio', (req, res) => {
  let data = {
    id: parseInt(req.body.id),
    id_camion: req.body.id_camion,
    peso_total: req.body.peso_total,
    total_recaudado: req.body.total_recaudado,
    porcentaje_entrega: req.body.porcentaje_entrega,
    num_viajes: req.body.num_viajes
  }
  let sql = "INSERT INTO envio SET ?"
  conexion.query(sql, data, function (err, result) {
    if (err) {
      throw err
    } else {
      /*Esto es lo nuevo que agregamos para el CRUD con Javascript*/
      // Object.assign(data) //agregamos el ID al objeto data             
      res.send(data) //enviamos los valores                         
    }
  })
})
// Crear Envio Encomienda
app.post('/api/envio_encomienda', (req, res) => {
  let data = {
    id_envio: req.body.id_envio,
    codigo_encomienda: req.body.codigo_encomienda,
    estado_entrega: req.body.estado_entrega,
  }
  let sql = "INSERT INTO envio_encomienda SET ?"
  conexion.query(sql, data, function (err, result) {
    if (err) {
      throw err
    } else {
      /*Esto es lo nuevo que agregamos para el CRUD con Javascript*/
      Object.assign(data, { id: result.insertId }) //agregamos el ID al objeto data             
      res.send(data) //enviamos los valores                         
    }
  })
})





















//Mostrar un SOLO artículo
app.get('/api/articulos/:id', (req, res) => {
  conexion.query('SELECT * FROM renta WHERE id = ?', [req.params.id], (error, fila) => {
    if (error) {
      throw error
    } else {
      res.send(fila)
    }
  })
})
//Crear un Socio
app.post('/api/socios', (req, res) => {
  let data = {
    codigo_socio: req.body.codigo_socio,
    nombre_socio: req.body.nombre_socio,
    tipo_socio: req.body.tipo_socio,
    fecha_nacimiento: req.body.fecha_nacimiento
  }
  let sql = "INSERT INTO socio SET ?"
  conexion.query(sql, data, function (err, result) {
    if (err) {
      throw err
    } else {
      /*Esto es lo nuevo que agregamos para el CRUD con Javascript*/
      Object.assign(data, { id: result.insertId }) //agregamos el ID al objeto data             
      res.send(data) //enviamos los valores                         
    }
  })
})
//Crear una Pelicula
app.post('/api/peliculas', (req, res) => {
  let data = {
    codigo_pelicula: req.body.codigo_pelicula,
    nombre_pelicula: req.body.nombre_pelicula,
    genero_pelicula: req.body.genero_pelicula,
    costo_pelicula: req.body.costo_pelicula
  }
  let sql = "INSERT INTO pelicula SET ?"
  conexion.query(sql, data, function (err, result) {
    if (err) {
      throw err
    } else {
      /*Esto es lo nuevo que agregamos para el CRUD con Javascript*/
      Object.assign(data, { id: result.insertId }) //agregamos el ID al objeto data             
      res.send(data) //enviamos los valores                         
    }
  })
})
//Crear un artículo
app.post('/api/articulos', (req, res) => {
  let data = {
    cliente: req.body.cliente,
    pelicula: req.body.pelicula,
    fech_renta: req.body.fech_renta,
    fech_devolucion: req.body.fech_devolucion,
    dias: req.body.dias,
    sub_Total: req.body.sub_Total,
    descuento: req.body.descuento,
    estado: req.body.estado,
    total: req.body.total,
    multa: req.body.multa
  }
  let sql = "INSERT INTO renta SET ?"
  conexion.query(sql, data, function (err, result) {
    if (err) {
      throw err
    } else {
      /*Esto es lo nuevo que agregamos para el CRUD con Javascript*/
      Object.assign(data, { id: result.insertId }) //agregamos el ID al objeto data             
      res.send(data) //enviamos los valores                         
    }
  })
})
//Editar articulo
app.put('/api/articulos/:id', (req, res) => {
  let id = req.params.id
  let cliente = req.body.cliente
  let pelicula = req.body.pelicula
  let fech_renta = req.body.fech_renta
  let fech_devolucion = req.body.fech_devolucion
  let dias = req.body.dias
  let sub_Total = req.body.sub_Total
  let descuento = req.body.descuento
  let estado = req.body.estado
  let multa = req.body.multa
  let total = req.body.total

  let sql = "UPDATE renta SET cliente = ?, pelicula = ?, fech_renta = ?, fech_devolucion = ?, dias = ?, sub_Total = ?, descuento = ?, estado = ?, total = ?, multa = ?  WHERE id = ?"
  conexion.query(sql, [cliente, pelicula, fech_renta, fech_devolucion, dias, sub_Total, descuento, estado, total, multa, id], function (error, results) {
    if (error) {
      throw error
    } else {
      res.send(results)
    }
  })
})

//Editar Peliculas
app.put('/api/peliculas/:id', (req, res) => {
  let codigo_pelicula = req.params.id
  let nombre_pelicula = req.body.nombre_pelicula
  let genero_pelicula = req.body.genero_pelicula
  let costo_pelicula = req.body.costo_pelicula

  let sql = "UPDATE pelicula SET nombre_pelicula = ?, genero_pelicula = ?, costo_pelicula = ? WHERE codigo_pelicula = ?"
  conexion.query(sql, [nombre_pelicula, genero_pelicula, costo_pelicula, codigo_pelicula], function (error, results) {
    if (error) {
      throw error
    } else {
      res.send(results)
    }
  })
})
//Editar Socios
app.put('/api/socios/:id', (req, res) => {
  let codigo_socio = req.params.id
  let nombre_socio = req.body.nombre_socio
  let tipo_socio = req.body.tipo_socio
  let fecha_nacimiento = req.body.fecha_nacimiento

  let sql = "UPDATE socio SET nombre_socio = ?, tipo_socio = ?, fecha_nacimiento = ? WHERE codigo_socio = ?"
  conexion.query(sql, [nombre_socio, tipo_socio, fecha_nacimiento, codigo_socio], function (error, results) {
    if (error) {
      throw error
    } else {
      res.send(results)
    }
  })
})
//Eliminar articulo
app.delete('/api/articulos/:id', (req, res) => {
  conexion.query('DELETE FROM renta WHERE id = ?', [req.params.id], function (error, filas) {
    if (error) {
      throw error
    } else {
      res.send(filas)
    }
  })
})


app.delete('/api/peliculas/:id', (req, res) => {
  conexion.query('DELETE FROM pelicula WHERE codigo_pelicula = ?', [req.params.id], function (error, filas) {
    if (error) {
      throw error
    } else {
      res.send(filas)
    }
  })
})

// Eliminar Socio
app.delete('/api/socios/:id', (req, res) => {
  conexion.query('DELETE FROM socio WHERE codigo_socio = ?', [req.params.id], function (error, filas) {
    if (error) {
      throw error
    } else {
      res.send(filas)
    }
  })
})


const puerto = process.env.PUERTO || 3000
app.listen(puerto, function () {
  console.log("Servidor Ok en puerto:" + puerto)
})