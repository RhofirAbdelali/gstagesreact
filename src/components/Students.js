import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import StudentService from "./services/StudentService";
import MyTextInput from './MyTextInput';
import { Modal, Button } from 'react-bootstrap';

function Students() {
    const [studentsList, setStudentsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isViewing, setIsViewing] = useState(false);

    const initialFormState = {
        id: null,
        firstName: '',
        lastName: '',
        email: ''
    };

    useEffect(() => {
        setLoading(true);
        StudentService.fetchAllStudents()
            .then(data => {
                setStudentsList(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching students:', error);
                setError(true);
                setLoading(false);
            });
    }, []);

    const deleteById = async (id) => {
        await StudentService.deleteStudent(id);
        setStudentsList(studentsList.filter(student => student.id !== id));
    };

    const handleAddStudent = () => {
        setIsEditing(false);
        setIsViewing(false);
        setSelectedStudent(initialFormState);
        setShowModal(true);
    };

    const handleSelect = (student) => {
        setIsEditing(false);
        setIsViewing(true);
        setSelectedStudent(student);
        setShowModal(true);
    };

    const handleUpdate = (student) => {
        setIsEditing(true);
        setIsViewing(false);
        setSelectedStudent(student);
        setShowModal(true);
    };

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        if (isEditing) {
            await StudentService.updateStudent(values);
            setStudentsList(studentsList.map(student => (student.id === values.id ? values : student)));
        } else {
            await StudentService.addStudent(values);
            setStudentsList([...studentsList, { ...values, id: studentsList.length + 1 }]);
        }
        resetForm();
        setShowModal(false);
        setSubmitting(false);
    };

    const handleClose = () => setShowModal(false);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error occurred while fetching data!</p>;
    }

    return (<div className="p-4">
        <div className="container-fluid">
            <h2>Liste des étudiants</h2>
            <Button variant="success" onClick={handleAddStudent}>Ajouter un étudiant</Button>

            <div className="table-responsive mt-4">
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Prénom</th>
                        <th>Nom</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {studentsList.map((student) => (
                        <tr key={student.id}>
                            <td>{student.firstName}</td>
                            <td>{student.lastName}</td>
                            <td>{student.email}</td>
                            <td>
                                <button className="btn btn-warning btn-sm me-2"
                                        onClick={() => handleUpdate(student)}>Modifier
                                </button>
                                <button className="btn btn-info btn-sm me-2"
                                        onClick={() => handleSelect(student)}>Afficher
                                </button>
                                <button className='btn btn-danger btn-sm me-2'
                                        onClick={() => deleteById(student.id)}>Supprimer
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {isEditing ? 'Modifier un étudiant' : isViewing ? 'Détails de l\'étudiant' : 'Ajouter un étudiant'}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {isViewing ? (
                            <div>
                                <p><strong>Prénom : </strong>{selectedStudent.firstName}</p>
                                <p><strong>Nom : </strong>{selectedStudent.lastName}</p>
                                <p><strong>Email : </strong>{selectedStudent.email}</p>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>Fermer</Button>
                                </Modal.Footer>
                            </div>
                        ) : (
                            <Formik
                                initialValues={selectedStudent}
                                validationSchema={Yup.object({
                                    firstName: Yup.string()
                                        .max(15, 'Doit faire 15 caractères ou moins')
                                        .required('Requis'),
                                    lastName: Yup.string()
                                        .max(15, 'Doit faire 15 caractères ou moins')
                                        .required('Requis'),
                                    email: Yup.string()
                                        .email('Adresse e-mail invalide')
                                        .required('Requis'),
                                })}
                                onSubmit={handleSubmit}
                            >
                                <Form>
                                    <MyTextInput name="firstName" type="text" label="Prénom"/>
                                    <MyTextInput name="lastName" type="text" label="Nom"/>
                                    <MyTextInput name="email" type="email" label="Email"/>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>Fermer</Button>
                                        <Button type="submit" className="btn btn-primary">
                                            {isEditing ? 'Mettre à jour' : 'Ajouter'}
                                        </Button>
                                    </Modal.Footer>
                                </Form>
                            </Formik>
                        )}
                    </Modal.Body>
                </Modal>
            </div>
        </div>
        </div>
        );
        }

        export default Students;