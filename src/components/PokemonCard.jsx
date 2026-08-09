function PokemonCard({ pokemon, color, onSeleccionar }) {
  return (
    <div className={"pokemon-card card-" + color} onClick={() => onSeleccionar(pokemon)}>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p className="pokemon-number">#{pokemon.id}</p>
      <h5>{pokemon.name}</h5>
    </div>
  )
}

export default PokemonCard
