// src/components/Products.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';
import AddProductPopup from './AddProductPopup';
import { listCategories, listSubcategories } from '../actions/adminActions';

const Products = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [search, setSearch] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const categoryList = useSelector((state) => state.categoryList);
  const { categories, loading: categoriesLoading, error: categoriesError } = categoryList;

  const subcategoryList = useSelector((state) => state.subcategoryList);
  const { subcategories, loading: subcategoriesLoading, error: subcategoriesError } = subcategoryList;

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  useEffect(() => {
    if (category) {
      dispatch(listSubcategories(category));
    }
  }, [dispatch, category]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://saman-backend.onrender.com/api/v1/products', {
          params: {
            category,
            subcategory,
            search, // Add search query parameter
          },
        });
        setProducts(response.data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, [category, subcategory, search]);

  const handleRemoveProduct = async (productId) => {
    try {
      await axios.delete(`https://saman-backend.onrender.com/api/v1/product/${productId}`);
      setProducts(products.filter((product) => product._id !== productId));
    } catch (error) {
      console.error('Error removing product:', error);
    }
  };

  const handleOpenPopup = () => setShowPopup(true);
  const handleClosePopup = () => setShowPopup(false);

  return (
    <Container>
      <Title>Our Products</Title>
      <FilterSection>
        <Select onChange={(e) => setCategory(e.target.value)} value={category}>
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </Select>

        <Select onChange={(e) => setSubcategory(e.target.value)} value={subcategory}>
          <option value="">All Subcategories</option>
          {subcategories.map((sub) => (
            <option key={sub._id} value={sub._id}>
              {sub.name}
            </option>
          ))}
        </Select>

        <SearchInput
          type="text"
          placeholder="Search by product name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </FilterSection>

      <AddButton onClick={handleOpenPopup}>Add Product</AddButton>

      <ProductGrid>
        {products.length === 0 ? (
          <NoProductsText>No products found</NoProductsText>
        ) : (
          products.map((product) => (
            <ProductCard key={product._id}>
              <ProductImage src={`https://saman-backend.onrender.com/${product.image}`} alt={product.name} />
              <ProductInfo>
                <ProductName>{product.name}</ProductName>
                <ProductDescription>{product.description}</ProductDescription>
                <ProductPrice>Price: ₹{product.price}</ProductPrice>
                <ProductStock>Stock: {product.stock}</ProductStock>
                <RemoveButton onClick={() => handleRemoveProduct(product._id)}>Remove</RemoveButton>
              </ProductInfo>
            </ProductCard>
          ))
        )}
      </ProductGrid>

      {showPopup && <AddProductPopup onClose={handleClosePopup} />}
    </Container>
  );
};

const Container = styled.div`
  padding: 2rem;
  background: #f7f8fa;
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
  font-size: 2.5rem;
  margin-bottom: 2rem;
`;

const FilterSection = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  align-items: center;
`;

const Select = styled.select`
  padding: 0.5rem 1rem;
  margin-right: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
`;

const SearchInput = styled.input`
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  width: 200px;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const ProductCard = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const ProductInfo = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ProductName = styled.h2`
  font-size: 1.5rem;
  color: #333;
`;

const ProductDescription = styled.p`
  font-size: 1rem;
  color: #777;
  margin: 0.5rem 0;
`;

const ProductPrice = styled.p`
  font-size: 1.2rem;
  color: #555;
`;

const ProductStock = styled.p`
  font-size: 1rem;
  color: #999;
`;

const LoadingText = styled.p`
  text-align: center;
  font-size: 1rem;
  color: #555;
`;

const ErrorText = styled.p`
  text-align: center;
  font-size: 1rem;
  color: #e74c3c;
`;

const NoProductsText = styled.p`
  text-align: center;
  font-size: 1.5rem;
  color: #999;
`;

const AddButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 2rem;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #0056b3;
  }
`;

const RemoveButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #c0392b;
  }
`;

export default Products;
