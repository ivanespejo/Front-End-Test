import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
/** Componente Header Donde contiene el titulo, volver y carrito */
function Header() {
  // Para saber en que ubicacion del navegador estoy
  const location = useLocation();
  const [cartCount, setCartCount] = useState(
    Number(localStorage.getItem("cartCount") || 0)
  );

  const menuPrincipal = location.pathname === "/";

  useEffect(() => {
    const update = () =>
    setCartCount(Number(localStorage.getItem("cartCount") || 0));
    window.addEventListener("cartCountChanged", update);
    return () => window.removeEventListener("cartCountChanged", update);
  }, []);

  return (
    <header className="bg-success text-white py-3">
      <div className="container d-flex justify-content-between align-items-center">
        <Link to="/" className="text-white text-decoration-none">
          <h1 className="h4 mb-0">Iván Espejo Acevedo</h1>
        </Link>
        <nav className="d-flex gap-3">
          <span className="text-light">
            {!menuPrincipal && <span className="text-light">Detalles</span>}
          </span>
          {!menuPrincipal && (
            <Link to="/" className="text-white">
              ← Volver
            </Link>
          )}
        </nav>
        <div className="fw-bold">🛒{cartCount}</div>
      </div>
    </header>
  );
}

export default Header;
