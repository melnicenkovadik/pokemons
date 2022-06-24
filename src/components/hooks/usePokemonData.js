import axios from 'axios';
import { useState, useEffect } from 'react';

export function usePokemonData(pokemonUrl) {
    const [pokemonData, setPokemonData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchPokemonData = async () => {
            await axios
                .get(pokemonUrl)
                .then(({ data }) => {
                    setPokemonData(data);
                    setLoading(false);
                })
                .catch(() => {
                    setError(true);
                    setLoading(false);
                });
        };
        fetchPokemonData();
    }, []);

    return {
        pokemonData,
        loading,
        error,
    };
}
