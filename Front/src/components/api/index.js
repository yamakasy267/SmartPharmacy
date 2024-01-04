import axios from "axios";

const $guestHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const $userHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const $adminHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const userInterceptor = config => {
    config.headers.authorization = `${localStorage.getItem('token')}`;
    return config
}

$userHost.interceptors.request.use(userInterceptor)

const adminInterceptor = config => {
    config.headers.authorization = `${localStorage.getItem('token')}`;
    return config
}

$adminHost.interceptors.request.use(adminInterceptor);

export {
    $guestHost,
    $userHost,
    $adminHost
}
