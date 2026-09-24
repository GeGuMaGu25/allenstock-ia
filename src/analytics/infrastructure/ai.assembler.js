/**
 * @summary Ensamblador para formatear las respuestas de la IA.
 * @author Gustavo Alonso Olivares Lao
 */
import { AiRecommendation } from '../domain/model/ai-recommendation.entity.js';

export class AiAssembler {
    toEntity(data) { return new AiRecommendation(data); }
}