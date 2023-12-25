import  {$authHost, $host} from "./Index";


export const getCategory = async (type) => {
    const {data} = await $host.get('api/get_category/')
    return data
}

export const getMedicine = async (id) => {
    const {data} = await $host.get('api/get_medicine/?medicine_id=' + id)
    console.log(data)
    return data
}
export const getMedicineByName = async (searchQuery) => {
    const {data} = await $host.get('api/get_medicine_for_name/?medicine_name=' + searchQuery)
    return data
}

export const getActiveIngredients = async () => {
    const {data} = await $host.get('api/get_active_element/')
    return data
}

export const getCategories = async () => {
    const {data} = await $host.get('api/get_category/')
    return data
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
//     const {data} = await $host.get('api/brand', )
//     return data
// }
//
// export const createDevice = async (device) => {
//     const {data} = await $authHost.post('api/device', device)
//     return data
// }
//
// export const fetchDevices = async (typeId, brandId, page, limit= 5) => {
//     const {data} = await $host.get('api/device', {params: {
//             typeId, brandId, page, limit
//         }})
//     return data
// }
//
// export const fetchOneDevice = async (id) => {
//     const {data} = await $host.get('api/device/' + id)
//     return data
// }
