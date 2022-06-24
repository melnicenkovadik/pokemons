import styles from '../../styles/App.module.scss';
import PokemonCard from './PokemonCard';

export default function PokemonsList({ pokemonList, totalPokemons }) {
    return (
        <>
            <div className={styles.results}>
                <span>{totalPokemons} pokemons</span>
            </div>
            {pokemonList.map(({ results }, index) => (
                <div className={styles.pokemonList} key={index}>
                    {results.map((pokemon, index) => (
                        <PokemonCard key={index} pokemon={pokemon} />
                    ))}
                </div>
            ))}
        </>
    );
}
