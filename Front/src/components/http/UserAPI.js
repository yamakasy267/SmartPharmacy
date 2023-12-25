import {$authHost, $host} from "./index";
import { jwtDecode } from "jwt-decode";

// export const registration = async (user) => {
//     const {data} = await $host.post('api/registration/', {
//         name: user.name,
//         email: user.email,
//         password: user.password,
//         date_of_birth: user.date_of_birth
//     })
//     // localStorage.setItem('token', data.token)
//     // return jwtDecode(data.token)
// }
//
// export const login = async (user) => {
//     const {data} = await $host.post('api/login/', {
//         email: user.email,
//         password: user.password
//     })
//     // localStorage.setItem('token', data.token)
//     // return jwtDecode(data.token)
// }

// export const check = async () => {
//     const {data} = await $authHost.get('api/user/auth')
//     localStorage.setItem('token', data.token)
//     return jwtDecode(data.token)
// }

export const registration = async (name, email, password, date_of_birth) => {
    const {data} = await $host.post('api/registration/', {name, email, password, date_of_birth})
    // localStorage.setItem('token', data.token)
    // return jwtDecode(data.token)
    console.log(data)
    return data
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/login/', {email, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

