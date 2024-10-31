const SERVER_URL = "http://localhost:8080";

class StageService {
    async fetchAllStages() {
        const response = await fetch(SERVER_URL + '/stages', { credentials: 'include' });
        if (!response.ok) throw new Error('Failed to fetch stages');
        return response.json();
    }

    async updateStage(stage) {
        const response = await fetch(SERVER_URL + '/stages/update/' + stage.id, {
            method: 'PUT',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(stage),
            credentials: 'include'
        });
        if (!response.ok) throw new Error('Failed to update stage');
        return response.json();
    }

    async deleteStage(id) {
        const response = await fetch(SERVER_URL + '/stages/delete/' + id, {
            method: 'DELETE',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            credentials: 'include'
        });
        if (!response.ok) throw new Error('Failed to delete stage');
    }

    async addStage(stage) {
        const response = await fetch(SERVER_URL + '/stages/addstage', {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(stage),
            credentials: 'include'
        });
        if (!response.ok) throw new Error('Failed to add stage');
        return response.json();
    }
}

const stageServiceInstance = new StageService();
export default stageServiceInstance;