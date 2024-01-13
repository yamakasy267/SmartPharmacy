import {$adminHost, $guestHost, $userHost} from "./index";
import {jwtDecode} from "jwt-decode";

export const check = async () => {
  const {data} = await $userHost.get('api/get_user_info/');
  return data;
}

export const registration = (name, email, password, date_of_birth) => {
  return $guestHost.post('api/registration/', {name, email, password, date_of_birth});
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
  return data;
}

export const deleteUser = async (id) => {
  return await $adminHost.delete('api/delete_user/', {data: {user_id: id}});
}

export const fetchAllUsersInfo = async () => {
  const {data} = await $adminHost.get('api/get_all_users_info/');
  return data;
}


