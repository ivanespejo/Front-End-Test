import { Link } from "react-router-dom";

/** Items del menu principal */
function ProductItem({ product }) {
  return (
    <div className="card h-100 text-center">
      <Link
        to={`/product/${product.id}`}
        className="text-decoration-none text-dark"
      >
        <img
          src={product.imgUrl}
          className="card-img-top p-3"
          alt={product.model}
        />
        <div className="card-body">
          <h5 className="card-title">
            {product.brand} - {product.model}
          </h5>
          <p className="card-text">{product.price} €</p>
        </div>
      </Link>
    </div>
  );
}

export default ProductItem;
