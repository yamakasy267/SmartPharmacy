import {$userHost, $guestHost, $adminHost} from "./index";
import {jwtDecode} from "jwt-decode";

export const check = async () => {
  const {data} = await $userHost.get('api/get_user_info/');
  return data;
}

export const registration = async (name, email, password, date_of_birth) => {
  const {data} = await $guestHost.post('api/registration/', {name, email, password, date_of_birth});
  return data;
}

export const login = async (email, password) => {
  const {data} = await $guestHost.post('api/login/', {email, password});
  localStorage.setItem('token', data.token);
  return jwtDecode(data.token);
}

export const fetchUserInfo = async () => {
  const {data} = await $userHost.get('api/get_user_info/');
  return data;
}

export const updateUserInfo = async (name, password, birthdate) => {
  const {data} = await $userHost.put('api/update_user_info/', {name: name, password: password, date_of_birth: birthdate});
  console.log(data);
  return data;
}

export const deleteUser = async (id) => {
  const {data} = await $adminHost.get('api/delete_user/?user_id=' + id);
  console.log(data);
  return data;
}