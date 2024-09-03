import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, fetchCategories, removeCategory } from '../actions/categoryActions';
import styled from 'styled-components';

const AddCategory = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState([]);

  const categoryList = useSelector((state) => state.categoryList);
  const { categories: fetchedCategories, loading, error } = categoryList;

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await dispatch(fetchCategories());
        setCategories(data.data); // Assuming `data.data` is the correct path
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    loadCategories();
  }, [dispatch]);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addCategory({ name, description }));
      alert('Category added successfully!');
      const data = await dispatch(fetchCategories());
      setCategories(data.data); // Assuming `data.data` is the correct path
      setName('');
      setDescription('');
    } catch (error) {
      alert('Error adding category');
    }
  };

  const handleRemoveCategory = async (categoryId) => {
    try {
      await dispatch(removeCategory(categoryId));
      alert('Category and related subcategories removed successfully!');
      const data = await dispatch(fetchCategories());
      setCategories(data.data); // Assuming `data.data` is the correct path
    } catch (error) {
      alert('Error removing category');
    }
  };

  return (
    <Container>
      <Form onSubmit={handleAddCategory}>
        <Title>Add New Category</Title>
        <Input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextArea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <SubmitButton type="submit">Add Category</SubmitButton>
      </Form>

      <CategoryList>
        <ListTitle>Current Categories</ListTitle>
        <ScrollableList>
          {loading ? (
            <NoCategories>Loading categories...</NoCategories>
          ) : error ? (
            <NoCategories>Error loading categories: {error}</NoCategories>
          ) : categories.length === 0 ? (
            <NoCategories>No categories available.</NoCategories>
          ) : (
            categories.map((category) => (
              <ListItem key={category._id}>
                <CategoryDetails>
                  <CategoryName>{category.name}</CategoryName>
                  <CategoryDescription>{category.description}</CategoryDescription>
                </CategoryDetails>
                <RemoveButton onClick={() => handleRemoveCategory(category._id)}>Remove</RemoveButton>
              </ListItem>
            ))
          )}
        </ScrollableList>
      </CategoryList>
    </Container>
  );
};

const Container = styled.div`
  padding: 2rem;
  background: #f7f8fa;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Form = styled.form`
  background: #ffffff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
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

const TextArea = styled.textarea`
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
`;

const CategoryList = styled.div`
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

const CategoryDetails = styled.div`
  flex: 1;
  margin-right: 1rem;
`;

const CategoryName = styled.h3`
  font-size: 1.25rem;
  color: #333;
  margin: 0;
`;

const CategoryDescription = styled.p`
  font-size: 1rem;
  color: #666;
  margin: 0;
`;

const RemoveButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #c82333;
  }
`;

const NoCategories = styled.p`
  color: #666;
  font-style: italic;
  text-align: center;
`;

export default AddCategory;
