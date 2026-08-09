import { useEffect, useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'
import PokemonCard from './components/PokemonCard'
import PokemonDetail from './components/PokemonDetail'
import Pagination from './components/Pagination'

const LIMIT = 4
const COLORES = ["primary", "danger", "warning", "success"]

function App() {

  const [pokemonList, setPokemonList] = useState([])
  const [selectedPokemon, setSelectedPokemon] = useState(null)
  const [offset, setOffset] = useState(0)
  const [loading, setLoading] = useState(false)
  const [notFound, setNotFound] = useState(false)

  const cargarListado = (offsetActual) => {
    setLoading(true)
    setNotFound(false)

    fetch("https://pokeapi.co/api/v2/pokemon?limit=" + LIMIT + "&offset=" + offsetActual)
      .then((Response) => {
        return Response.json()
      })
      .then((json) => {
        const promesas = json.results.map((pokemon) => {
          return fetch(pokemon.url).then((Response) => Response.json())
        })
        return Promise.all(promesas)
      })
      .then((listaCompleta) => {
        setPokemonList(listaCompleta)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error, "error search")
        setLoading(false)
      })
  }

  useEffect(() => {
    cargarListado(offset)
  }, [offset])

  const buscarPokemon = (nombre) => {
    setLoading(true)
    setNotFound(false)

    fetch("https://pokeapi.co/api/v2/pokemon/" + nombre.toLowerCase())
      .then((Response) => {
        if (!Response.ok) {
          throw new Error("No encontrado")
        }
        return Response.json()
      })
      .then((pokemon) => {
        setPokemonList([pokemon])
        setSelectedPokemon(pokemon)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error, "error search")
        setNotFound(true)
        setPokemonList([])
        setLoading(false)
      })
  }

  const mostrarSiguiente = () => {
    setOffset(offset + LIMIT)
  }

  const mostrarPrevio = () => {
    if (offset - LIMIT >= 0) {
      setOffset(offset - LIMIT)
    }
  }

  return (
    <div className="app">

      <h1 className="app-title">
        Listado de Pokemón
      </h1>

      <SearchBar onBuscar={buscarPokemon} />

      <h2 className="section-title">
        Resultados
      </h2>

      {loading ? <p className="status-message">Cargando...</p> : null}
      {notFound ? <p className="status-message">No se encontró ese pokemón.</p> : null}

      <div className="results">
        <div className="pokemon-grid">
          {pokemonList.map((pokemon, index) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              color={COLORES[index % COLORES.length]}
              onSeleccionar={setSelectedPokemon}
            />
          ))}
        </div>

        <PokemonDetail pokemon={selectedPokemon} />
      </div>

      <Pagination onAtras={mostrarPrevio} onSiguiente={mostrarSiguiente} />

    </div>
  )
}

export default App
