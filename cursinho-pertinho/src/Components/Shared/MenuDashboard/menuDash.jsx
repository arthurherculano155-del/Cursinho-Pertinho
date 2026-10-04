import "./menuDash.scss";
import { NavLink } from 'react-router-dom';

export default function DashboardMenu(){
    return(
        <section className="link-dashboard">
            <NavLink
                to="/dashboard/usuarios"
                className={({isActive}) => 
                    isActive ? "Troca" : ""
                }>
                    Usuarios
            </NavLink>

            <NavLink
                to="/dashboard/ofertas"
                className={({isActive}) => 
                    isActive ? "Troca" : ""
                }>
                    Ofertas
            </NavLink>
        </section>
    )
}