export function FormGroup({ errorMessage = "", children }) {
    return (
      <div className="flex flex-col">
        {children}
        {errorMessage.length > 0 && (
          <small className="text-red-700 block mt-1">{errorMessage}</small>
        )}
      </div>
    );
  }
  