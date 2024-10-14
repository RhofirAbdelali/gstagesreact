import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import StudentService from './services/StudentService';

function StudentDetail() {
    const { id } = useParams();
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchStudentDetails = async () => {
            try {
                const fetchedStudent = await StudentService.fetchStudent(id);
                if (fetchedStudent) {
                    setStudent(fetchedStudent);
                } else {
                    setError(true);
                }
            } catch (err) {
                console.error('Error fetching student:', err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchStudentDetails();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Étudiant non trouvé ou erreur de chargement.</p>;
    }

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