const API_KEY = "751702592fe8f4bba92d040ed26776e8"
const BASE_URL = "https://api.themoviedb.org/3"
export async function Hello () {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`)
}