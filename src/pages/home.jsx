import MovieCard from "../components/Moviecard"
import { useState, useEffect } from "react"
import { searchMovies } from "../services/api"
import { getPopularMovies } from "../services/api"
import "../css/Home.css"

function Home() {
    const [searchQuery, setSearchQuery] = useState("")
    const [movies, setMovies] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadPopularMovies() {
            try {
                const popularMovies = await getPopularMovies()
                setMovies(popularMovies)
            } catch (err) {
                console.log(err)
                setError("Failed to load movies...")
            } finally {
                setLoading(false)
            }
        }
        loadPopularMovies()
    }, [])

    const handleSearch = async (e) => {
        e.preventDefault()
        if (!searchQuery.trim()) return
        if (loading) return
        setLoading(true)
        try {
            const searchResults = await searchMovies(searchQuery)
            setMovies(searchResults)
            setError(null)
        } catch (err) {
            setError("Failed to search movies")
            console.log(err)
        } finally {
            setLoading(false)
        }
        // Optional: If you want to fetch search results from your API instead of filtering locally:
        // alert(searchQuery)
    }

    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input 
                    onChange={(e) => setSearchQuery(e.target.value)} 
                    value={searchQuery} 
                    type="text" 
                    placeholder="Search for movies..." 
                    className="search-input" 
                />
                <button type="submit" className="search-button">Search</button>
            </form>

            {error && <div className="error-message">{error}</div>}

            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <div className="movies-grid">
                    {movies.map((movie) =>
                        movie.title.toLowerCase().startsWith(searchQuery.toLowerCase()) && (
                            <MovieCard movie={movie} key={movie.id} />
                        )
                    )}
                </div>
            )} 
        </div>
    )
}

export default Home
