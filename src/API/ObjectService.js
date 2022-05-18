import axios from 'axios';

export class ObjectService {
    static async getEntries() {
        const { data } = await axios.get('http://localhost:5000/entries');

        return data.data;
    }

    static async createEntry(entry) {
        const { color = '', width = 0, height = 0, depth = 0, positionX = 0, positionY = 0, positionZ = 0 } = entry;
        const { data } = await axios.post('http://localhost:5000/entries', { color, width, height, depth, positionX, positionY, positionZ });
        return data.data;
    }

    static async updateEntry(entry) {
        const { _id: id, color = '', width = 0, height = 0, depth = 0, positionX = 0, positionY = 0, positionZ = 0 } = entry;
        await axios.put('http://localhost:5000/entries', { id, color, width, height, depth, positionX, positionY, positionZ });

    }

    static async deleteEntry(entryId) {
        await axios.delete(`http://localhost:5000/entries/${entryId}`);
    }
}
