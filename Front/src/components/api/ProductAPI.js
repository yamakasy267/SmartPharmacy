import {$userHost, $guestHost} from "./index";

export const scrap = async () => {
  const {data} = await $guestHost.get('api/scrap/');
  console.log(data);
}

export const fetchCategory = async (type) => {
  const {data} = await $guestHost.get('api/get_category/');
  console.log(data);
  return data;
}

export const fetchMedicine = async (id) => {
  const {data} = await $guestHost.get('api/get_medicine/?medicine_id=' + id);
  return data;
}

export const fetchMedicineByName = async (searchQuery) => {
  const {data} = await $guestHost.get('api/get_medicine_by_name/?medicine_name=' + searchQuery);
  return data;
}

export const fetchMedicineByActiveElement = async (searchQuery) => {
  const {data} = await $guestHost.get('api/get_medicine_by_element/?element=' + searchQuery);
  return data;
}

export const fetchActiveElements = async () => {
  const {data} = await $guestHost.get('api/get_active_element/');
  console.log(data);
  return data;
}

export const fetchCategories = async () => {
  const {data} = await $guestHost.get('api/get_category/');
  console.log(data);
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

export const createComment = async (medicine_id, comment) => {
  const {data} = await $userHost.post('api/create_comment/', {medicine_id: medicine_id, comment: comment});
  return data;
}


// export const createCategory = async (type) => {
//     const {data} = await $authHost.post('api/type', type)
//     return data
// }
//
//
// export const createBrand = async (brand) => {
//     const {data} = await $authHost.post('api/brand', brand)
//     return data
// }
//
// export const fetchBrands = async () => {
//     const {data} = await $guestHost.get('api/brand', )
//     return data
// }
//
// export const createDevice = async (device) => {
//     const {data} = await $authHost.post('api/device', device)
//     return data
// }
//
// export const fetchDevices = async (typeId, brandId, page, limit= 5) => {
//     const {data} = await $guestHost.get('api/device', {params: {
//             typeId, brandId, page, limit
//         }})
//     return data
// }
//
// export const fetchOneDevice = async (id) => {
//     const {data} = await $guestHost.get('api/device/' + id)
//     return data
// }
