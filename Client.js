
// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState({
    category: '',
    company: '',
    rating: '',
    priceRange: '',
    available: '',
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        setError(error.message);
      });
  }, []);

  const handleFilterChange = ({ target: { name, value } }) => {
    setFilterCriteria({ ...filterCriteria, [name]: value });
  };

  const filterProducts = ({ category, company, rating, priceRange, available }) => {
    return products.filter(product => {
      if (category && product.category !== category) return false;
      if (company && product.company !== company) return false;
      if (rating && product.rating < rating) return false;
      if (priceRange && product.price > priceRange) return false;
      if (available && product.available !== (available === 'true')) return false;
      return true;
    });
  };

  const filteredProducts = filterProducts(filterCriteria);

  return (
    <div>
      <h1>Top N Products Filter</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form>
        <label>
          Category:
          <select name="category" value={filterCriteria.category} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Home">Home</option>
          </select>
        </label>

        <label>
          Company:
          <select name="company" value={filterCriteria.company} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="Apple">Apple</option>
            <option value="Samsung">Samsung</option>
            <option value="Nike">Nike</option>
            <option value="IKEA">IKEA</option>
            <option value="Google">Google</option>
          </select>
        </label>

        <label>
          Rating:
          <input type="number" name="rating" value={filterCriteria.rating} onChange={handleFilterChange} />
        </label>

        <label>
          Price Range:
          <input type="number" name="priceRange" value={filterCriteria.priceRange} onChange={handleFilterChange} />
        </label>

        <label>
          Available:
          <select name="available" value={filterCriteria.available} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </label>
      </form>

      <ul>
        {filteredProducts.map(product => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
