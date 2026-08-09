function Pagination({ onAtras, onSiguiente }) {
  return (
    <div className="pagination">
      <button onClick={onAtras} type="button" className="btn">Atras</button>
      <button onClick={onSiguiente} type="button" className="btn">Siguiente</button>
    </div>
  )
}

export default Pagination
