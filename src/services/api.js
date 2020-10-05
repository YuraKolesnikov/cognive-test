import axios from 'axios'

const api = axios.create({
	baseURL: 'https://swapi.dev/api/vehicles/'
})

export { api }