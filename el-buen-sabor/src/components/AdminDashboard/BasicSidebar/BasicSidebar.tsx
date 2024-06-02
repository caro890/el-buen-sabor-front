import React from 'react';
import { Link } from 'react-router-dom';
import { cilBarChart, cilBuilding, cilCart, cilFastfood, cilPeople } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CNavGroup, CNavItem, CNavTitle, CSidebar, CSidebarNav } from "@coreui/react";
import '@coreui/coreui/dist/css/coreui.min.css';
import { cilDollar } from "@coreui/icons";
import { useAppSelector } from '../../../hooks/redux';


const BasicSidebar: React.FC = () => {
    const empresaSelected = useAppSelector((state) => state.empresaReducer.empresa);
    return (
        
            <CSidebar className="border-end d-flex flex-column" style={{ height: '100vh' }}>
                <CSidebarNav>
                    <CNavTitle>
                        <h3>{empresaSelected?.nombre}</h3>
                    </CNavTitle>
                    <CNavItem>
                        <Link to="/dashboard" className="nav-link" >
                            <CIcon customClassName="nav-icon" icon={cilBarChart} />
                            Inicio
                        </Link>
                    </CNavItem>

                    <CNavItem>
                        <Link to="sucursales" className="nav-link">
                            <CIcon customClassName="nav-icon" icon={cilBuilding} />
                            Sucursales
                        </Link>
                    </CNavItem>
                    <CNavGroup
                        toggler={
                            <>
                                <CIcon customClassName="nav-icon" icon={cilFastfood} />
                                Productos
                            </>
                        }
                    >
                        <CNavItem>
                            <Link to="productos" className="nav-link" >
                                <span className="nav-icon"><span className="nav-icon-bullet"></span></span>
                                Lista de Productos
                            </Link>
                        </CNavItem>
                        <CNavItem>
                            <Link to="categorias" className="nav-link">
                                <span className="nav-icon"><span className="nav-icon-bullet"></span></span>
                                Categorías
                            </Link>
                        </CNavItem>
                        <CNavItem>
                            <Link to="unidadesmedida" className="nav-link">
                                <span className="nav-icon"><span className="nav-icon-bullet"></span></span>
                                Unidades de Medida
                            </Link>
                        </CNavItem>
                    </CNavGroup>

                    <CNavItem>
                        <Link to="/dashboard" className="nav-link">
                            <CIcon customClassName="nav-icon" icon={cilDollar} />
                            Promociones
                        </Link>
                    </CNavItem>

                    <CNavGroup
                        toggler={
                            <>
                                <CIcon customClassName="nav-icon" icon={cilPeople} />
                                Empleados
                            </>
                        }
                    >
                        <CNavItem>
                            <Link to="empleados" className="nav-link" >
                                <span className="nav-icon"><span className="nav-icon-bullet"></span></span>
                                Lista de Empleados
                            </Link>
                        </CNavItem>
                        <CNavItem>
                            <Link to="/dashboard" className="nav-link">
                                <span className="nav-icon"><span className="nav-icon-bullet"></span></span>
                                Roles
                            </Link>
                        </CNavItem>
                    </CNavGroup>
                    <CNavItem>
                        <Link to="insumos" className="nav-link">
                            <CIcon customClassName="nav-icon" icon={cilCart} />
                            Insumos
                        </Link>
                    </CNavItem>
                </CSidebarNav>
            </CSidebar>
        

        
    );
}

export default BasicSidebar;
