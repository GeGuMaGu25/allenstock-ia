/**
 * @summary Ensamblador para convertir el payload del token/login a la entidad User.
 * @author Gustavo Alonso Olivares Lao
 */
import { User } from '../domain/model/user.entity.js';

export class UserAssembler {
    toEntity(data) {
        return new User(data);
    }
}