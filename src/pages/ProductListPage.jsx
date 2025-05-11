import { useEffect, useState, useMemo } from "react";
import { getProducts } from "../services/api";
import ProductItem from "../components/ProductItem";
import Search from "../components/Search";

/** Pagina Menu Principal */
function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  // Uso memo para que sea mas optimo el renderizado
  const productList = useMemo(() => {
    return filtered.map((product) => (
      <div className="col-6 col-md-4 col-lg-3" key={product.id}>
        <ProductItem product={product} />
      </div>
    ));
  }, [filtered]);

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
      setFiltered(data);
    });
  }, []);

  const handleSearch = (query) => {
    const result = products.filter(
      (product) =>
        product.brand.toLowerCase().includes(query.toLowerCase()) ||
        product.model.toLowerCase().includes(query.toLowerCase())
    );
    setFiltered(result);
  };

  return (
    <div className="container-fluid py-4 bg-light">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h5">LIST VIEW</h2>
        <div className="w-25">
          <Search onSearch={handleSearch} />
        </div>
      </div>
      <div className="row g-4">{productList}</div>
    </div>
  );
}

export default ProductListPage;