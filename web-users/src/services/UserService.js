import axios from "axios";

const client = axios.create({
    baseURL : process.env.REACT_APP_API_BASE_URL
})

export async function getAllUsers() {
    const response = await client.get("/api/user")
    console.log(response)
    return response.data.data
}

export async function addUser(form) {
    const response = await client.post("/form",form)
    return response.data.data
}

export async function editUser(user) {
    const response = await client.put(`/${user.id}`,user)
    return response.data.data
}

export async function getUser(id) {
    const response = await client.get(`/${id}`,id)
    return response.data.data
}