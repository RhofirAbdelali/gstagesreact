import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './components/Home';
import Stages from './components/Stages';
import Students from './components/Students';
import Companies from './components/Companies';
import Supervisors from './components/Supervisors';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import Navigationbar from "./components/Navigationbar";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigationbar/>}>
                    <Route index element={<Home/>}/>


                    <Route path="stages" element={<Stages/>}/>
                    <Route path="stages/create" element={<></>}/>
                    <Route path="stages/update" element={<></>}/>
                    <Route path="stages/delete" element={<></>}/>


                    <Route path="students" element={<Students/>}/>
                    <Route path="students/create" element={<></>}/>
                    <Route path="students/update" element={<></>}/>
                    <Route path="students/delete" element={<></>}/>


                    <Route path="companies" element={<Companies/>}/>
                    <Route path="companies/create" element={<></>}/>
                    <Route path="companies/update" element={<></>}/>
                    <Route path="companies/delete" element={<></>}/>


                    <Route path="supervisors" element={<Supervisors/>}/>
                    <Route path="supervisors/create" element={<></>}/>
                    <Route path="supervisors/update" element={<></>}/>
                    <Route path="supervisors/delete" element={<></>}/>


                    <Route path="register" element={<Register/>}/>
                    <Route path="login" element={<Login/>}/>
                    <Route path="logout" element={<Logout/>}/>

                </Route>
            </Routes>
        </Router>
    );
}

export default App;
