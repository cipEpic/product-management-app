import React, { useState, useEffect } from 'react';
import './App.css';
import ProductTable from './components/producttable';
import ProductForm from './components/ProductForm';
import { getProducts, saveProducts } from './utils/localStorage';

export interface Product {
  id: string;
  name: string;
  price: number;
  category?: string;
}

function App() {
  const [products, setProducts] = useState<Product[]>([]); // Initial state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Load products from localStorage only once when the app loads
  useEffect(() => {
    const storedProducts = getProducts(); // Get products from localStorage
    if (storedProducts && storedProducts.length > 0) {
      setProducts(storedProducts); // Initialize state with stored data
      console.log("Products loaded from localStorage:", storedProducts);
    }
  }, []); // Empty dependency array ensures this runs only once

  // Save products to localStorage whenever products state changes
  useEffect(() => {
    if (products.length > 0) {
      saveProducts(products);
      console.log("Products saved to localStorage:", products);
    }
  }, [products]); // Dependency array ensures this runs when `products` changes

  const addProduct = (product: Product) => {
    setProducts((prevProducts) => [...prevProducts, product]); // Append product
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    setEditingProduct(null);
  };

  const deleteProduct = (id: string) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
  };

  const startEditing = (product: Product) => {
    setEditingProduct(product);
  };

  const cancelEditing = () => {
    setEditingProduct(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Product Management App</h1>
      </header>
      <main>
        <ProductForm
          onAddProduct={addProduct}
          onUpdateProduct={updateProduct}
          editingProduct={editingProduct}
          onCancelEdit={cancelEditing}
        />
        <ProductTable
          products={products}
          onUpdateProduct={startEditing}
          onDeleteProduct={deleteProduct}
        />
      </main>
    </div>
  );
}

export default App;
