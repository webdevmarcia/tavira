import { useState } from "react";

export default function Gate({ children }) {
  const [authorized, setAuthorized] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validar = () => {
    if (password === "Marisco") {
      setAuthorized(true);
      setError("");
    } else {
      setError("Password incorreta");
    }
  };

  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="p-8 bg-white shadow-xl rounded-xl w-80">
          <h1 className="text-xl font-bold mb-4 text-center">Acesso Restrito</h1>

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg mb-3"
          />

          <button
            onClick={validar}
            className="w-full bg-black text-white py-2 rounded-lg"
          >
            Entrar
          </button>

          {error && <p className="text-red-600 mt-3 text-center">{error}</p>}
        </div>
      </div>
    );
  }

  return children;
}
