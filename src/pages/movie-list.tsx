import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import Search from 'antd/es/transfer/search';
import '../styles/movie-list.css';
const MovieList = () => {
    const [movies, setMovies] = useState<any[]>([]);
    const [search, setSearch] = useState(null);
    const [loading, setLoading] = useState(false);
    const [addedMovies, setAddedMovies] = useState<any[]>([]);
    const [animatingMovie, setAnimatingMovie] = useState<number | null>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        search == null && fetchMovies('a');
    }, [search])

    const fetchMovies = async (query: string) => {
        setLoading(true);
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/search/movie?api_key=57430c65451f5f07a9f1e453b4a54a21&query=${query}`
            );
            setMovies(response.data.results);
        } catch (error) {
            console.error('Error fetching movies:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);
        if (value) {
            fetchMovies(value);
        } else {
            setMovies([]);
        }
    };
    const handleAddToCart = (movie: any) => {
        dispatch(addToCart({ id: movie.id, title: movie.title, price: 0, image: movie.poster_path  }));

        // Trigger the animation by setting the state
        setAnimatingMovie(movie.id);

        // Set added movie state after animation
        setAddedMovies((prevState) => [...prevState, movie.id]);

        // Reset the animation state after 1 second (for example)
        setTimeout(() => {
            setAnimatingMovie(null);
        }, 1000);
    };
    return (
        <div>
            <div style={{ marginTop: '1rem' }}>
                <Search
                    placeholder="ค้นหาภาพยนตร์..."
                    onChange={handleSearchChange}
                    value={search}
                />
            </div>

            {loading && <p>กำลังโหลด...</p>}
            <div className="movies-grid">
                {movies.map((movie) => (
                    <div key={movie.id} className="movie-card">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            className="movie-image"
                        />
                        <div className="movie-info">
                            <h3 className="movie-title">{movie.title}</h3>
                            <p className="movie-release-date">{movie.release_date}</p>
                            <p className="movie-overview">{movie.overview}</p>

                            <button
                                className={`add-to-cart-btn ${addedMovies.includes(movie.id) ? 'added' : ''} ${animatingMovie === movie.id ? 'animate' : ''}`}
                                onClick={() => handleAddToCart(movie)}
                            >
                                {addedMovies.includes(movie.id) ? 'เพิ่มแล้ว' : 'เพิ่มลงตะกร้า'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovieList;
