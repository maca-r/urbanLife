import React, { useEffect, useState } from 'react'
import { useContextoGlobal } from '../GlobalContext'
import Table from 'react-bootstrap/Table';
import parse from 'date-fns/parse';
import { format } from 'date-fns';
import axios from 'axios';
import Button from 'react-bootstrap/esm/Button';
import { Modal } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';


const Reserva = () => {

    const {dataState} = useContextoGlobal()
    
    const [productoReserva, setProductoReserva] = useState({})

    const [dates, setDates] = useState({})

    const [usuarioReserva, setUsuarioReserva] = useState({})
    
    useEffect(() => {
        setProductoReserva(dataState?.producto)
        setDates(dataState?.dates)
        //console.log(productoReserva);
        //console.log(dates)
    })

    const imageUrl =
    productoReserva.imagenes && productoReserva.imagenes[0] 
    ? productoReserva.imagenes[0].urlImagen 
    : "";

    const publicUrl = import.meta.env.VITE_API_URL_PUBLIC;
    const privateUrl = import.meta.env.VITE_API_URL_PRIVATE;

    const {id} = useParams();

    const urlGetUsuario =
        privateUrl != ""
        ? `${privateUrl}:80/auth/usuarios/obtener/${id}`
        : `${publicUrl}:80/auth/usuarios/obtener/${id}`;

    //    const token = localStorage.setItem("token", response.data.access_token )
    //const token = localStorage.setItem("token", "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTY5NTMyMzA2OCwiZXhwIjoxNjk1NDA5NDY4fQ.HItdqbICeFPebmSr2_t35qFKp7PBVipB_SX6utvt5iQ" )
    const storedToken = localStorage.getItem("token");        

    const headers = {
        Authorization: `Bearer ${storedToken}`,
    };
    

    useEffect(() => {
        axios
        .get(urlGetUsuario, { headers })
        .then((response) => {
            console.log(response.data);
            setUsuarioReserva(response.data)
        })
        
        }, [])

    const [show, setShow] = useState(false);


    const navigate = useNavigate()

    const handleClose = () => {
        setShow(false);
        navigate("/")
    }

    const handleShow = () => setShow(true);
    


    return (
    <div>
        <Table>
        <thead>
        <tr>
            <th>ID</th>
            <th>Titulo</th>
            <th>Precio</th>
            <th>Imagen</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td>{productoReserva.idProducto}</td>
            <td>{productoReserva.nombre}</td>
            <td>{productoReserva.precio}</td>
            <img src={imageUrl} style={{width: "20%"}}></img>
        </tr>
        </tbody>
        </Table>

        <div >
            <Table>
                <thead>
                    <tr>
                        <th>Fecha Inicio Reserva</th>
                        <th>Fecha Fin Reserva</th>

                    </tr>
                </thead>

                <tbody>
                    <tr>
                        
                        <td>{dates[0]}</td>
                        <td>{dates[1]}</td>
                        
                    </tr>
                </tbody>
            </Table>
        </div>

        <div >
            <Table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Email</th>
                        <th>Telefono</th>


                    </tr>
                </thead>

                <tbody>
                    <tr>
                        
                        <td>{usuarioReserva.nombre}</td>
                        <td>{usuarioReserva.apellido}</td>
                        <td>{usuarioReserva.email}</td>
                        <td>{usuarioReserva.telefono}</td>

                        
                    </tr>
                </tbody>
            </Table>

            <Button onClick={handleShow}
            style={{
                width: "20%",
                backgroundColor: "#E3B04B",
                border: "none",
                color: "#2B2B28",
            }}>   
                Confirma Reserva
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Confirmación de reserva</Modal.Title>
                </Modal.Header>
                <Modal.Body>¿Desea confirmar su reserva?</Modal.Body>
                <Modal.Footer>
                <Button variant="success" onClick={handleClose}>
                    Sí
                </Button>
                <Button variant="danger" onClick={handleClose}>
                    No
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
        
    </div>
    )
}

export default Reserva
