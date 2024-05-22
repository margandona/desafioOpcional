class Paciente {
    constructor(nombre, rut, edad, historiaMedica) {
        this._nombre = nombre;
        this._rut = rut;
        this._edad = edad;
        this._historiaMedica = historiaMedica;
    }

    get nombre() {
        return this._nombre;
    }

    set nombre(value) {
        this._nombre = value;
    }

    get rut() {
        return this._rut;
    }

    set rut(value) {
        this._rut = value;
    }

    get edad() {
        return this._edad;
    }

    set edad(value) {
        if (typeof value === 'number' && value > 0) {
            this._edad = value;
        } else {
            console.error("Edad debe ser un número positivo.");
        }
    }

    get historiaMedica() {
        return this._historiaMedica;
    }

    set historiaMedica(value) {
        this._historiaMedica = value;
    }

    mostrarDatos() {
        return `Nombre: ${this._nombre}, RUT: ${this._rut}, Edad: ${this._edad}, Historia Médica: ${this._historiaMedica}`;
    }
}

class Hospital {
    constructor(nombre) {
        this._nombre = nombre;
        this._pacientes = [];
    }

    agregarPaciente(paciente) {
        this._pacientes.push(paciente);
    }

    buscarPacientePorNombre(nombre) {
        return this._pacientes.filter(paciente => paciente.nombre.toLowerCase().includes(nombre.toLowerCase()));
    }

    buscarPacientePorRUT(rut) {
        return this._pacientes.find(paciente => paciente.rut === rut);
    }

    mostrarTodosPacientes() {
        return this._pacientes;
    }

    eliminarPaciente(rut) {
        this._pacientes = this._pacientes.filter(paciente => paciente.rut !== rut);
    }

    actualizarPaciente(pacienteActualizado) {
        let indice = this._pacientes.findIndex(paciente => paciente.rut === pacienteActualizado.rut);
        if (indice !== -1) {
            this._pacientes[indice] = pacienteActualizado;
        }
    }
}

const miHospital = new Hospital("Hospital Central");
