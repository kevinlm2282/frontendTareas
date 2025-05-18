import axios from "axios"

const token = atob(localStorage.getItem("token"))

const obtenerDatosUser = async() => {
    try {
        const userData = await axios.get('/usuario',{headers: {'Authorization': token}})
        return userData
    } catch (error) {
        return null
    }
}

export{obtenerDatosUser}