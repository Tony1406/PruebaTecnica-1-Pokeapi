import { useState } from 'react'

function SearchBar({ onBuscar }) {

  const [nombre, setNombre] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (nombre == "") return
    onBuscar(nombre)
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <span>🔍</span>
      <input
        type="text"
        className="search-input"
        placeholder="Busca tu Pokemón"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
    </form>
  )
}

export default SearchBar
