const axios = require('axios');

export let storeUsers;

const axiosInstance = axios.create({
    headers: {
        "Access-Control-Allow-Origin": "*"
    }
});

const getUsers = async () => {
    const resp = await axiosInstance.get('https://randomuser.me/api/?results=30');
    storeUsers = resp.data.results;
    return (resp);
};

export const getStoreUsers = async () => {
    const response = await getUsers();
    if(response){
        return storeUsers;
    } else {
        return false;
    }
}

export default getUsers;
