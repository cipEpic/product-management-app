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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      onUpdateProduct(product); // Update existing product
    } else {
      onAddProduct(product); // Add new product
    }
    setProduct({ id: '', name: '', price: 0, category: '' });
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
        onChange={handleChange}
        required
      />
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
