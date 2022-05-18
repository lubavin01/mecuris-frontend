import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/v1';

export class ObjectService {
    static async getEntries() {
        const { data } = await axios.get('/entries', { baseURL: BASE_URL });

        return data.data;
    }

    static async createEntry(entry) {
        const { color = '', width = 0, height = 0, depth = 0, positionX = 0, positionY = 0, positionZ = 0 } = entry;
        const { data } = await axios.post('/entries', { color, width, height, depth, positionX, positionY, positionZ }, { baseURL: BASE_URL });
        return data.data;
    }

    static async updateEntry(entry) {
        const { _id: entryId, color = '', width = 0, height = 0, depth = 0, positionX = 0, positionY = 0, positionZ = 0 } = entry;
        await axios.put(`/entries/${entryId}`, { color, width, height, depth, positionX, positionY, positionZ }, { baseURL: BASE_URL });

    }

    static async deleteEntry(entryId) {
        await axios.delete(`/entries/${entryId}`, { baseURL: BASE_URL });
    }
}
