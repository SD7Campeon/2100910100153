import React, { useState, useEffect } from 'eact';
import axios from 'axios';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [company, setCompany] = useState('');
  const [rating, setRating] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [availability, setAvailability] = useState('');

  useEffect(() => {
    axios.get(`http://20.244.56.144/test/companies/${company}/categories/${category}/products?top=10&minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}`)
     .then(response => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
     .catch(error => {
        console.error(error);
      });
  }, [company, category, priceRange]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'category':
        setCategory(value);
        break;
      case 'company':
        setCompany(value);
        break;
      case 'rating':
        setRating(value);
        break;
      case 'priceRange':
        setPriceRange(value.split(','));
        break;
      case 'availability':
        setAvailability(value);
        break;
      default:
        break;
    }
  };

  const filterProducts = () => {
    const filtered = products.filter(product => {
      if (category && product.category!== category) return false;
      if (company && product.company!== company) return false;
      if (rating && product.rating < rating) return false;
      if (priceRange && (product.price < priceRange[0] || product.price > priceRange[1])) return false;
      if (availability && product.availability!== availability) return false;
      return true;
    });
    setFilteredProducts(filtered);
  };

  return (
    <div className="App">
      <h1>Top N Products</h1>
      <form>
        <label>Category:</label>
        <select name="category" value={category} onChange={handleFilterChange}>
          <option value="">All</option>
          <option value="Phone">Phone</option>
          <option value="Computer">Computer</option>
          <option value="TV">TV</option>
          {/* Add more options */}
        </select>
        <br />
        <label>Company:</label>
        <select name="company" value={company} onChange={handleFilterChange}>
          <option value="">All</option>
          <option value="AMZ">AMZ</option>
          <option value="FLP">FLP</option>
          <option value="SNP">SNP</option>
          {/* Add more options */}
        </select>
        <br />
        <label>Rating:</label>
        <input type="number" name="rating" value={rating} onChange={handleFilterChange} />
        <br />
        <label>Price Range:</label>
        <input type="text" name="priceRange" value={priceRange} onChange={handleFilterChange} />
        <br />
        <label>Availability:</label>
        <select name="availability" value={availability} onChange={handleFilterChange}>
          <option value="">All</option>
          <option value="yes">In Stock</option>
          <option value="out-of-stock">Out of Stock</option>
        </select>
        <br />
        <button onClick={filterProducts}>Filter</button>
      </form>
      <ul>
        {filteredProducts.map(product => (
          <li key={product.productName}>
            <h2>{product.productName}</h2>
            <p>Company: {product.company}</p>
            <p>Category: {product.category}</p>
            <p>Price: {product.price}</p>
            <p>Rating: {product.rating}</p>
            <p>Discount: {product.discount}</p>
            <p>Availability: {product.availability}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
