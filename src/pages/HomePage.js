
// import { Button } from 'primereact/button';
// import { Card } from 'primereact/card';
import axios from 'axios';
import NavBar from '../components/NavBar';
import Table from '../components/Table';
import { data } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { obtenerListaTareas } from '../services/Task'
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { obtenerDatosUser } from '../services/User'
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

function HomePage (){
    const navigate = useNavigate();
    const headers = ['id', 'titulo', 'descripcion','estado', 'fechaLimite']
    const [tasks, setTasks] = useState([])
    const [tasksProgress, setProgressTask ] = useState([])
    const [tasksFinished, setTaskFinished ] = useState([])
    const [userEmail, setEmail] = useState(null)
    useEffect(() => {
        obtenerListaTareas({estado: 0}).then(data => setTasks(data));
    }, []);

    useEffect(() => {
        obtenerListaTareas({estado: 1}).then(data => setProgressTask(data));
    }, []);

    useEffect(() => {
        obtenerListaTareas({estado: 2}).then(data => setTaskFinished(data));
    }, []);

    const dataUser = async() => {
        try {
           const user= await obtenerDatosUser();
           setEmail(user.data.response.correo)
        } catch (error) {
            // Swal.fire({
            //     icon: "error",
            //     title: "Acceso denegado",
            //     text: "Debe ingresar o crear un usuario",
            // });
        }
    }
    dataUser();

    const items = [
        {
            label: 'Pagina Principal',
            icon: 'pi pi-home'
        },
        {
            label: 'Calendario',
            icon: 'pi pi-star'
        },
        {
            label: 'Sobre mi',
            icon: 'pi pi-envelope'
        }
    ];

    const endNavBar = () => {
        const logOut = () => {
            localStorage.removeItem("token")
            navigate('/')
        }

        return(
            <div className="flex flex-row ">
                    <Button className='gap-2 p-2 bg-blue-500 rounded-lg' onClick={logOut}>
                        <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" shape="circle" />
                        <label className='text-white font-sans'>{userEmail}</label>
                    </Button>
            </div>
        );
    } 

    // window.location.reload();

    return (
        <div className="w-full h-full bg-[#f1f1f1]">
            <div className='px-4'>
                <NavBar items={items} end={endNavBar}/>
            </div>
            <div className='my-5 h-[90%]'>
                <Table headers={headers} items={tasks} itemsProgress={tasksProgress} itemsFinished={tasksFinished}/>
            </div>
            {/* <Accordion activeIndex={0}>
                <AccordionTab header="Header I">
                    <p className="m-0">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </AccordionTab>
                <AccordionTab header="Header II">
                    <p className="m-0">
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                        quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
                        sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                        Consectetur, adipisci velit, sed quia non numquam eius modi.
                    </p>
                </AccordionTab>
                <AccordionTab header="Header III">
                    <p className="m-0">
                        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti
                        quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt
                        mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
                        Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
                    </p>
                </AccordionTab>
            </Accordion> */}
        </div>
    )
}

export default HomePage;