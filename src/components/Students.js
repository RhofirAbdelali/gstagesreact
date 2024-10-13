import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const studentsList = [
    { id: 1, firstName: "Abdelali", lastName: "Rhofir", email: "Abdo.rhofir@gmail.com" },
    { id: 2, firstName: "Karim", lastName: "Benlala", email: "karim@gmail.com" },
    { id: 3, firstName: "Sami", lastName: "Essou", email: "Sami@gmail.com" }
];

function Students() {
    const [selectedStudent, setSelectedStudent] = useState(null);

    const handleSelect = (student) => {
        setSelectedStudent(student);
    };

    return (
        <div>
            <h2>Liste des étudiants</h2>
            <ul>
                {studentsList.map((student) => (
                    <li key={student.id}>
                        {student.firstName}
                        <button onClick={() => handleSelect(student)}>Afficher détails partiels</button>
                        <Link to={`/students/${student.id}`}>
                            <button>Afficher détails complets</button>
                        </Link>
                    </li>
                ))}
            </ul>

            {selectedStudent && (
                <div>
                    <h3>Détails de l'étudiant</h3>
                    <p>Prenom : {selectedStudent.firstName}</p>
                    <p>Nom : {selectedStudent.lastName}</p>
                </div>
            )}
        </div>
    );
}

export default Students;