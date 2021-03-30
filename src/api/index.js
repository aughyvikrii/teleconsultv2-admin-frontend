import Axios from 'axios';
import Cookies from 'js-cookie';
import store from '../redux/store';
import { loginModal } from '../redux/authentication/actionCreator';

export const baseUrl = 'http://teleconsultv2.localhost/api';
let res = [];
let result = {
    result: null,
    error: true,
    message: null,
    errors: {},
    forceStop: false
};

Axios.interceptors.request.use(function (config) {
    const token = Cookies.get('token');
    config.headers.Authorization =  'Bearer ' + token;
    return config;
});

Axios.interceptors.response.use(
    response => {
        let status = response.data?.status ? response.data.status : false;
        let message = response.data?.message ? response.data.message : response.message;
        if(!message) message = 'Message Null';
        let errors = [];
        if(response.data?.errors) {
            Object.keys(response.data.errors).map(key => {
                let _data = response.data.errors[key];
                return errors.push({
                    name: key,
                    errors: _data
                })
            })
        }

        if(status === true) {
            result = {
                ...result,
                result: response.data,
                error: false,
                message: message,
                errors: errors,
                forceStop: false,
            };
        } else {
            result = {
                ...result,
                result: response.data,
                error: true,
                message: message,
                errors: errors,
                forceStop: false,
            };
        }

        return result;
},  error => {
        let response = error?.response;
        let message = response?.data?.message ? response.data.message : error?.message;
        let errors = [];
        if(response?.data?.errors) {
            Object.keys(response?.data.errors).map(key => {
                let _data = response.data.errors[key];
                return errors.push({
                    name: key,
                    errors: _data
                })
            })
        }

        if(response?.status === 401) {
            store.dispatch(loginModal(true));
            result = {
                ...result,
                result: response?.data,
                error: true,
                message: message,
                errors: errors,
                forceStop: true,
            };
        } else {
            result = {
                ...result,
                result: response?.data,
                error: true,
                message: message,
                errors: errors,
                forceStop: false,
            };
        }
        return Promise.reject(result);
});

export const api = (endpoint) => {
    return `${baseUrl}/${endpoint}`;
}

export const _get = async (url, data=null) => {
    await Axios.get(url, data)
    .then(response => res = response)
    .catch(error => res = error);
    return res;
}

export const _post = async (url, data) => {
    await Axios.post(url, data)
    .then(response => res = response)
    .catch(error => res = error);
    return res;
}

export const _put = async (url, data) => {
    await Axios.put(url, data)
    .then(response => res = response)
    .catch(error => res = error);
    return res;
}

export const _delete = async (url, data) => {
    await Axios.delete(url, data)
    .then(response => res = response)
    .catch(error => res = error);
    return res;
}

export const _login = async (data) => {
    return await _post( api('auth/login'), data);
}

export const user_info = async () => {
    return await _get( api(`auth/user`) );
}

export const get_doctor = async (filters) => {
    return await _post(api(`doctor/list`), filters);
}

export const create_doctor = async (fields) => {
    return await _post(api(`doctor/create`), fields);
}

export const detail_doctor = async (id) => {
    return await _get(api(`doctor/detail/${id}`));
}

export const get_doctor_appointment = async(id, filters)  => {
    return await _post(api(`doctor/${id}/appointments`), filters);
}

export const get_doctor_schedule = async (id, filters={}) => {
    return await _post( api(`doctor/${id}/schedules`), filters );
}

export const create_doctor_schedule = async (id, fields) => {
    return await _post( api(`doctor/${id}/schedule/add`), fields);
}

export const update_doctor_schedule = async (id, fields) => {
    return await _put( api(`schedule/${id}`), fields);
}

export const get_schedule = async (filters) => {
    return await _post( api(`schedule/list`), filters);
}

export const create_specialist = async (fields) => {
    return await _post( api(`specialist/create`), fields );
}

// START: API SPESIALIS
export const get_specialist = async (filters) => {
    return await _post(api(`specialist/list`), filters);
}


export const update_specialist = async (id, fields) => {
    return await _put( api(`specialist/update/${id}`), fields );
}

export const delete_specialist = async (id) => {
    return await _delete( api(`specialist/delete/${id}`) );
}
// END: API SPESIALIS

// START: API DEPARTMENT
export const get_department = async (filters) => {
    return await _post(api(`department/list`), filters);
}

export const create_department = async (fields) => {
    return await _post( api(`department/create`), fields );
}

export const update_department = async (id, fields) => {
    return await _put( api(`department/update/${id}`), fields );
}

export const delete_department = async (id) => {
    return await _delete( api(`department/delete/${id}`) );
}
// END: API DEPARTMENT

// START: API branch
export const get_branch = async (filters) => {
    return await _post(api(`branch/list`), filters);
}

export const create_branch = async (fields) => {
    return await _post( api(`branch/create`), fields );
}

export const update_branch = async (id, fields) => {
    return await _put( api(`branch/update/${id}`), fields );
}

export const delete_branch = async (id) => {
    return await _delete( api(`branch/delete/${id}`) );
}

export const detail_branch = async (id) => {
    return await _get( api(`branch/detail/${id}`) );
}
// END: API branch

// START: API person
export const get_person = async (filters) => {
    return await _post(api(`person/list`), filters);
}

export const create_person = async (fields) => {
    return await _post( api(`person/create`), fields );
}

export const update_person = async (id, fields) => {
    return await _put( api(`person/update/${id}`), fields );
}

export const delete_person = async (id) => {
    return await _delete( api(`person/delete/${id}`) );
}

export const detail_person = async (id) => {
    return await _get( api(`person/detail/${id}`) );
}
// END: API person

// START: API religion
export const get_religion = async (filters) => {
    return await _post(api(`religion/list`), filters);
}

export const create_religion = async (fields) => {
    return await _post( api(`religion/create`), fields );
}

export const update_religion = async (id, fields) => {
    return await _put( api(`religion/update/${id}`), fields );
}

export const delete_religion = async (id) => {
    return await _delete( api(`religion/delete/${id}`) );
}

export const detail_religion = async (id) => {
    return await _get( api(`religion/detail/${id}`) );
}
// END: API religion

// START: API married_status
export const get_married_status = async (filters) => {
    return await _post(api(`married_status/list`), filters);
}

export const create_married_status = async (fields) => {
    return await _post( api(`married_status/create`), fields );
}

export const update_married_status = async (id, fields) => {
    return await _put( api(`married_status/update/${id}`), fields );
}

export const delete_married_status = async (id) => {
    return await _delete( api(`married_status/delete/${id}`) );
}

export const detail_married_status = async (id) => {
    return await _get( api(`married_status/detail/${id}`) );
}
// END: API married_status

// START: API title
export const get_title = async (filters) => {
    return await _post(api(`title/list`), filters);
}

export const create_title = async (fields) => {
    return await _post( api(`title/create`), fields );
}

export const update_title = async (id, fields) => {
    return await _put( api(`title/update/${id}`), fields );
}

export const delete_title = async (id) => {
    return await _delete( api(`title/delete/${id}`) );
}

export const detail_title = async (id) => {
    return await _get( api(`title/detail/${id}`) );
}
// END: API title

export default api;