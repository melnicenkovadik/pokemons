import { Link } from 'react-router-dom';
import styles from '../../styles/App.module.scss';
import spinner from '../assets/spinner-light.gif';
import { usePokemonData } from '../hooks/usePokemonData';

export default function PokemonCard({ pokemon }) {
    const { pokemonData, loading } = usePokemonData(pokemon.url);

    if (loading)
        return (
            <div className={styles.pokemonCard}>
                <img src={spinner} alt="loading..." />
            </div>
        );

    return (
        <Link to={`/pokemon/${pokemonData.id}`}>
            <div className={styles.pokemonCard}>
                <h1>{pokemonData.name}</h1>
                <img
                    src={pokemonData.sprites.front_default}
                    alt={pokemonData.name}
                />
            </div>
        </Link>
    );
}
