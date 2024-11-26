const baseURL = 'http://localhost:3000/estudiantes';


async function mostrarTodosEstudiantes() {
  const response = await fetch(baseURL);
  const estudiantes = await response.json();

  const resultadosDiv = document.getElementById('resultados');
  resultadosDiv.innerHTML = '';

  estudiantes.forEach((estudiante) => {
    const estudianteDiv = document.createElement('div');
    estudianteDiv.classList.add('estudiante_contenedor');
    estudianteDiv.innerHTML = `<div class="estudiante">
      <h3>${estudiante.name} ${estudiante.last_name}</h3>
      <p>Age: ${estudiante.age}</p>
      <p>Carrera: ${estudiante.career}</p>
      <button class="botton_eliminar" onclick="eliminarEstudiante(${estudiante.id})">Eliminar</button>
      <button onclick="actualizarCareer(${estudiante.id})">Actualizar Carrera</button>
    </div>`;
    resultadosDiv.appendChild(estudianteDiv);
  });
}


async function buscarEstudiantePorId() {
  const id = prompt('Ingresa el ID del estudiante:');
  const response = await fetch(`${baseURL}/${id}`);

  if (response.ok) {
    const estudiante = await response.json();
    const resultadosDiv = document.getElementById('resultados');
    resultadosDiv.innerHTML = `<div class="estudiante">
      <h3>${estudiante.name} ${estudiante.last_name}</h3>
      <p>Age: ${estudiante.age}</p>
      <p>Carrera: ${estudiante.career}</p>
      <button class="botton_eliminar" onclick="eliminarEstudiante(${estudiante.id})">Eliminar</button>
      <button onclick="actualizarCareer(${estudiante.id})">Actualizar Carrera</button>
    </div>`;
  } else {
    alert('Estudiante no encontrado');
  }
}


async function crearNuevoEstudiante() {
  const name = prompt('Ingrese el nombre del estudiante:');
  const last_name = prompt('Ingrese el apellido del estudiante:');
  const age = prompt('Ingrese la edad del estudiante:');
  const career = prompt('Ingrese la carrera del estudiante:');
  
  const nuevoEstudiante = {
    name,
    last_name,
    age: parseInt(age),
    career,
    cars: [],
    single: true,
    address: {
      country: 'Desconocido',
      city: 'Desconocida',
      street: 'Desconocida',
      coordinates: { latitude: 0, longitude: 0 }
    }
  };

  const response = await fetch(baseURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(nuevoEstudiante),
  });

  if (response.ok) {
    alert('Estudiante creado con éxito');
  } else {
    alert('Error al crear el estudiante');
  }
}


async function eliminarEstudiante(id) {
  const confirmacion = confirm('¿Seguro que quieres eliminar este estudiante?');
  if (confirmacion) {
    const response = await fetch(`${baseURL}/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      alert('Estudiante eliminado');
      mostrarTodosEstudiantes(); 
    } else {
      alert('Error al eliminar el estudiante');
    }
  }
}

async function actualizarCareer(id) {
  const nuevaCareer = prompt('Ingresa la nueva carrera del estudiante:');
  
  const response = await fetch(`${baseURL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ career: nuevaCareer }),
  });

  if (response.ok) {
    alert('Carrera actualizada');
    mostrarTodosEstudiantes(); 
  } else {
    alert('Error al actualizar la carrera');
  }
}