import React, { useState } from 'react';
import { Product } from '../App';

interface ProductTableProps {
  products: Product[];
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
}


const ProductTable: React.FC<ProductTableProps> = ({
  products,
  onUpdateProduct,
  onDeleteProduct,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  // Pagination calculations
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h2>Product List</h2>
      {products.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>
                  <button onClick={() => onUpdateProduct(product)}>Edit</button>
                  <button onClick={() => onDeleteProduct(product.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No products available.</p>
      )}
      {/* Pagination Controls */}
      {products.length > productsPerPage && (
        <div>
          {[...Array(totalPages)].map((_, idx) => (
            <button key={idx} onClick={() => goToPage(idx + 1)} disabled={currentPage === idx + 1}>
              {idx + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};


export default ProductTable;
