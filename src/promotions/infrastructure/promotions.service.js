import axios from 'axios';

export class PromotionsService {
    async applyDiscount(dto) {
        return await axios.post('http://localhost:5000/api/v1/promotions/apply', dto);
    }

    // NUEVO METODO
    async getActivePromotions() {
        return await axios.get('http://localhost:5000/api/v1/promotions/active');
    }
}