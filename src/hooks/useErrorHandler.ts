import { useState } from "react";

export function useErrorHandler() {
  const [error, setError] = useState<Error | null>(null);

  const handleError = (err: unknown) => {
    if (err instanceof Error) {
      setError(err);
    } else {
      setError(new Error(String(err)));
    }
  };

  const clearError = () => {
    setError(null);
  };

  return {
    error,
    handleError,
    clearError,
    ErrorDisplay: () =>
      error && (
        <div className="error-message">
          <p>{error.message}</p>
          <button onClick={clearError}>Dismiss</button>
        </div>
      ),
  };
}
