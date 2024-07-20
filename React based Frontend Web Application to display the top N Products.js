import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [products, setProducts] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState({
    category: '',
    company: '',
    rating: '',
    priceRange: ['', ''],
    availability: '',
  });
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://20.244.56.144/test/companies/${filterCriteria.company}/categories/${filterCriteria.category}/products?top=10&minPrice=${filterCriteria.priceRange[0]}&maxPrice=${filterCriteria.priceRange[1]}`);
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilterCriteria((prevCriteria) => ({ ...prevCriteria, [name]: value }));
  };

  const filterProducts = () => {
    const filtered = products.filter((product) => {
      return (
        (filterCriteria.category === '' || product.category === filterCriteria.category) &&
        (filterCriteria.company === '' || product.company === filterCriteria.company) &&
        (filterCriteria.rating === '' || product.rating >= filterCriteria.rating) &&
        (filterCriteria.priceRange[0] === '' || product.price >= filterCriteria.priceRange[0]) &&
        (filterCriteria.priceRange[1] === '' || product.price <= filterCriteria.priceRange[1]) &&
        (filterCriteria.availability === '' || product.availability === filterCriteria.availability)
      );
    });
    setFilteredProducts(filtered);
  };

  return (
    <div className="App">
      <h1>Top N Products</h1>
      <form>
        <label>Category:</label>
        <select name="category" value={filterCriteria.category} onChange={handleFilterChange}>
          <option value="">All</option>
          <option value="Phone">Phone</option>
          <option value="Computer">Computer</option>
          <option value="TV">TV</option>
          {/* Add more options */}
        </select>
        <br />
        <label>Company:</label>
        <select name="company" value={filterCriteria.company} onChange={handleFilterChange}>
          <option value="">All</option>
          <option value="AMZ">AMZ</option>
          <option value="FLP">FLP</option>
          <option value="SNP">SNP</option>
          {/* Add more options */}
        </select>
        <br />
        <label>Rating:</label>
        <input type="number" name="rating" value={filterCriteria.rating} onChange={handleFilterChange} />
        <br />
        <label>Price Range:</label>
        <input type="text" name="priceRange" value={filterCriteria.priceRange.join(',')} onChange={handleFilterChange} />
        <br />
        <label>Availability:</label>
        <select name="availability" value={filterCriteria.availability} onChange={handleFilterChange}>
          <option value="">All</option>
          <option value="yes">In Stock</option>
          <option value="out-of-stock">Out of Stock</option>
        </select>
        <br />
        <button onClick={filterProducts}>Filter</button>
           </form>
      <ul>
        {filteredProducts.map((product) => (
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
};

export default App;
