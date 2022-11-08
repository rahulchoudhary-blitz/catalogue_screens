import axios, { AxiosError } from "axios"
import qs from "qs";


export const fetchAddPreferred = ()=>{
  const url ="http://localhost:8080/api/inventory/category-master/all-preferred"
  return axios.get(url)
}

export const fetchPickupAddress =()=>{
  const url = "http://localhost:8080/api/user/sellers/619bb852fe3efc43a1add37d"
  return axios.get(url)
}

export const fectCollectionList =()=>{
  const url = "http://localhost:8080/api/inventory/collection/dashboard?page_no=1&page_size=10&collection_type_not_in=category_filters"
  return axios.get(url)
}

export const fetchCatalogueList =()=>{
  const url = "http://localhost:8080/api/inventory/seller/catalogue?page_no=1&page_size=20"
  return axios.get(url)
}

export const fetchEditCatalogueList =(id)=>{
  const url = `http://localhost:8080/api/inventory/seller/catalogue/${id}`
  return axios.get(url);
}

//search Api
export const fetchSearchApi =(values)=>{
  const url = `http://localhost:8080/api/inventory/seller/catalogue?${qs.stringify(values)}`
  return axios.get(url)
 }

//Bulk Upload api
export const bulkUploadApi = (file)=>{
  const formData = new FormData()
  formData.append("csv", file);
  const url = "http://localhost:8080/api/inventory/seller/catalogue/bulk-upload"
    return axios.put(url, formData)
}