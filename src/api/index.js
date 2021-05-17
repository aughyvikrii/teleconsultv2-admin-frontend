import Axios from 'axios';
import Cookies from 'js-cookie';
import store from '../redux/store';
import { loginModal } from '../redux/authentication/actionCreator';

const rootUrl = 'http://teleconsultv2.localhost';
const baseUrl = rootUrl + '/api';
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

const createParams = (params) => {
    const qs = Object.keys(params)
    .map(key => `${key}=` + (!params[key] ? '' : params[key]))
    .join('&');
    return qs;
}

const api = (endpoint) => {
    return `${baseUrl}/${endpoint}`;
}

const _get = async (url, data=null) => {
    await Axios.get(url, data)
    .then(response => res = response)
    .catch(error => res = error);
    return res;
}

const _post = async (url, data) => {
    await Axios.post(url, data)
    .then(response => res = response)
    .catch(error => res = error);
    return res;
}

const _put = async (url, data) => {
    await Axios.put(url, data)
    .then(response => res = response)
    .catch(error => res = error);
    return res;
}

const _delete = async (url, data) => {
    await Axios.delete(url, data)
    .then(response => res = response)
    .catch(error => res = error);
    return res;
}

const _login = async (data) => {
    return await _post( api('auth/login'), data);
}

const user_info = async () => {
    return await _get( api(`auth/user`) );
}

const get_doctor = async (filters) => {
    const params = createParams(filters);
    return await _get(api(`doctor/list?` + params));
}

const create_doctor = async (fields) => {
    return await _post(api(`doctor/create`), fields);
}

const update_doctor = async(id, fields) => {
    return await _post(api(`doctor/update/${id}`), fields);
}

const detail_doctor = async (id) => {
    return await _get(api(`doctor/detail/${id}`));
}

const get_doctor_appointment = async(id, filters)  => {
    return await _post(api(`doctor/${id}/appointments`), filters);
}

const get_doctor_schedule = async (id, filters={}) => {
    return await _post( api(`doctor/${id}/schedules`), filters );
}

const create_doctor_schedule = async (id, fields) => {
    return await _post( api(`doctor/${id}/schedule/add`), fields);
}

const update_doctor_schedule = async (id, fields) => {
    return await _put( api(`schedule/${id}`), fields);
}

const get_schedule = async (filters) => {
    const params = await createParams(filters);
    return await _get( api(`schedule/list?` + params));
}

const create_specialist = async (fields) => {
    return await _post( api(`specialist/create`), fields );
}

// START: API SPESIALIS
const get_specialist = async (filters) => {
    return await _post(api(`specialist/list`), filters);
}


const update_specialist = async (id, fields) => {
    return await _put( api(`specialist/update/${id}`), fields );
}

const delete_specialist = async (id) => {
    return await _delete( api(`specialist/delete/${id}`) );
}
// END: API SPESIALIS

// START: API DEPARTMENT
const get_department = async (filters) => {
    return await _post(api(`department/list`), filters);
}

const create_department = async (fields) => {
    return await _post( api(`department/create`), fields );
}

const update_department = async (id, fields) => {
    return await _put( api(`department/update/${id}`), fields );
}

const delete_department = async (id) => {
    return await _delete( api(`department/delete/${id}`) );
}
// END: API DEPARTMENT

// START: API branch
const get_branch = async (filters) => {
    return await _post(api(`branch/list`), filters);
}

const create_branch = async (fields) => {
    return await _post( api(`branch/create`), fields );
}

const update_branch = async (id, fields) => {
    return await _put( api(`branch/update/${id}`), fields );
}

const delete_branch = async (id) => {
    return await _delete( api(`branch/delete/${id}`) );
}

const detail_branch = async (id) => {
    return await _get( api(`branch/detail/${id}`) );
}
// END: API branch

// START: API person
const get_person = async (filters) => {
    return await _post(api(`person/list`), filters);
}

const create_person = async (fields) => {
    return await _post( api(`person/create`), fields );
}

const update_person = async (id, fields) => {
    return await _put( api(`person/update/${id}`), fields );
}

const delete_person = async (id) => {
    return await _delete( api(`person/delete/${id}`) );
}

const detail_person = async (id) => {
    return await _get( api(`person/detail/${id}`) );
}
// END: API person

// START: API religion
const get_religion = async (filters) => {
    return await _post(api(`religion/list`), filters);
}

const create_religion = async (fields) => {
    return await _post( api(`religion/create`), fields );
}

const update_religion = async (id, fields) => {
    return await _put( api(`religion/update/${id}`), fields );
}

const delete_religion = async (id) => {
    return await _delete( api(`religion/delete/${id}`) );
}

const detail_religion = async (id) => {
    return await _get( api(`religion/detail/${id}`) );
}
// END: API religion

// START: API married_status
const get_married_status = async (filters) => {
    return await _post(api(`married_status/list`), filters);
}

const create_married_status = async (fields) => {
    return await _post( api(`married_status/create`), fields );
}

const update_married_status = async (id, fields) => {
    return await _put( api(`married_status/update/${id}`), fields );
}

const delete_married_status = async (id) => {
    return await _delete( api(`married_status/delete/${id}`) );
}

const detail_married_status = async (id) => {
    return await _get( api(`married_status/detail/${id}`) );
}
// END: API married_status

// START: API title
const get_title = async (filters) => {
    return await _post(api(`title/list`), filters);
}

const create_title = async (fields) => {
    return await _post( api(`title/create`), fields );
}

const update_title = async (id, fields) => {
    return await _put( api(`title/update/${id}`), fields );
}

const delete_title = async (id) => {
    return await _delete( api(`title/delete/${id}`) );
}

const detail_title = async (id) => {
    return await _get( api(`title/detail/${id}`) );
}
// END: API title

const get_list_appointment = async(filters) => {
    const params = await createParams(filters);
    return await _get(api(`appointment/list?`+ params ));
} 

const get_detail_appointment = async(id) => {
    return await _get(api(`appointment/detail/${id}`));
}

const get_patient = async(filter) => {
    const params = await createParams(filter);
    return await _get(api(`patient/list?` + params ));
}

const get_report_finance = async(filter) => {
    const params = await createParams(filter);
    return await _get(api(`report/finance?` + params ));
}

const get_report_appointment = async(filter) => {
    const params = await createParams(filter);
    return await _get(api(`report/appointment?` + params ));
}

const get_dashboard = async(filter) => {
    const params = await createParams(filter);
    return await _get(api(`dashboard?` + params));
}

const get_invoice_detail = async(invoice_id) => {
    return await _get(api(`bill/${invoice_id}/detail`));
}

const zoom_verification = async(fields) => {
    return await _post(api(`zoom_verification`), fields);
}

const get_news = async(filters) => {
    const params = createParams(filters);
    return await _get(api(`news/list?${params}`));
}

const get_news_detail = async(id) => {
    return await _get(api(`news/${id}`));
}

const create_file = async(params) => {
    return await _post(api(`file/create`), params)
}

const slice_upload = async(params) => {
    return await _post(api(`file/slice_upload`), params);
}

const create_news = async(fields) => {
    return await _post(api(`news/create`), fields);
}

const update_news = async(id, fields) => {
    return await _put(api(`news/update/${id}`), fields);
}

const delete_news = async(id) => {
    return await _delete(api(`news/delete/${id}`));
}

export {
    create_file,
    slice_upload,
    get_news_detail,
    get_news,
    rootUrl,
    baseUrl,
    createParams,
    get_invoice_detail,
    zoom_verification,
    update_news,
    delete_news,
    api,
    _get,
    _post,
    _put,
    _delete,
    _login,
    get_dashboard,
    user_info,
    get_doctor,
    create_doctor,
    update_doctor,
    detail_doctor,
    get_doctor_appointment,
    get_doctor_schedule,
    create_doctor_schedule,
    update_doctor_schedule,
    get_schedule,
    create_specialist,
    get_specialist,
    update_specialist,
    delete_specialist,
    get_department,
    create_department,
    update_department,
    delete_department,
    get_branch,
    create_branch,
    update_branch,
    delete_branch,
    detail_branch,
    get_person,
    create_person,
    update_person,
    delete_person,
    detail_person,
    get_religion,
    create_religion,
    update_religion,
    delete_religion,
    detail_religion,
    get_married_status,
    create_married_status,
    update_married_status,
    delete_married_status,
    get_title,
    create_title,
    update_title,
    delete_title,
    detail_title,
    get_list_appointment,
    get_detail_appointment,
    get_patient,
    get_report_finance,
    get_report_appointment,
    create_news
}

export default api;