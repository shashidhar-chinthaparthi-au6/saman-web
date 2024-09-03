import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewSubcategory, removeSubcategory, listSubcategories } from '../actions/subcategoryActions';
import styled from 'styled-components';
import { listCategories } from '../actions/adminActions';

const AddSubcategory = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');

  const dispatch = useDispatch();

  // Fetch subcategories
  const subcategoryList = useSelector((state) => state.subcategoryList);
  const { subcategories, loading: subcategoriesLoading, error: subcategoriesError } = subcategoryList;

  // Fetch categories
  const categoryList = useSelector((state) => state.categoryList);
  const { categories, loading: categoriesLoading, error: categoriesError } = categoryList;

  const subcategoryAdd = useSelector((state) => state.subcategoryAdd);
  const { loading: addLoading, success: addSuccess, error: addError } = subcategoryAdd;

  useEffect(() => {
    dispatch(listSubcategories());
    dispatch(listCategories());
  }, [dispatch]);

  useEffect(() => {
    if (addSuccess) {
      alert('Subcategory added successfully!');
      setName('');
      setCategory('');
    }
  }, [addSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addNewSubcategory({ name, category }));
  };

  const handleRemove = (id) => {
    if (window.confirm('Are you sure you want to delete this subcategory?')) {
      dispatch(removeSubcategory(id));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Title>Add Subcategory</Title>
      <Input
        type="text"
        placeholder="Subcategory Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Select value={category} onChange={(e) => setCategory(e.target.value)} required>
        <option value="">Select Category</option>
        {categoriesLoading ? (
          <option>Loading categories...</option>
        ) : categoriesError ? (
          <option>Error loading categories</option>
        ) : (
          categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))
        )}
      </Select>
      <SubmitButton type="submit" disabled={addLoading}>
        {addLoading ? 'Adding...' : 'Add Subcategory'}
      </SubmitButton>
      {addError && <ErrorText>{addError}</ErrorText>}
      
      <SubcategoryList>
        <ListTitle>Current Subcategories</ListTitle>
        <ScrollableList>
          {subcategoriesLoading ? (
            <NoSubcategories>Loading subcategories...</NoSubcategories>
          ) : subcategoriesError ? (
            <NoSubcategories>Error loading subcategories: {subcategoriesError}</NoSubcategories>
          ) : subcategories.length === 0 ? (
            <NoSubcategories>No subcategories available.</NoSubcategories>
          ) : (
            subcategories.map((subcat) => (
              <ListItem key={subcat._id}>
                <div>{subcat.name}</div>
                <div>{subcat.categoryName}</div>
                <RemoveButton onClick={() => handleRemove(subcat._id)}>Remove</RemoveButton>
              </ListItem>
            ))
          )}
        </ScrollableList>
      </SubcategoryList>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: #ffffff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  transition: border-color 0.3s;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  transition: border-color 0.3s;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const SubmitButton = styled.button`
  padding: 0.75rem;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #0056b3;
  }
  &:disabled {
    background-color: #c0c0c0;
    cursor: not-allowed;
  }
`;

const ErrorText = styled.p`
  color: #e74c3c;
  font-size: 1rem;
  text-align: center;
`;

const SubcategoryList = styled.div`
  background: #ffffff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ListTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
  flex-shrink: 0;
`;

const ScrollableList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 300px;
  overflow-y: auto;
  flex-grow: 1;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f9f9f9;
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 1rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const RemoveButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #c0392b;
  }
`;

const NoSubcategories = styled.p`
  color: #666;
  font-style: italic;
  text-align: center;
`;

export default AddSubcategory;
