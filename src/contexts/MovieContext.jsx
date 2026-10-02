import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext();

export function useMovieContext() {
    return useContext(MovieContext);
}

export function MovieProvider({ children }) {

    const [favorites, setFavorites] = useState(() => {
        const storedFavs = localStorage.getItem("favorites");
        return storedFavs ? JSON.parse(storedFavs) : [];
    });

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const addToFavorites = (movie) => {
        setFavorites(prev =>
            prev.some(fav => fav.id === movie.id)
                ? prev
                : [...prev, movie]
        );
    };

    const removeFromFavorites = (movieID) => {
        setFavorites(prev =>
            prev.filter(movie => movie.id !== movieID)
        );
    };

    const isFavorite = (movieID) => {
        return favorites.some(movie => movie.id === movieID);
    };

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    };

    return (
        <MovieContext.Provider value={value}>
            {children}
        </MovieContext.Provider>
    );
}