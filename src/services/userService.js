const axios = require('axios');

const getUsers = async () => {
    try {
        const resp = await axios.get('https://randomuser.me/api/?results=30&?nat=mx');
        console.log(resp.data.results);
        return (resp);
    } catch (err) {
        console.error("Error trying get user list",err);
    }
};

export default getUsers;