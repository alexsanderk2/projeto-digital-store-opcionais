import './Status.css';

export const Loading = ({ text = 'Carregando...' }) => (
  <div className="status" role="status">
    <span className="status__spinner" aria-hidden="true" />
    <p>{text}</p>
  </div>
);

export const ErrorMessage = ({ text = 'Não foi possível carregar os dados.', onRetry }) => (
  <div className="status status--error" role="alert">
    <p>{text}</p>
    {onRetry && (
      <button type="button" className="status__retry" onClick={onRetry}>
        Tentar novamente
      </button>
    )}
  </div>
);
