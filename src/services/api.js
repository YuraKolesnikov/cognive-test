import axios from 'axios'

const api = axios.create({
	baseURL: '/'
})

api.interceptors.response.use(
	(res) => { return res; },
	(error) => { return error.response; }
)

export { api }