import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/api';
import LoadingSpinner from './LoadingSpinner';
import ProductModal from './ProductModal';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [error, setError] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [filters, setFilters] = useState({
        category: 'All',
        minPrice: '',
        maxPrice: '',
        rating: '',
    });
    const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
    const [open, setOpen] = useState(false); // Corrected this line

    // Derive unique categories from products
    const categories = ['All', ...new Set(products.map((product) => product.category))];


    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            try {
                const newProducts = await fetchProducts(page);
                setProducts((prev) => [...prev, ...newProducts]); // Append new products
                setFilteredProducts((prev) => [...prev, ...newProducts]); // Update filtered products
            } catch (err) {
                setError('Failed to load products');
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, [page]);

    useEffect(() => {
        let updatedProducts = [...products];
        // Category filter
        if (filters.category && filters.category !== 'All') {
            updatedProducts = products.filter(
                (product) => product.category === filters.category
            );
        }

        // Min Price filter (only apply if value is entered)
        if (filters.minPrice && !isNaN(filters.minPrice)) {
            updatedProducts = updatedProducts.filter(
                (product) => product.price >= parseFloat(filters.minPrice)
            );
        }
        // Max Price filter (only apply if value is entered)
        if (filters.maxPrice && !isNaN(filters.maxPrice)) {
            updatedProducts = updatedProducts.filter(
                (product) => product.price <= parseFloat(filters.maxPrice)
            );
        }

        // Rating filter
        if (filters.rating && !isNaN(filters.rating)) {
            updatedProducts = updatedProducts.filter(
                (product) => product.rating.rate >= parseFloat(filters.rating)
            );
        }

        // Apply sorting logic
        if (sortConfig.key) {
            updatedProducts.sort((a, b) => {
                if (sortConfig.key === 'rating.rate') {
                    // Sort by rating rate
                    return sortConfig.direction === 'ascending'
                        ? a.rating?.rate - b.rating?.rate
                        : b.rating?.rate - a.rating?.rate;
                }
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        setFilteredProducts(updatedProducts);
        setLoading(false);
    }, [products, filters, sortConfig]);
    

    const handleLoadMore = () => {
        setPage((prev) => prev + 1);
    };

    const handleRowClick = (product) => {
        setSelectedProduct(product);
        setOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedProduct(null);
        setOpen(false);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return '⇅'; // Default sort icon
        return sortConfig.direction === 'ascending' ? '↑' : '↓';
    };

    return (
        <div className="product-table-container">
            {error && <div className="error">{error}</div>}

            {/* Product Table */}
            <table className="product-table">
                <thead>
                    <tr>
                        <th >Image </th>
                        <th>Name <button onClick={() => handleSort('title')}>{getSortIcon('title')}
                        </button></th>
                        <th >
                            Price <button onClick={() => handleSort('price')}>
                                {getSortIcon('price')}
                            </button>
                            <div className="filter-inputs">
                                <input
                                    type="number"
                                    name="minPrice"
                                    placeholder="Min"
                                    value={filters.minPrice}
                                    onChange={handleFilterChange}
                                />
                                <input
                                    type="number"
                                    name="maxPrice"
                                    placeholder="Max"
                                    value={filters.maxPrice}
                                    onChange={handleFilterChange}
                                />
                            </div>
                        </th>
                        <th >
                            Category <button onClick={() => handleSort('category')}>
                                {getSortIcon('category')}</button>
                            <select
                                value={filters.category}
                                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                            >
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </th>
                        <th >

                            Rating <button onClick={() => handleSort('rating.rate')}>
                                {getSortIcon('rating.rate')}</button>
                            <select
                                name="rating"
                                value={filters.rating}
                                onChange={handleFilterChange}
                            >
                                <option value="">All</option>
                                <option value="1">1 Star & Up</option>
                                <option value="2">2 Stars & Up</option>
                                <option value="3">3 Stars & Up</option>
                                <option value="4">4 Stars & Up</option>
                            </select>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product,index) => (
                            <tr key={index} onClick={() => handleRowClick(product)}>
                                <td>
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="product-image"
                                    />
                                </td>
                                <td>{product.title}</td>
                                <td>{product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.rating.rate} Stars</td>
                            </tr>
                        ))) : (
                        <tr>
                            <td colSpan="5">No products found</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {loading && <LoadingSpinner />}
            <button
                className="load-more"
                onClick={handleLoadMore}
                disabled={loading}
            >
                {loading ? 'Loading...' : 'Load More'}
            </button>

            {selectedProduct && (
                <ProductModal  product={selectedProduct} open={open}
                handleClose={handleCloseModal}/>
            )}
        </div>
    );
};

export default ProductList;
