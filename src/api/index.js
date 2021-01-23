import Axios from 'axios';

const baseUrl = 'http://localhost:8000/api';
let result, error;

const api = (name) => {
    let link = 'invalid';
    switch(name) {
        case 'login': link = `${baseUrl}/auth/login`; break;
        case 'register': link = `${baseUrl}/auth/register`; break;
        case 'verify': link = `${baseUrl}/auth/verify`; break;
        case 'users': link = `${baseUrl}/user/list`; break;
        case 'specialists': link = `${baseUrl}/specialist/list`; break;
        default: link = `${baseUrl}/${name}`; break;
    }

    return link;
}

export const responseError = (err) => {
    let response = err.response.data;
    let message = response?.message ? response.message : err.message;
    return {
        message: message,
        response: response
    };
}

export const responseSuccess = (response) => {
    return response.data;
}

export const apiResponse = (response, check='status') => {
    if(check === 'status') {

        return response?.data?.status === true;

    } else if(check === 'message') {
        let isError = response?.response;
        if(isError) {
            return response.response?.data?.message ? response.response.data.message : response.message;
        } else {
            return response.data.message;
        }
    } else if (check === 'data') {
        return response?.data?.data;
    } else {
    }
}

export const getMessage = (response) => {
    let isError = response?.response;
    if(isError) {
        return response.response?.data?.message ? response.response.data.message : response.message;
    } else {
        return response.data.message;
    }
}


// START: API SPESIALIS
export const get_specialist = async (filters) => {
    await Axios.post(api(`specialist/list`), filters)
    .then(response => {
        if(!response.data?.status) {
            result = null;
            error = getMessage(response);
        } else {
            result = response.data;
            error = null;
        }
    })
    .catch(err => {
        result = null;
        error = getMessage(response);
    });

    return [result, error];
}

export const create_specialist = async (fields) => {
    await Axios.post( api(`specialist/create`), fields )
    .then(response => {
        if(!response.data?.status) {
            result = null;
            error = getMessage(response);
        } else {
            result = response.data;
            error = null;
        }
    })
    .catch(response => {
        result = null;
        error = getMessage(response);
    });

    return [result, error];
}

export const update_specialist = async (id, fields) => {
    await Axios.put( api(`specialist/update/${id}`), fields )
    .then(response => {
        if(!response.data?.status) {
            result = null;
            error = getMessage(response);
        } else {
            result = response.data;
            error = null;
        }
    })
    .catch(response => {
        result = null;
        error = getMessage(response);
    });

    return [result, error];
}

export const delete_specialist = async (id) => {
    await Axios.delete( api(`specialist/delete/${id}`) )
    .then(response => {
        if(!response.data?.status) {
            result = null;
            error = getMessage(response);
        } else {
            result = response.data;
            error = null;
        }
    })
    .catch(response => {
        result = null;
        error = getMessage(response);
    });

    return [result, error];
}
// END: API SPESIALIS

// START: API DEPARTEMENT
export const get_departement = async (filters) => {
    await Axios.post(api(`departement/list`), filters)
    .then(response => {
        if(!response.data?.status) {
            result = null;
            error = getMessage(response);
        } else {
            result = response.data;
            error = null;
        }
    })
    .catch(err => {
        result = null;
        error = getMessage(response);
    });

    return [result, error];
}

export const create_departement = async (fields) => {
    await Axios.post( api(`departement/create`), fields )
    .then(response => {
        if(!response.data?.status) {
            result = null;
            error = getMessage(response);
        } else {
            result = response.data;
            error = null;
        }
    })
    .catch(response => {
        result = null;
        error = getMessage(response);
    });

    return [result, error];
}

export const update_departement = async (id, fields) => {
    await Axios.put( api(`departement/update/${id}`), fields )
    .then(response => {
        if(!response.data?.status) {
            result = null;
            error = getMessage(response);
        } else {
            result = response.data;
            error = null;
        }
    })
    .catch(response => {
        result = null;
        error = getMessage(response);
    });

    return [result, error];
}

export const delete_departement = async (id) => {
    await Axios.delete( api(`departement/delete/${id}`) )
    .then(response => {
        if(!response.data?.status) {
            result = null;
            error = getMessage(response);
        } else {
            result = response.data;
            error = null;
        }
    })
    .catch(response => {
        result = null;
        error = getMessage(response);
    });

    return [result, error];
}
// END: API DEPARTEMENT

export default api;