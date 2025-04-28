import axios from 'axios';
import {
    UserFilterParams
} from '@/modules/constants/types/userList.types';

const baseUrl = process.env.NEXT_PUBLIC_API_USER

async function GetUser(params: UserFilterParams) {
    let endpoint = `${baseUrl}/users`
    const { limit, skip, ...rest } = params
    
    const isParamsEmpty = Object.values(rest).every(x => x === '' || x === null);
    if (!isParamsEmpty) {
        if (params['username']) {
            endpoint += `/search?q=${params['username']}`
        } else if (params['phone']) {
            endpoint += `/filter?key=phone&value=${params['phone']}`
        } else if (params['department']) {
            endpoint += `/filter?key=company.department&value=${params['department']}`
        } else if (params['role']) {
            endpoint += `/filter?key=role&value=${params['role']}`
        }
        endpoint += `&limit=${limit}&skip=${skip}`
    } else {
        endpoint += `?limit=${limit}&skip=${skip}`
    }

    const response = await axios.get(endpoint)
    return response
}

async function GetUserById(id: number) {    
    const response = await axios.get(`${baseUrl}/users/${id}`)
    return response.data
}

async function CreateUser(data: any) {    
    const response = await axios({
        method: 'POST',
        url: `${baseUrl}/users/add`,
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify(data)
    })
    return response
}

async function UpdateUser(id: number, data: any) {    
    const response = await axios({
        method: 'PUT',
        url: `${baseUrl}/users/${id}`,
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify(data)
    })
    return response
}

async function DeleteUser(id: number) {    
    const response = await axios.delete(`${baseUrl}/users/${id}`)
    return response
}

const MainService = {
    GetUser,
    GetUserById,
    CreateUser,
    UpdateUser,
    DeleteUser,
}

export default MainService;