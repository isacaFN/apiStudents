const express = require('express');
const fs = require('fs');
const path = require('path');  
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, '../public'))); 


app.use(express.json());


const getEstudiantes = () => {
    const data = fs.readFileSync('./estudiantes.json', 'utf8');
    return JSON.parse(data);
  };
  

  const guardarEstudiantes = (data) => {
    fs.writeFileSync('./estudiantes.json', JSON.stringify(data, null, 2));
  };
  
  // Endpoints
  app.get('/estudiantes', (req, res) => {
    const estudiantes = getEstudiantes(); 
    res.json(estudiantes);
  });
  
  // Obtener estudiante por ID
  app.get('/estudiantes/:id', (req, res) => {
    const estudiantes = getEstudiantes(); 
    const estudiante = estudiantes.find((s) => s.id === parseInt(req.params.id));
    estudiante ? res.json(estudiante) : res.status(404).json({ message: 'Estudiante no encontrado' });
  });
  
  // Crear un nuevo estudiante
  app.post('/estudiantes', (req, res) => {
    const estudiantes = getEstudiantes(); 
    const nuevoEstudiante = { id: Date.now(), ...req.body };
    estudiantes.push(nuevoEstudiante);
    guardarEstudiantes(estudiantes);
    res.status(201).json(nuevoEstudiante);
  });
  
  // Actualizar un estudiante
  app.put('/estudiantes/:id', (req, res) => {
    const estudiantes = getEstudiantes(); 
    const index = estudiantes.findIndex((s) => s.id === parseInt(req.params.id));
    if (index !== -1) {
      estudiantes[index] = { ...estudiantes[index], ...req.body };
      guardarEstudiantes(estudiantes);
      res.json(estudiantes[index]);
    } else {
      res.status(404).json({ message: 'Estudiante no encontrado' });
    }
  });
  
  // Eliminar un estudiante
  app.delete('/estudiantes/:id', (req, res) => {
    const estudiantes = getEstudiantes(); 
    const actualizarEstudiantes = estudiantes.filter((s) => s.id !== parseInt(req.params.id));
    if (actualizarEstudiantes.length === estudiantes.length) {
      return res.status(404).json({ message: 'Estudiante no encontrado' });
    }
    guardarEstudiantes(actualizarEstudiantes);
    res.status(204).send();
  });
  
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });