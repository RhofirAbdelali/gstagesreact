import { Outlet, Link } from "react-router-dom";
import React from "react";
const Layout = () => {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/students">Voir tous les étudiants</Link>
                    </li>
                    <li>
                        <Link to="/supervisors">Voir tous les encadrants</Link>
                    </li>
                </ul>
            </nav>
            <Outlet/>
        </>
    )
};
export default Layout;