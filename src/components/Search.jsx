import { useState } from "react";

/** Buscador */
function Search({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <input
      type="text"
      className="form-control bg-danger-subtle"
      value={query}
      onChange={handleChange}
      placeholder="Buscar por marca o modelo"
    />
  );
}

export default Search;
