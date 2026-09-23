/**
 * @summary Entidad que representa a un usuario autenticado en el sistema.
 * @author Gustavo Alonso Olivares Lao
 */
export class User {
    constructor({ id, nombre_completo, rol, token }) {
        this.id = id;
        this.fullName = nombre_completo;
        // rol: 'Administrador' o 'Cajero'[cite: 6]
        this.role = rol;
        this.token = token;
    }
}