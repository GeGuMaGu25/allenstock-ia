/**
 * @summary Ensamblador para formatear datos de Kardex antes de enviarlos o al recibirlos.
 * @author Gustavo Alonso Olivares Lao
 */
import { KardexRecord } from '../domain/model/kardex-record.entity.js';

export class KardexAssembler {
    toEntity(data) {
        return new KardexRecord(data);
    }
}