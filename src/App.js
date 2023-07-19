import { useEffect, useState } from "react";

import MovieCard from "./MovieCard";

import './light.css'
import './App.css';
import SearchIcon from './search.svg';

//IMDb APIkey fc270fca

const API_URL = 'http://www.omdbapi.com?apikey=b6003d8a';


const App = () => {

    /*
    const [theme, setTheme] = useState('App'); // Maintain the current theme state

    const changeTheme = () => {
        // Determine the next theme based on the current theme
        const nextTheme = theme === 'App' ? 'light' : 'App';


        
        // Remove the previous theme CSS from the DOM
        const prevThemeLink = document.getElementById('theme');
        if (prevThemeLink) {
            prevThemeLink.remove();
        }

        // Create a new link element for the selected theme CSS
        const newThemeLink = document.createElement('link');
        newThemeLink.rel = 'stylesheet';
        newThemeLink.href = `${nextTheme}.css`;
        newThemeLink.id = 'theme';

        // Append the new theme CSS to the document head
        document.head.appendChild(newThemeLink);

        setTheme(nextTheme); // Update the current theme state
        alert('clicked');
    };
    */







    const [movies, setMovies] = useState([]);
    const [searchTitle, setSearchTitle] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&S=${title}`);
        const data = await response.json();
        setMovies(data.Search);

    }

    useEffect(() => {
        searchMovies('Superman');
    }, []);

    return (
        <div className="app">
            
            
            {/* <div>
                <button onClick={changeTheme}>Change Theme</button>
            </div> */}

            <h1>MovieProject</h1>

            <div className="search" >
                <input
                    placeholder="Search for Movies"
                    value={searchTitle}
                    onChange={(e) => setSearchTitle(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            searchMovies(searchTitle);
                        }
                    }}
                />
                <img
                    src={SearchIcon}
                    alt="search"
                    onClick={() => searchMovies(searchTitle)}
                />
            </div>

            {movies?.length > 0 ? (
                <div className="container">
                    {movies.map((movie) => (
                        <MovieCard key={movie.imdbID} movie={movie} />
                    ))}
                </div>
            ) : (
                <div className="empty">
                    <h2>No movies found</h2>
                </div>
            )}

        </div>
    );
}

export default App;