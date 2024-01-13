import {$adminHost, $guestHost, $userHost} from "./index";

export const scrap = async () => {
  return await $guestHost.get('api/scrap/');
}

export const fetchMedicine = async (id) => {
  const {data} = await $guestHost.get('api/get_medicine/?medicine_id=' + id);
  return data;
}

export const fetchMedicineBySymptom = async (searchQuery, start, count) => {
  const {data} = await $guestHost.get('api/get_medicine_by_symptoms/?symptoms_name=' + searchQuery + '&start=' + start + '&count=' + count);
  return data;
}

export const fetchMedicineByActiveElement = async (searchQuery, start, count) => {
  const {data} = await $guestHost.get('api/get_medicine_by_element/?element=' + searchQuery + '&start=' + start + '&count=' + count);
  return data;
}

export const fetchMedicineByName = async (searchQuery, start, count) => {
  const {data} = await $guestHost.get('api/get_medicine_by_name/?medicine_name=' + searchQuery + '&start=' + start + '&count=' + count);
  return data;
}

export const fetchActiveElements = async () => {
  const {data} = await $guestHost.get('api/get_active_element/');
  return data;
}

export const fetchCategories = async () => {
  const {data} = await $guestHost.get('api/get_category/');
  return data;
}

export const fetchFavorites = async () => {
  const {data} = await $userHost.get('api/get_favorites/');
  return data;
}

export const createFavorite = async (id) => {
  const {data} = await $userHost.post('api/create_favorite/', {medicine_id: id});
  return data;
}

export const deleteFavorite = async (id) => {
  const {data} = await $userHost.delete('api/delete_favorite/', {data: {medicine_id: id}});
  return data;
}

export const createComment = async (medicine_id, comment) => {
  const {data} = await $userHost.post('api/create_comment/', {medicine_id: medicine_id, comment: comment});
  return data;
}

export const deleteComment = async (id) => {
  const {data} = await $userHost.delete('api/delete_comment/', {data: {comment_id: id}});
  return data;
}

export const fetchChains = async () => {
  const {data} = await $adminHost.get('api/get_chain/');
  return data;
}

export const createChain = async (chain) => {
  console.log(chain)
  const {data} = await $adminHost.post('api/set_chain/', {chain: chain});
  return data;
}