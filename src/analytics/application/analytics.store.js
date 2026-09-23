/**
 * @summary Gestor de estado para procesar y almacenar las predicciones de OpenAI.
 * @author Gustavo Alonso Olivares Lao
 */
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { AiRecommendation } from '../domain/model/ai-recommendation.entity.js';

export const useAnalyticsStore = defineStore('analytics', () => {
    const recommendations = ref([]);
    const isAnalyzing = ref(false);

    const fetchPredictions = async () => {
        isAnalyzing.value = true;
        try {
            // Simula el tiempo de procesamiento de OpenAI
            await new Promise(resolve => setTimeout(resolve, 1500));
            recommendations.value = [
                new AiRecommendation({
                    id: 1,
                    producto_id: 2, // Teclado Mecánico
                    accion_sugerida: 'Promocion',
                    probabilidad_exito: 0.88,
                    justificacion_ia: 'Baja rotación histórica en este trimestre. Se sugiere aplicar un 20% de descuento para liberar stock antes de fin de año.'
                })
            ];
        } finally {
            isAnalyzing.value = false;
        }
    };

    return { recommendations, isAnalyzing, fetchPredictions };
});