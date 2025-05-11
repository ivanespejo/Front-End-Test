import { useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductDetails, addToCart } from "../services/api";

/** Muestra los detalles de los productos y sus acciones */
function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [colorCode, setColorCode] = useState("");
  const [storageCode, setStorageCode] = useState("");

  useEffect(() => {
    getProductDetails(id).then((data) => {
      console.log(data);
      setProduct(data);
      setColorCode(data.options?.colors?.[0]?.code || "");
      setStorageCode(data.options?.storages?.[0]?.code || "");
    });
  }, [id]);

  const handleAddToCart = async () => {
    await addToCart({ id: product.id, colorCode, storageCode });

    const current = Number(localStorage.getItem("cartCount") || 0);
    const next = current + 1;
    localStorage.setItem("cartCount", next);
    window.dispatchEvent(new Event("cartCountChanged"));
  };

  if (!product) return <div className="text-center p-5">Cargando...</div>;

  return (
    <div className="container-fluid py-4 bg-light">
      <h2 className="mb-4">DETAILS VIEW</h2>

      <div className="row d-flex align-items-stretch">
        <div className="col-md-6 mb-4 d-flex">
          <div
            className="border p-2 bg-white w-100 d-flex align-items-center justify-content-center"
            style={{ minHeight: "100%", height: "100%" }}
          >
            <img
              src={product.imgUrl}
              alt={product.model}
              className="img-fluid"
              style={{
                maxHeight: "100%",
                maxWidth: "100%",
                objectFit: "contain",
              }}
            />
          </div>
        </div>

        <div className="col-md-6 d-flex flex-column justify-content-between">
          <div className="mb-4 border p-3 bg-white">
            <h5>DESCRIPTION</h5>
            <ul className="mb-0">
              <li>
                <strong>Marca:</strong> {product.brand}
              </li>
              <li>
                <strong>Modelo:</strong> {product.model}
              </li>
              <li>
                <strong>Precio:</strong> {product.price} €
              </li>
              <li>
                <strong>CPU:</strong> {product.cpu}
              </li>
              <li>
                <strong>RAM:</strong> {product.ram}
              </li>
              <li>
                <strong>Sistema Operativo:</strong> {product.os}
              </li>
              <li>
                <strong>Resolucion:</strong> {product.displayResolution}
              </li>
              <li>
                <strong>Bateria:</strong> {product.battery}
              </li>
              <li>
                <strong>Cmara:</strong> {product.primaryCamera} /{" "}
                {product.secondaryCmera}
              </li>
              <li>
                <strong>Dimensiones:</strong> {product.dimentions}
              </li>
              <li>
                <strong>Fecha de salida:</strong> {product.announced}
              </li>
              <li>
                <strong>Audio Jack:</strong> {product.audioJack}
              </li>
              <li>
                <strong>Blueetoth:</strong> {product.bluetooth}
              </li>
            </ul>
          </div>

          <div className="border p-3 bg-white">
            <h5>ACTIONS</h5>

            <div className="mb-3">
              <label className="form-label">Color</label>
              <select
                className="form-select"
                value={colorCode}
                onChange={(e) => setColorCode(Number(e.target.value))}
              >
                {product.options.colors.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Almacenamiento</label>
              <select
                className="form-select"
                value={storageCode}
                onChange={(e) => setStorageCode(Number(e.target.value))}
              >
                {product.options.storages.map((s) => (
                  <option key={s.code} value={s.code}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            <button className="btn btn-success w-100" onClick={handleAddToCart}>
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
