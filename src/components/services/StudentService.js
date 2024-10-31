const SERVER_URL = "http://localhost:8080";

class StudentService {
    async fetchAllStudents() {
        return fetch(SERVER_URL + '/students', {
            credentials: 'include'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch students');
                }
                return response.json();
            });
    }

    async fetchStudent(id) {
        return fetch(SERVER_URL + `/students/id/${id}`, {
            credentials: 'include'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch student');
                }
                return response.json();
            });
    }

    async updateStudent(student) {
        return fetch(SERVER_URL + '/students/update/' + student.id, {
            method: student.id ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(student),
            credentials: 'include'
        });
    }

    async deleteStudent(id) {
        const response = await fetch(SERVER_URL + '/students/delete/' + id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        if (!response.ok) {
            throw new Error('Failed to delete student');
        }
    }

    async addStudent(student) {
        return fetch(SERVER_URL + '/students/addstudent', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(student),
            credentials: 'include'
        });
    }
}

const studentServiceInstance = new StudentService();
export default studentServiceInstance;