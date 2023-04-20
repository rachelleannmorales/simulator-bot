import axios from 'axios';

const host = 'https://c1e0-91-73-245-178.ngrok-free.app';
export const getLocations = async (search: string) => {
  return await axios.get(`${host}/api/v1/address/search?query=${search}`)
    .then((data) => {
      return data.data;
    });
}

export const getLocationById = async (id: string) => {
  return await axios.get(`${host}/api/v1/address/retrieve?id=${id}`)
    .then((data) => {
      return data.data;
    });
}


export const getTruckIds = async (search: string) => {
  return await axios.get(`${host}/api/v1/trucks`)
    .then((data) => {
     return data.data;
    });
}

export const startSimulator = async (params: any) => {
  return await axios.post(`${host}/api/v1/simulator`, params)
    .then((data) => {
      return data.data;
    });
}

export const stopSimulator = async (id: string) => {
  return await axios.delete(`${host}/api/v1/simulator/${id}`)
    .then((data) => {
      return true;
    });
}

export default { getLocations, getTruckIds, getLocationById, startSimulator, stopSimulator };