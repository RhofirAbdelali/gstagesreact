const SERVER_URL = "http://localhost:8080";

class AuthService {
    async login(credentials) {
        const response = await fetch(SERVER_URL + '/auth/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            throw new Error('Erreur de connexion');
        }

        return await response.json();
    }

    async logout() {
        return fetch(SERVER_URL + '/logout', { method: 'GET', credentials: 'include' });
    }
}

const authServiceInstance = new AuthService();
export default authServiceInstance;