const axios = require('axios');

const axiosInstance = axios.create({
    headers: {
        "Access-Control-Allow-Origin": "*"
    }
});

const getUsers = async () => {
    /*try {
        const resp = await axiosInstance.get('https://randomuser.me/api/?results=30&?nat=mx/');
        return (resp);
    } catch (err) {
        console.error("Error trying get user list", err);
    } */
    const resp = await axiosInstance.get('https://randomuser.me/api/?results=30&?nat=mx/');
    return (resp);
};

export default getUsers;