import { useState } from "react"

type Props = {
    toggleEdit: () => void
    toggleSearch: (value: boolean) => void
    onSearch: (search: string) => void
}



function Header({ toggleEdit, toggleSearch, onSearch }: Props) {
    const [showInput, setShowInput] = useState(false);
    const [search, setSearch] = useState('');

    function toggleInput(value: boolean) {
        setShowInput(!showInput);
        if (!value) {
            setSearch('');
        }
    }

    return <div className='header-container'>
        {showInput ?
            <div className='search'>
                <label>What is your search?</label>
                <input
                    placeholder="type here" type="text"
                    id="search" name="search"
                    onChange={(event) => {
                        setSearch(event.target.value)
                        onSearch(event.target.value);
                    }}
                    value={search}>
                </input>
            </div>
            : <h1>Welcome!</h1>}
        <div className='button edit-button' onClick={toggleEdit}>🖋️</div>
        <div className='button search-button'
             onClick={() => {
                toggleInput(showInput);
                toggleSearch(showInput);
             }}>🔎</div>
    </div>
}

export default Header;