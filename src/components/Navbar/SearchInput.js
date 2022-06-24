import { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function SearchInput() {
    const [search, setSearch] = useState('');
    let history = useHistory();

    const onSubmit = (event) => {
        event.preventDefault();
        if (search) {
            history.push(`/pokemon/${search}`);
            setSearch('');
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <input
                onChange={(e) => setSearch(e.target.value)}
                type="search"
                placeholder="Pikachu"
                autoComplete="off"
                value={search}
            />
            <input type="submit" value="🔎 Search" />
        </form>
    );
}
