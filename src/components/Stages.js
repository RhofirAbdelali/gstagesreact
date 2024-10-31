import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import StageService from "./services/StageService";
import MyTextInput from './MyTextInput';
import { Modal, Button } from 'react-bootstrap';

function Stages() {
    const [stagesList, setStagesList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [selectedStage, setSelectedStage] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isViewing, setIsViewing] = useState(false);

    const initialFormState = {
        id: null,
        name: '',
        description: ''
    };

    useEffect(() => {
        setLoading(true);
        StageService.fetchAllStages()
            .then(data => {
                setStagesList(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching stages:', error);
                setError(true);
                setLoading(false);
            });
    }, []);

    const deleteById = async (id) => {
        await StageService.deleteStage(id);
        setStagesList(stagesList.filter(stage => stage.id !== id));
    };

    const handleAddStage = () => {
        setIsEditing(false);
        setIsViewing(false);
        setSelectedStage(initialFormState);
        setShowModal(true);
    };

    const handleSelect = (stage) => {
        setIsEditing(false);
        setIsViewing(true);
        setSelectedStage(stage);
        setShowModal(true);
    };

    const handleUpdate = (stage) => {
        setIsEditing(true);
        setIsViewing(false);
        setSelectedStage(stage);
        setShowModal(true);
    };

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        if (isEditing) {
            await StageService.updateStage(values);
            setStagesList(stagesList.map(stage => (stage.id === values.id ? values : stage)));
        } else {
            await StageService.addStage(values);
            setStagesList([...stagesList, { ...values, id: stagesList.length + 1 }]);
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
                <h2>Liste des stages</h2>
                <Button variant="success" onClick={handleAddStage}>Ajouter un stage</Button>

                <div className="table-responsive mt-4">
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>Intitulé</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {stagesList.map((stage) => (
                            <tr key={stage.id}>
                                <td>{stage.name}</td>
                                <td>{stage.description}</td>
                                <td>
                                    <button className="btn btn-warning btn-sm me-2"
                                            onClick={() => handleUpdate(stage)}>Modifier
                                    </button>
                                    <button className="btn btn-info btn-sm me-2"
                                            onClick={() => handleSelect(stage)}>Afficher
                                    </button>
                                    <button className='btn btn-danger btn-sm me-2'
                                            onClick={() => deleteById(stage.id)}>Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    <Modal show={showModal} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                {isEditing ? 'Modifier un stage' : isViewing ? 'Détails du stage' : 'Ajouter un stage'}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {isViewing ? (
                                <div>
                                    <p><strong>Intitulé : </strong>{selectedStage.name}</p>
                                    <p><strong>Description : </strong>{selectedStage.description}</p>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>Fermer</Button>
                                    </Modal.Footer>
                                </div>
                            ) : (
                                <Formik
                                    initialValues={selectedStage}
                                    validationSchema={Yup.object({
                                        name: Yup.string()
                                            .max(50, 'Doit faire 50 caractères ou moins')
                                            .required('Requis'),
                                        description: Yup.string()
                                            .required('Requis'),
                                    })}
                                    onSubmit={handleSubmit}
                                >
                                    <Form>
                                        <MyTextInput name="name" type="text" label="Intitulé"/>
                                        <MyTextInput name="description" type="text" label="Description"/>
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

export default Stages;