document.addEventListener("DOMContentLoaded", () => {
    miHospital.agregarPaciente(new Paciente("Juan Pérez", "123456789", 30, "Ninguna"));
    miHospital.agregarPaciente(new Paciente("Ana María", "987654321", 25, "Alergia a la penicilina"));
    miHospital.agregarPaciente(new Paciente("Marcos Argandoña", "111111111", 35, "Fiebre"));
    miHospital.agregarPaciente(new Paciente("Jesus Cornejo", "222222222", 29, "Influenza"));
    miHospital.agregarPaciente(new Paciente("Valentina Iturrieta", "333333333", 64, "COVID"));
    miHospital.agregarPaciente(new Paciente("Elena Roma", "444444444", 48, "Dolor Lumbar"));

    window.agregarPacienteDesdeUI = function () {
        const nombre = document.getElementById('inputNombre').value;
        const rut = document.getElementById('inputRUT').value;
        const edad = parseInt(document.getElementById('inputEdad').value);
        const historiaMedica = document.getElementById('inputHistoriaMedica').value;

        if (!nombre || !rut || isNaN(edad) || !historiaMedica) {
            alert('Por favor, completa todos los campos correctamente.');
            return;
        }

        const paciente = new Paciente(nombre, rut, edad, historiaMedica);
        miHospital.agregarPaciente(paciente);
        mostrarPacientes();
        limpiarInputs();
    };

    window.buscarPacienteDesdeUI = function () {
        const nombre = document.getElementById('inputNombre').value;
        const rut = document.getElementById('inputRUT').value;
        let resultados;
        if (nombre) {
            resultados = miHospital.buscarPacientePorNombre(nombre);
        } else if (rut) {
            resultados = [miHospital.buscarPacientePorRUT(rut)];
        }
        mostrarResultados(resultados.filter(paciente => paciente !== null));
    };

    window.mostrarPacientes = function () {
        mostrarResultados(miHospital.mostrarTodosPacientes());
    };

    function mostrarResultados(pacientes) {
        const output = document.getElementById('output');
        output.innerHTML = '';
        pacientes.forEach(paciente => {
            const p = document.createElement('div');
            p.className = 'patient-list__item';
            p.innerHTML = `
                <span>${paciente.mostrarDatos()}</span>
                <button onclick="editarPaciente('${paciente.rut}')" class="btn btn-small btn-warning">Edita</button>
                <button onclick="eliminarPaciente('${paciente.rut}')" class="btn btn-small btn-danger">Elimina</button>
            `;
            output.appendChild(p);
        });
    }

    window.editarPaciente = function (rut) {
        const paciente = miHospital.buscarPacientePorRUT(rut);
        if (paciente) {
            document.getElementById('inputNombre').value = paciente.nombre;
            document.getElementById('inputRUT').value = paciente.rut;
            document.getElementById('inputEdad').value = paciente.edad;
            document.getElementById('inputHistoriaMedica').value = paciente.historiaMedica;
            document.getElementById('confirmarEdicion').style.display = 'block';
        }
    };

    window.eliminarPaciente = function (rut) {
        if (confirm('¿Estás seguro de querer eliminar este paciente?')) {
            miHospital.eliminarPaciente(rut);
            mostrarPacientes();
        }
    };

    window.confirmarEdicion = function () {
        const nombre = document.getElementById('inputNombre').value;
        const rut = document.getElementById('inputRUT').value;
        const edad = parseInt(document.getElementById('inputEdad').value);
        const historiaMedica = document.getElementById('inputHistoriaMedica').value;
        const pacienteActualizado = new Paciente(nombre, rut, edad, historiaMedica);
        miHospital.actualizarPaciente(pacienteActualizado);
        mostrarPacientes();
        limpiarInputs();
    };

    function limpiarInputs() {
        document.getElementById('inputNombre').value = '';
        document.getElementById('inputRUT').value = '';
        document.getElementById('inputEdad').value = '';
        document.getElementById('inputHistoriaMedica').value = '';
        document.getElementById('confirmarEdicion').style.display = 'none';
    }
});
