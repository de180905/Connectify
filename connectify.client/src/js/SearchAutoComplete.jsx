import React, { useState } from 'react';

const SearchAutocomplete = ({ Category, passData, initialQuery, placeholder }) => {
    const [query, setQuery] = useState(initialQuery);
    const [suggestions, setSuggestions] = useState([]);
    let getUrl = () => { };
    if (Category === 'location') {
        getUrl = (searchTerm) => `https://nominatim.openstreetmap.org/search?q=${searchTerm}&format=json&addressdetails=1`;
    } else if (Category === 'school') {
        getUrl = (searchTerm) => `https://www.worlduniversities.net/api/v1/search?name=${searchTerm}`;

    } else if (Category === 'company') {
        getUrl = (searchTerm) => `https://autocomplete.clearbit.com/v1/companies/suggest?query=${searchTerm}`;
    }
    const handleInputChange = async (event) => {
        const searchTerm = event.target.value;
        setQuery(searchTerm);

        if (searchTerm.length > 2) {
            const response = await fetch(getUrl(searchTerm)
            );
            const data = await response.json();
            setSuggestions(data);
            console.log(data);
        } else {
            setSuggestions([]);
        }
    };

    const handleSelect = (item) => {
        if (Category === 'location') {
            setQuery(item.display_name);
        } else if (Category === 'school') {
            setQuery(item.label);
        } else if (Category === 'company') {
            setQuery(item.name);
        }
        passData(item);        
        setSuggestions([]);
    };

    const styles = {
        container: {
            position: 'relative',
            maxWidth: '600px', // Increased max width for the container
            margin: '0 auto',
        },
        input: {
            width: '100%', // Full width of the container
            padding: '10px 15px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
            fontSize: '16px',
            transition: 'border-color 0.3s',
        },
        inputFocus: {
            borderColor: '#007bff',
            outline: 'none',
        },
        suggestionsList: {
            listStyleType: 'none',
            padding: 0,
            margin: '5px 0 0 0',
            border: '1px solid #ccc',
            borderRadius: '4px',
            backgroundColor: '#fff',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
            position: 'absolute',
            width: '100%',
            zIndex: 1000,
        },
        suggestionItem: {
            padding: '10px 15px',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
        },
        suggestionItemHover: {
            backgroundColor: '#f1f1f1',
        },
    };

    return (
        <div style={styles.container}>
            <input
                type="text"
                style={{
                    ...styles.input,
                    ...(query ? styles.inputFocus : {}),
                }}
                value={query}
                onChange={handleInputChange}
                placeholder={placeholder}
            />
            {suggestions.length > 0 && (
                <ul style={styles.suggestionsList}>
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            onClick={() => handleSelect(suggestion)}
                            style={styles.suggestionItem}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = styles.suggestionItemHover.backgroundColor;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                            }}
                        >
                            {Category == "location" ? suggestion.display_name : Category == "company" ? suggestion.name : Category == "school" ? suggestion.label : ""}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchAutocomplete;
