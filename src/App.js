import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar/Navbar';
import styles from './styles/App.module.scss';
import LoadingError from './components/LoadingError';
import PokemonsList from './components/HomePage/PokemonsList';
import PokemonDisplay from './components/PokemonPage/PokemonDisplay';

export default function App() {
    const [pokemonList, setPokemonList] = useState([]);
    const [nextPage, setNextPage] = useState('');
    const [totalPokemons, setTotalPokemons] = useState(0);
    const [loading, setLoading] = useState(true);
    const [fetchingNewPokemons, setFetchingNewPokemons] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchInitalPokemons = async () => {
            await axios
                .get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=40')
                .then(({ data }) => {
                    setPokemonList([data]);
                    setTotalPokemons(data.count);
                    setNextPage(data.next);
                    setTimeout(() => {
                        setLoading(false);
                    }, 1000);
                })
                .catch(() => {
                    setError(true);
                    setLoading(false);
                });
        };
        fetchInitalPokemons();
    }, []);

    const fetchMorePokemons = async () => {
        setFetchingNewPokemons(true);
        await axios
            .get(nextPage)
            .then(({ data }) => {
                setNextPage(data.next);
                setPokemonList((prevList) => [...prevList, data]);
                setFetchingNewPokemons(false);
            })
            .catch(() => setError(true));
    };

    if (loading) return <LoadingError type="loading" />;

    if (error) return <LoadingError type="error" />;

    return (
        <Router>
            <Navbar />
            <div className={styles.app}>
                <div className={styles.appContainer}>
                    <Switch>
                        <Route exact path="/">
                            <PokemonsList
                                pokemonList={pokemonList}
                                totalPokemons={totalPokemons}
                            />
                            {nextPage ? (
                                <button
                                    className={styles.loadMoreBtn}
                                    onClick={fetchMorePokemons}
                                    disabled={fetchingNewPokemons}
                                >
                                    {fetchingNewPokemons
                                        ? 'Loading... '
                                        : 'Load More'}
                                </button>
                            ) : (
                                <></>
                            )}
                        </Route>
                        <Route path="/pokemon/:id">
                            <PokemonDisplay />
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    );
}
