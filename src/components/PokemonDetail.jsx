function PokemonDetail({ pokemon }) {

  if (!pokemon) {
    return (
      <div className="pokemon-detail">
        <p>Selecciona un pokemón para ver el detalle</p>
      </div>
    )
  }

  const tipos = pokemon.types.map((t) => t.type.name).join(", ")
  const movimientos = pokemon.moves.slice(0, 4).map((m) => m.move.name).join(", ")

  return (
    <div className="pokemon-detail">
      <img className="main-sprite" src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p className="pokemon-number">#{pokemon.id}</p>
      <h5>{pokemon.name}</h5>
      <div className="detail-info">
        <p>Tipo: {tipos}</p>
        <p>Peso: {pokemon.weight}</p>
        <p>Sprites:</p>
        <div className="sprites-row">
          <img src={pokemon.sprites.front_default} alt="front" />
          <img src={pokemon.sprites.back_default} alt="back" />
          <img src={pokemon.sprites.front_shiny} alt="front shiny" />
          <img src={pokemon.sprites.back_shiny} alt="back shiny" />
        </div>
        <p>Movimientos: {movimientos}</p>
      </div>
    </div>
  )
}

export default PokemonDetail
