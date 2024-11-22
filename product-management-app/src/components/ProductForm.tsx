import React, { useState, useEffect } from 'react';
import { Product } from '../App';

interface ProductFormProps {
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  editingProduct: Product | null;
  onCancelEdit: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  onAddProduct,
  onUpdateProduct,
  editingProduct,
  onCancelEdit,
}) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name);
      setPrice(editingProduct.price.toString());
      setCategory(editingProduct.category || '');
    } else {
      resetForm();
    }
  }, [editingProduct]);

  const resetForm = () => {
    setName('');
    setPrice('');
    setCategory('');
    setError('');
  };

  const validatePrice = (value: string): string => {
    const parsed = parseFloat(value);
    if (isNaN(parsed) || parsed <= 0) {
      setError('Price must be greater than 0.');
      return '';
    }
    setError('');
    return parsed.toFixed(2); // Ensure two decimal places
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow valid numbers and decimal points
    if (/^\d*\.?\d*$/.test(value)) {
      setPrice(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validatedPrice = validatePrice(price);
    if (!validatedPrice) {
      return; // Prevent submission if validation fails
    }

    const product: Product = {
      id: editingProduct ? editingProduct.id : Date.now().toString(),
      name,
      price: parseFloat(validatedPrice),
      category,
    };

    if (editingProduct) {
      onUpdateProduct(product);
    } else {
      onAddProduct(product);
    }
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Product Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="price">Price:</label>
        <input
          type="text"
          id="price"
          value={price}
          onChange={handlePriceChange}
          required
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
      <div>
        <label htmlFor="category">Category:</label>
        <input
          type="text"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
      <button type="submit">{editingProduct ? 'Update' : 'Add'} Product</button>
      {editingProduct && (
        <button type="button" onClick={onCancelEdit}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default ProductForm;
