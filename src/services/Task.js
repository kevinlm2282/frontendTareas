import axios from 'axios';


const token = atob(localStorage.getItem("token"))


const obtenerListaTareas = async ({estado}) => {
    let tasks = []
    // console.log(user.user)
    // console.log(token)
    await axios.get(`https://backendtareas.onrender.com/api/tarea?estado=${estado}`,{headers: { 'Authorization': token}})
    .then((response) =>{
            tasks = response.data.response
        }).
        catch((error) => {
            console.log(error)
        }).
        finally((response)=>{
        })
    return tasks;
}

const registrarTarea = async ({formData:{descripcion, fechaLimite, titulo}}) => {
    const response = await axios.post('https://backendtareas.onrender.com/api/tarea', {
        titulo,
        descripcion,
        fechaLimite
        },{headers: { 'Authorization': token}})
    return response
}

const actualizarTarea = async ({descripcion, fechaLimite, titulo, id}) => {
    const response = await axios.put(`https://backendtareas.onrender.com/api/tarea/${id}`, {
        titulo,
        descripcion,
        fechaLimite,
        },{headers: { 'Authorization': token}})
    return response
}

const updateTask = async ({id}) => {
    const response = await axios.put(`https://backendtareas.onrender.com/api/tarea/cambiar/${id}`,{},{headers:{ 'Authorization': token}})
    return response
}

const eliminarTarea = async({id}) => {
    const data = await axios.delete(`https://backendtareas.onrender.com/api/tarea/${id}`,{headers:{ 'Authorization': token}})
    console.log("llego: ", data)
    return data
    
}
export {obtenerListaTareas, registrarTarea, actualizarTarea, updateTask, eliminarTarea}