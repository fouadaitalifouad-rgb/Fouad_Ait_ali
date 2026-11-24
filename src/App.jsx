
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [id, setId] = useState("");
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  function rechercher() {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(response => response.json())
      .then(data => {
        if (data.id) {
          setProduct(data);
        } else {
          alert("Produit introuvable");
        }
      });
  }

  if (product) {
    return (
      <div className="container">
        <h1>Détails du Produit</h1>
        <img src={product.image} alt={product.title} />
        <h2>{product.title}</h2>
        <p>Prix : {product.price} $</p>
        <p>Catégorie : {product.category}</p>
        <p>{product.description}</p>

        <button onClick={() => setProduct(null)}>
          Retour
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Discover Our Amazing Products</h1>

      <div className="search">
        <input
          type="number"
          placeholder="Product ID..."
          value={id}
          onChange={e => setId(e.target.value)}
        />
        <button onClick={rechercher}>Rechercher</button>
      </div>

      <h2>Our Products</h2>

      <div className="products">
        {products.map(p => (
          <div className="card" key={p.id}>
            <img src={p.image} alt={p.title} />
            <h3>{p.title}</h3>
            <p>{p.price} $</p>
            <button onClick={() => setProduct(p)}>
              Détails
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
