// src/components/AddProductPopup.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, listCategories, listSubcategories } from '../actions/adminActions';
import { useSnackbar } from 'notistack';

const AddProductPopup = ({ onClose }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [images, setImages] = useState([]);

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const categoryList = useSelector((state) => state.categoryList);
  const { categories = [] } = categoryList;

  const subcategoryList = useSelector((state) => state.subcategoryList);
  const { subcategories = [] } = subcategoryList;

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  useEffect(() => {
    if (category) {
      dispatch(listSubcategories(category));
    }
  }, [dispatch, category]);

  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('subcategory', subcategory);

    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }

    dispatch(addProduct(formData))
      .then(() => {
        enqueueSnackbar('Product added successfully!', { variant: 'success' });
        onClose();
      })
      .catch(() => {
        enqueueSnackbar('Failed to add product. Please try again.', { variant: 'error' });
      });
  };

  return (
    <PopupContainer>
      <PopupContent>
        <h2>Add New Product</h2>
        <form onSubmit={handleSubmit}>
          <FormField>
            <label>Product Name:</label>
            <StyledInput
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </FormField>
          <FormField>
            <label>Price:</label>
            <StyledInput
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </FormField>
          <FormField>
            <label>Description:</label>
            <StyledTextarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </FormField>
          <FormField>
            <label>Category:</label>
            <StyledSelect
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </StyledSelect>
          </FormField>
          <FormField>
            <label>Subcategory:</label>
            <StyledSelect
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              required
            >
              <option value="">Select Subcategory</option>
              {subcategories.map((sub) => (
                <option key={sub._id} value={sub._id}>{sub.name}</option>
              ))}
            </StyledSelect>
          </FormField>
          <FormField>
            <label>Images:</label>
            <StyledFileInput
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </FormField>
          <ButtonGroup>
            <SubmitButton type="submit">Add Product</SubmitButton>
            <CancelButton type="button" onClick={onClose}>Cancel</CancelButton>
          </ButtonGroup>
        </form>
      </PopupContent>
    </PopupContainer>
  );
};

const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopupContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 500px;
  max-width: 90%;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  overflow: hidden;

  h2 {
    margin-bottom: 1.5rem;
    color: #333;
    font-size: 1.8rem;
    font-weight: 700;
  }
`;

const FormField = styled.div`
  margin-bottom: 1.5rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: #333;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  font-size: 1rem;
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  font-size: 1rem;
  resize: vertical;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  font-size: 1rem;
`;

const StyledFileInput = styled.input`
  display: block;
  margin-top: 0.5rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #0056b3;
  }
`;

const CancelButton = styled.button`
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #5a6268;
  }
`;

export default AddProductPopup;
