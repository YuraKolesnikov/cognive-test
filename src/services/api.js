import axios from 'axios'

const api = axios.create({
	baseURL: 'https://swapi.dev/api/vehicles/'
})

api.interceptors.response.use(
	(res) => { return res; },
	(error) => { return error.response; }
)

export { api }