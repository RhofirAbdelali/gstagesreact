import {Outlet, Link} from "react-router-dom";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";

const Navigationbar = () => {
    return (
        <>
            <Navbar bg="light" variant="light" expand="lg">
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to={"/"}>Accueil</Nav.Link>

                            <NavDropdown title="Stages" id="stages-nav-dropdown">
                                <NavDropdown.Item as={Link} to={"/stages"}>Consulter les stages</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to={"/stages/create"}>Créer un stage</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to={"/stages/update"}>Mettre à jour un
                                    stage</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to={"/stages/delete"}>Supprimer un stage</NavDropdown.Item>
                            </NavDropdown>

                            <NavDropdown title="Étudiants" id="students-nav-dropdown">
                                <NavDropdown.Item as={Link} to={"/students"}>Consulter les étudiants</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to={"/students/create"}>Créer un étudiant</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to={"/students/update"}>Mettre à jour un
                                    étudiant</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to={"/students/delete"}>Supprimer un
                                    étudiant</NavDropdown.Item>
                            </NavDropdown>

                            <NavDropdown title="Entreprises" id="companies-nav-dropdown">
                                <NavDropdown.Item as={Link} to={"/companies"}>Consulter les
                                    entreprises</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to={"/companies/create"}>Créer une
                                    entreprise</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to={"/companies/update"}>Mettre à jour une
                                    entreprise</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to={"/companies/delete"}>Supprimer une
                                    entreprise</NavDropdown.Item>
                            </NavDropdown>

                            <NavDropdown title="Encadrants" id="supervisors-nav-dropdown">
                                <NavDropdown.Item as={Link} to={"/supervisors"}>Consulter les
                                    superviseurs</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to={"/supervisors/create"}>Créer un
                                    superviseur</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to={"/supervisors/update"}>Mettre à jour un
                                    superviseur</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to={"/supervisors/delete"}>Supprimer un
                                    superviseur</NavDropdown.Item>
                            </NavDropdown>

                            <NavDropdown title="Compte" id="account-nav-dropdown">
                                <NavDropdown.Item as={Link} to={"/register"}>S'enregistrer</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to={"/login"}>Se connecter</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to={"/logout"}>Se déconnecter</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>

                        <Navbar.Text>
                            Bienvenue !
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Outlet/>
        </>
    );
};

export default Navigationbar;