import { CgPokemon } from 'react-icons/cg';
import spinner from './assets/spinner.gif';

export default function Loading({ type }) {
    return (
        <div
            style={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
            }}
        >
            <h1 style={{ display: 'flex', alignItems: 'center' }}>
                <CgPokemon />
                PokeSearcher
            </h1>
            {type === 'loading' ? (
                <img src={spinner} alt="loading" style={{ height: '150px' }} />
            ) : (
                <h3 style={{ marginTop: '30px', fontWeight: '300' }}>
                    Something went wrong, try again later!
                </h3>
            )}
        </div>
    );
}
