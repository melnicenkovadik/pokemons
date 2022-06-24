import axios from 'axios';
import { useState, useEffect } from 'react';
import spinner from '../assets/spinner-light.gif';
import { useParams, useHistory, Link } from 'react-router-dom';
import styles from '../../styles/PokemonDisplay.module.scss';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

export default function PokemonDisplay() {
    let history = useHistory();
    let { id: params } = useParams();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [pokemonData, setPokemonData] = useState({});

    useEffect(() => {
        const getPokemonData = async () => {
            const lowerCaseParams = params.toLowerCase();
            setLoading(true);
            await axios
                .get(`https://pokeapi.co/api/v2/pokemon/${lowerCaseParams}`)
                .then(({ data }) => {
                    if (isNaN(parseInt(lowerCaseParams))) {
                        history.push(`/pokemon/${data.id}`);
                    } else {
                        setPokemonData(data);
                    }
                })
                .catch(() => {
                    setError(true);
                });
            setTimeout(() => setLoading(false), 500);
        };

        getPokemonData();
    }, [params, history]);

    if (loading)
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: '#dadada',
                    borderRadius: '20px',
                    height: '600px',
                }}
            >
                <img src={spinner} alt="loading" style={{ height: '200px' }} />
            </div>
        );

    if (error)
        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: '#dadada',
                    borderRadius: '20px',
                    height: '600px',
                    textAlign: 'center',
                }}
            >
                <h1 style={{ color: '#EE5252' }}>
                    Couldn't find that pokemon!
                </h1>
                <img
                    src="/pokeball.png"
                    alt="pokeball"
                    style={{ height: '100px', marginTop: '30px' }}
                />
            </div>
        );

    return (
        <div className={styles.pokemonDisplay}>
            <div className={styles.displayContainer}>
                <img
                    src={pokemonData.sprites.front_default}
                    alt={pokemonData.name}
                />
            </div>
            <div className={styles.infoContainer}>
                <div className={styles.nameContainer}>
                    <h1>{pokemonData.name}</h1>
                </div>
                <div className={styles.statDisplay}>
                    <div className={styles.statName}>Height</div>
                    <div className={styles.statInfo}>
                        <span>{pokemonData.height / 10}m</span>
                    </div>
                </div>
                <div className={styles.statDisplay}>
                    <div className={styles.statName}>Weight</div>
                    <div className={styles.statInfo}>
                        <span>{pokemonData.weight / 10}kg</span>
                    </div>
                </div>
                <div className={styles.statDisplay}>
                    <div className={styles.statName}>Type/s</div>
                    <div className={styles.statInfo}>
                        {pokemonData.types.map(({ type }) => (
                            <span>{type.name}</span>
                        ))}
                    </div>
                </div>
                <div className={styles.navigation}>
                    <Link
                        to={
                            pokemonData.id > 1 &&
                            `/pokemon/${pokemonData.id - 1}`
                        }
                    >
                        <AiOutlineArrowLeft style={{ marginRight: '10px' }} />
                        Previous
                    </Link>
                    <Link to={`/pokemon/${pokemonData.id + 1}`}>
                        Next{' '}
                        <AiOutlineArrowRight style={{ marginLeft: '10px' }} />
                    </Link>
                </div>
            </div>
        </div>
    );
}
