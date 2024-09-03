import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listCategories, listSubcategories, addProduct } from '../actions/adminActions';
import {
  Container,
  TextField,
  MenuItem,
  Select,
  Button,
  CircularProgress,
  Typography,
  Grid,
  Paper,
  InputLabel,
  FormControl,
  IconButton
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { useSnackbar } from 'notistack';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [images, setImages] = useState([]);

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar(); // Hook for notifications

  const categoryList = useSelector((state) => state.categoryList);
  const { categories = [], loading: categoriesLoading, error: categoriesError } = categoryList;

  const subcategoryList = useSelector((state) => state.subcategoryList);
  const { subcategories = [], loading: subcategoriesLoading, error: subcategoriesError } = subcategoryList;

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
        // Clear the form fields
        setName('');
        setPrice('');
        setDescription('');
        setCategory('');
        setSubcategory('');
        setImages([]);
      })
      .catch((error) => {
        enqueueSnackbar('Failed to add product. Please try again.', { variant: 'error' });
      });
  };

  return (
    <Container maxWidth="md" component={Paper} elevation={3} style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>
        Add New Product
      </Typography>
      {categoriesLoading || subcategoriesLoading ? (
        <CircularProgress />
      ) : (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Product Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Price"
                variant="outlined"
                fullWidth
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Category</InputLabel>
                <Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  label="Category"
                  required
                >
                  <MenuItem value="">
                    <em>Select Category</em>
                  </MenuItem>
                  {categories.map((cat) => (
                    <MenuItem key={cat._id} value={cat._id}>{cat.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Subcategory</InputLabel>
                <Select
                  value={subcategory}
                  onChange={(e) => setSubcategory(e.target.value)}
                  label="Subcategory"
                  required
                >
                  <MenuItem value="">
                    <em>Select Subcategory</em>
                  </MenuItem>
                  {subcategories.map((sub) => (
                    <MenuItem key={sub._id} value={sub._id}>{sub.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <input
                accept="image/*"
                id="file-input"
                type="file"
                multiple
                style={{ display: 'none' }}
                onChange={handleImageChange}
              />
              <label htmlFor="file-input">
                <IconButton color="primary" component="span">
                  <PhotoCamera />
                </IconButton>
                <Typography variant="body1">Upload Images</Typography>
              </label>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit" fullWidth>
                Add Product
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Container>
  );
};

export default AddProduct;
