import Axios from 'axios';
import Cookies from 'js-cookie';
import store from '../redux/store';
import { loginModal } from '../redux/authentication/actionCreator';

const baseUrl = 'http://localhost:8000/api';
let result, error;

Axios.interceptors.request.use(function (config) {
    const token = Cookies.get('token');
    config.headers.Authorization =  'Bearer ' + token;
    return config;
});

Axios.interceptors.response.use( (response) => {
    return response;
},(error) => {
    if(error.response.status === 401) {
        store.dispatch(loginModal(true));
    }
    return Promise.reject(error);
});

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
        return response?.data?.message ? response.data.message : response?.message ? response.message : 'no message' ;
    }
}

export const createFormError = (errors) => {
    let result = [];
    
    if(errors) {
        Object.keys(errors).forEach(key => {
            return result.push({
                name: key,
                errors: errors[key]
            })
        })
    }

    return result;
}

export const _get = async (url, data) => {
    await Axios.get(  url, data)
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

export const _post = async (url, data) => {
    await Axios.post(url, data)
    .then(response => {
        if(!response.data?.status) {
            result = response?.data;
            error = getMessage(response);
        } else {
            result = response.data;
            error = null;
        }
    })
    .catch(response => {
        result = response?.response?.data;
        error = getMessage(response);
    });

    return [result, error];
}

export const _put = async (url, data) => {
    await Axios.put(url, data)
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

export const _delete = async (url, data) => {
    await Axios.delete(url, data)
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

export const _login = async (data) => {
    return await _post(api('login'), data);
}

/**
 * Dokter API
 */

 export const get_doctor = async (filters) => {
     return await _post(api(`doctor/list`), filters);
 }

 export const create_doctor = async (fields) => {
     return await _post(api(`doctor/create`), fields);
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
    .catch(response => {
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

// START: API DEPARTMENT
export const get_department = async (filters) => {
    await Axios.post(api(`department/list`), filters)
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

export const create_department = async (fields) => {
    await Axios.post( api(`department/create`), fields )
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

export const update_department = async (id, fields) => {
    await Axios.put( api(`department/update/${id}`), fields )
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

export const delete_department = async (id) => {
    await Axios.delete( api(`department/delete/${id}`) )
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
// END: API DEPARTMENT

// START: API branch
export const get_branch = async (filters) => {
    await Axios.post(api(`branch/list`), filters)
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

export const create_branch = async (fields) => {
    await Axios.post( api(`branch/create`), fields )
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

export const update_branch = async (id, fields) => {
    await Axios.put( api(`branch/update/${id}`), fields )
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

export const delete_branch = async (id) => {
    await Axios.delete( api(`branch/delete/${id}`) )
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

export const detail_branch = async (id) => {
    await Axios.get( api(`branch/detail/${id}`) )
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
// END: API branch

// START: API person
export const get_person = async (filters) => {
    await Axios.post(api(`person/list`), filters)
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

export const create_person = async (fields) => {
    await Axios.post( api(`person/create`), fields )
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

export const update_person = async (id, fields) => {
    await Axios.put( api(`person/update/${id}`), fields )
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

export const delete_person = async (id) => {
    await Axios.delete( api(`person/delete/${id}`) )
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

export const detail_person = async (id) => {
    await Axios.get( api(`person/detail/${id}`) )
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
// END: API person

// START: API religion
export const get_religion = async (filters) => {
    await Axios.post(api(`religion/list`), filters)
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

export const create_religion = async (fields) => {
    await Axios.post( api(`religion/create`), fields )
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

export const update_religion = async (id, fields) => {
    await Axios.put( api(`religion/update/${id}`), fields )
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

export const delete_religion = async (id) => {
    await Axios.delete( api(`religion/delete/${id}`) )
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

export const detail_religion = async (id) => {
    await Axios.get( api(`religion/detail/${id}`) )
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
// END: API religion

// START: API married_status
export const get_married_status = async (filters) => {
    await Axios.post(api(`married_status/list`), filters)
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

export const create_married_status = async (fields) => {
    await Axios.post( api(`married_status/create`), fields )
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

export const update_married_status = async (id, fields) => {
    await Axios.put( api(`married_status/update/${id}`), fields )
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

export const delete_married_status = async (id) => {
    await Axios.delete( api(`married_status/delete/${id}`) )
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

export const detail_married_status = async (id) => {
    await Axios.get( api(`married_status/detail/${id}`) )
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
// END: API married_status

// START: API title
export const get_title = async (filters) => {
    await Axios.post(api(`title/list`), filters)
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

export const create_title = async (fields) => {
    await Axios.post( api(`title/create`), fields )
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

export const update_title = async (id, fields) => {
    await Axios.put( api(`title/update/${id}`), fields )
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

export const delete_title = async (id) => {
    await Axios.delete( api(`title/delete/${id}`) )
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

export const detail_title = async (id) => {
    await Axios.get( api(`title/detail/${id}`) )
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
// END: API title

export default api;