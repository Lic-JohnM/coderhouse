const crypto = require('crypto');

class UserManager {
    static usuarios = [];

    static mostrarUsuarios() {
        return this.usuarios;
    }

    static addUser(nombre, apellido, username, password) {
        const id = this.usuarios.length + 1; // Asignar un ID basado en el número de usuarios
        const hashedPassword = crypto.createHmac('sha256', password).update('salt').digest('hex'); // Hash del password

        const nuevoUsuario = {
            id,
            nombre,
            apellido,
            username,
            password: hashedPassword,
        };

        this.usuarios.push(nuevoUsuario);
    }
}

// Ejemplo de uso
UserManager.addUser('Juan', 'Pérez', 'juanp', 'mi_contraseña');
console.log(UserManager.mostrarUsuarios());
