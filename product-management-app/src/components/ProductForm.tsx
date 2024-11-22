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
  const [product, setProduct] = useState<Product>({
    id: '',
    name: '',
    price: 0,
    category: '',
  });

  const [error, setError] = useState<string>(''); // To store error messages
  const [priceIsValid, setPriceIsValid] = useState<boolean>(true); // Track price validity

  useEffect(() => {
    if (editingProduct) {
      setProduct(editingProduct); // Populate form fields when editing product
    }
  }, [editingProduct]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    // Detect if the input starts with "0"
    if (value.startsWith('0') && value.length > 1) {
      setPriceIsValid(false);
      setError('Price cannot start with 0.');
    } else {
      const priceValue = parseFloat(value);

      if (priceValue <= 0 || isNaN(priceValue)) {
        setPriceIsValid(false);
        setError('Price must be greater than 0.');
      } else {
        setPriceIsValid(true);
        setError('');
      }

      setProduct((prevProduct) => ({
        ...prevProduct,
        price: priceValue,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if price is valid
    if (product.price <= 0 || isNaN(product.price)) {
      setError('Price must be greater than 0.');
      setPriceIsValid(false);
      return; // Prevent form submission if price is invalid
    } else {
      setError('');
      setPriceIsValid(true);
    }

    if (editingProduct) {
      onUpdateProduct(product); // Update existing product
    } else {
      onAddProduct(product); // Add new product
    }

    setProduct({ id: '', name: '', price: 0, category: '' }); // Reset the form
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingProduct ? 'Update Product' : 'Add Product'}</h2>
      
      <label>Name</label>
      <input
        type="text"
        name="name"
        value={product.name}
        onChange={handleChange}
        required
      />
      
      <label>Price</label>
      <input
        type="number"
        name="price"
        value={product.price}
        onChange={handlePriceChange} // Handle price change separately
        required
        className={priceIsValid ? '' : 'input-error'} // Add error class if invalid
      />
      
      {error && <p className="error-message">{error}</p>} {/* Display error if price is invalid */}
      
      <label>Category</label>
      <input
        type="text"
        name="category"
        value={product.category}
        onChange={handleChange}
      />
      
      <button
        type="submit"
        className={editingProduct ? 'update-button' : 'add-button'}
      >
        {editingProduct ? 'Update' : 'Add'}
      </button>
      
      {editingProduct && (
        <button type="button" className="cancel-button" onClick={onCancelEdit}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default ProductForm;
