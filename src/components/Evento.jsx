function Evento({
  className,
  titulo,
  descricao,
  data,
  apresentadores,
  vagas,
  contato,
  onInscrever,
}) {
  return (
    <div className={className}>
      <div className="card h-100">
        <div className="card-body d-flex flex-column">
          <h5 className="card-title text-start">{titulo}</h5>

          <p className="card-text flex-grow-1 text-start">{descricao}</p>

          <ul className="list-unstyled text-start">
            <li>
              <strong>Data:</strong> {data}
            </li>
            <li>
              <strong>Apresentadores:</strong> {apresentadores}
            </li>
            <li>
              <strong>Vagas Restantes:</strong> {vagas}
            </li>
            <li>
              <strong>Contato:</strong> {contato}
            </li>
          </ul>

          <button className="btn btn-primary mt-auto" onClick={onInscrever}>
            Inscrever-se
          </button>
        </div>
      </div>
    </div>
  );
}

export default Evento;
