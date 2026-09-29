import MovieCard from "../components/Moviecard"
import { useState } from "react"
import "../css/Home.css"
function Home(){
    const [searchQuery,setSearchQuery] = useState("")
    const movies = [
        {id: 1, title: "Rajan Film", release: "2020"},
        {id: 2, title: "Anuj Film", release: "2021"},
        {id: 3, title: "Sharthak Film", release: "2022"}
    ]
    const handleSearch  = (e) => {
        e.preventDefault()
        alert(searchQuery)
    }
    return(
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input onChange={(e)=>{setSearchQuery(e.target.value)}} value={searchQuery} type="text" placeholder="Search for movies..." className="search-input" />
                <button type="submit" className="search-button">Search</button>
            </form>
            <div className="movies-grid">
                {movies.map((movie)=>
                    movie.title.toLowerCase().startsWith(searchQuery) && <MovieCard movie={movie} key={movie.id}/>)}
            </div>
        </div>
    )
}
export default Home