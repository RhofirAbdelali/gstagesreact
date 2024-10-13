import React from 'react';
import { useParams } from 'react-router-dom';

const studentsList = [
    { id: 1, firstName: "Abdelali", lastName: "Rhofir", email: "Abdo.rhofir@gmail.com" },
    { id: 2, firstName: "Karim", lastName: "Benlala", email: "karim@gmail.com" },
    { id: 3, firstName: "Sami", lastName: "Essou", email: "Sami@gmail.com" }
];

function StudentDetail() {
    const { id } = useParams();
    const student = studentsList.find((s) => s.id === parseInt(id));

    return (
        <div>
            <h3>Détails de l'étudiant {student.firstName}</h3>
            <p>Prenom : {student.firstName}</p>
            <p>Nom : {student.lastName}</p>
            <p>Email : {student.email}</p>
        </div>
    );
}

export default StudentDetail;