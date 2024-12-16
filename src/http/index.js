import axios from "axios";

export const apiUrl = `${import.meta.env.VITE_DB_LINK}api`

const api = axios.create({
    withCredentials: true,
    baseURL: apiUrl
})

api.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
})

api.interceptors.response.use(config => {
    return config
}, async err => {
    const originalRequest = err.config;
    if (err.response.status == 401 && err.config && !err.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await api.get(`${apiUrl}/refresh`, {withCredentials: true});
            localStorage.setItem('token', response.data.accessToken);
            return api.request(originalRequest);
        } catch(e) {
            console.log('Not Authorized')
        }
    }

    throw err;
})

export const getPostsPage = async (pageParam = 0, sphere, filter, options = {}) => {
    const response = await api.get(`/posts?_page=${pageParam}&_sphere=${sphere}&_filter=${filter}`, options)
    return response.data
}

export const getClipsPage = async (pageParam = 0, sphere = '', filter, options = {}) => {
    const response = await api.get(`/chicClips?_page=${pageParam}${sphere ? `&_sphere=${sphere}` : ''}${filter ? `&_filter=${filter}` : ''}`, options)
    return response.data
}

export default api;