import styles from '../../styles/Navbar.module.scss';
import { Link } from 'react-router-dom';
import { CgPokemon } from 'react-icons/cg';
import SearchInput from './SearchInput';

export default function Navbar() {
    return (
        <div className={styles.nav}>
            <div className={styles.navWrapper}>
                <Link to="/">
                    <h1>
                        <CgPokemon />
                        PokeSearcher
                    </h1>
                </Link>
                <SearchInput />
            </div>
        </div>
    );
}
