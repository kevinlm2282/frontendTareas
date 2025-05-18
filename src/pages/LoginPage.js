import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { useNavigate } from "react-router-dom";
import { Password } from 'primereact/password';
import axios from "axios";
import Swal from 'sweetalert2'

function LoginPage(){
    // localStorage.setItem("token",'')
    // localStorage.setItem("user",'')
    const navigate = useNavigate();
    const [isFlipped, setIsFlipped] = useState(false);
    const [formData, setFormData] = useState({
        correo: '',
        contrasenia: '',
        nombre: ''
    });

    const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
    };

    const limpiarFormulario = () => {
        setFormData({
            correo: '',
            contrasenia: '',
            nombre: ''
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(formData.nombre === ''){
            axios.post(`/api/auth/login`,formData)
            .then(function (response) {
                localStorage.setItem("token",btoa(response.data.response.token));
                setTimeout(() => navigate('/HomePage'), 2000)
              })
            .catch(function (error) {
                // console.log(error)
              Swal.fire({
                  icon: "error",
                  title: "Inicio de sesion fallido",
                  text: "El usuario o la contraseña son incorrectos",
                  showConfirmButton: false,
                  timer: 1500
              });
            })
            
        }else{
            axios.post(`/usuarios`,formData)
            .then(function (response) {
                Swal.fire({
                    title: "Se registro su usuario con exito",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500
                });
                limpiarFormulario()
              })
            .catch(function (error) {
              Swal.fire({
                  icon: "error",
                  title: "Registro Fallido",
                  text: "Hubo un problema la registrar su usuario",
              });
              limpiarFormulario()
            })
        }
        
    };

    document.getElementById('flipButton')?.addEventListener('click', () => {
        const card = document.getElementById('card');
        card.classList.toggle('rotate-y-180'); 
      });



    return (
        <div className="bg-[#dbdbdb] w-[100%] h-dvh flex items-center justify-center">
            <div className="w-[90%] h-[80%] bg-[#ffffff] rounded-3xl shadow-2xl flex flex-col-2">
                <div className={`w-[50%] flex justify-center px-32 py-4 flex-col-1 relative transition-transform duration-500 transform-style-preserve-3d
                ${
                    isFlipped ? 'rotate-y-180' : ''
                }`}
                >
                <div className="flex flex-col absolute w-[95%] h-[95%] px-12 bg-white shadow-xl backface-hidden justify-center rounded-xl">
                    <h2 className="font-bold font-sans text-4xl">Hola, Bienvenido de vuelta</h2>
                    <p className="py-5"> Hey, Bienvenido de vuelta a tu gestor de tareas favorito:</p>
                    <form onSubmit={handleSubmit}>
                        <div className="my-2">
                            <label className="mb-2 font-sans">Correo</label>
                            <InputText type="email" id="correo" name="correo" value={formData.correo} onChange={handleChange} required className="border-2 border-gray-200 hover:border-gray-400 w-[100%] rounded-lg p-2 shadow-lg"/>
                        </div>
                        <div className="my-2">
                            <label className="mb-2 font-sans">Contraseña</label>
                            <InputText type="password" id="contrasenia" name="contrasenia" value={formData.contrasenia} onChange={handleChange} required className="w-[100%] border-2 border-gray-200 hover:border-gray-400 rounded-lg p-2 shadow-lg" />
                        </div>
                        <div className="w-[100%] flex">
                            <Button type="submit" className="mt-4 flex-grow W-[100%] p-3 text-white font-sans bg-blue-500 hover:bg-blue-400 shadow-lg rounded-lg" label="Iniciar Sesion" />
                        </div>
                    </form>
                    <p className="font-sans font-semibold pt-6">No tienes una cuenta <a className="text-blue-500 hover:text-blue-400" onClick={() => { 
                        limpiarFormulario ()
                        setIsFlipped(!isFlipped) }}>Registrate</a></p>
                </div>
                <div className="absolute px-12 w-[95%] h-[95%] bg-white rounded-lg shadow-lg backface-hidden flex flex-col justify-center transform rotate-y-180">
                    <Button className="pb-4" icon="pi pi-arrow-left" onClick={() => {
                        limpiarFormulario ()
                        setIsFlipped(!isFlipped)}}/>
                    <h2 className="font-bold font-sans text-4xl">Hola, Bienvenido registrate</h2>
                    <p className="py-5"> Hey, Bienvenido registrate para empezar </p>
                    <form onSubmit={handleSubmit}>
                        <div className="my-2">
                            <label className="mb-2 font-sans">Nombre</label>
                            <InputText type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required className="border-2 border-gray-200 hover:border-gray-400 w-[100%] rounded-lg p-2 shadow-lg"/>
                        </div>
                        <div className="my-2">
                            <label className="mb-2 font-sans">Correo</label>
                            <InputText type="email" id="correo" name="correo" value={formData.correo} onChange={handleChange} required className="border-2 border-gray-200 hover:border-gray-400 w-[100%] rounded-lg p-2 shadow-lg"/>
                        </div>
                        <div className="my-2">
                            <label className="mb-2 font-sans">Contraseña</label>
                            <InputText type="password" id="contrasenia" name="contrasenia" value={formData.contrasenia} onChange={handleChange} required className="border-2 border-gray-200 hover:border-gray-400 w-[100%] rounded-lg p-2 shadow-lg"/>
                        </div>
                        <div className="w-[100%] flex">
                            <Button type="submit" className="mt-4 flex-grow W-[100%] p-3 text-white font-sans bg-blue-500 hover:bg-blue-400 shadow-lg rounded-lg" label="Registrar" />
                        </div>
                    </form>
                </div>
                </div>
                <div className="w-[50%] overflow-hidden flex justify-center items-center">
                    <img className="object-cover w-[95%] h-[95%]" src="./login.jpeg" href="vv" alt="vewvew"></img>
                </div>
            </div>
        </div>
        // <div className="bg-[#dbdbdb] w-[100%] h-dvh flex items-center justify-center">
        //     <div className="w-[90%] h-[80%] bg-[#ffffff] rounded-3xl shadow-2xl flex flex-col-2">
        //         <div className="w-[50%] flex justify-center px-32 py-1 flex-col ">
        //             <h2 className="font-bold font-sans text-4xl">Hola, Bienvenido de vuelta</h2>
        //             <p className="py-5"> Hey, Bienvenido de vuelta a tu gestor de tareas favorito:</p>
        //             <form onSubmit={handleSubmit}>
        //                 <div className="my-2">
        //                     <label className="mb-2 font-sans">Correo</label>
        //                     <InputText type="email" id="correo" name="correo" value={formData.nombre} onChange={handleChange} required className="border-2 border-gray-200 hover:border-gray-400 w-[100%] rounded-lg p-2 shadow-lg"/>
        //                 </div>
        //                 <div className="my-2">
        //                     <label className="mb-2 font-sans">Contraseña</label>
        //                     <InputText type="password" id="contrasenia" name="contrasenia" value={formData.contrasenia} onChange={handleChange} required className="border-2 border-gray-200 hover:border-gray-400 w-[100%] rounded-lg p-2 shadow-lg"/>
        //                 </div>
        //                 <div className="w-[100%] flex">
        //                     <Button type="submit" className="mt-4 flex-grow W-[100%] p-3 text-white font-sans bg-blue-500 hover:bg-blue-400 shadow-lg rounded-lg" label="Iniciar Sesion" />
        //                 </div>
        //             </form>
        //             <p className="font-sans font-semibold pt-6">No tienes unaa cuenta <a href="" className="text-blue-500 hover:text-blue-400">Registrate</a></p>
        //         </div>
        //         <div className="w-[50%] overflow-hidden flex justify-center items-center">
        //             <img className="object-cover w-[95%] h-[95%]" src="./login.jpeg" href="" alt=""></img>
        //         </div>
        //     </div>
        // </div>
    );
}

export default LoginPage;
