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

  // Handling page range (3 pages max + next/prev + ...)
  const pageNumbers: (number | string)[] = []; // Include type (number | string)
  const pageRange = 3; // Maximum visible page numbers

  // Add first and last page
  if (totalPages > pageRange) {
    pageNumbers.push(1);
  }

  // Add pages around the current page
  for (let i = 1; i <= totalPages; i++) {
    if (
      i <= pageRange || 
      i === currentPage || 
      i === currentPage - 1 || 
      i === currentPage + 1 || 
      i === totalPages
    ) {
      if (!pageNumbers.includes(i)) {
        pageNumbers.push(i);
      }
    }
  }

  // Add ellipsis if needed
  if (pageNumbers[pageNumbers.length - 1] !== totalPages) {
    pageNumbers.push('...');
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
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
                  <button
                    className="edit-button"
                    onClick={() => onUpdateProduct(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => onDeleteProduct(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No products available.</p>
      )}
      
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pagination-container">
          <button 
            className="pagination" 
            onClick={goToPrevPage} 
            disabled={currentPage === 1}
          >
            Prev
          </button>

          {pageNumbers.map((page, index) => (
            <button
              key={index}
              className={`pagination ${currentPage === page ? 'active' : ''}`}
              onClick={() => {
                if (typeof page === 'number') {
                  goToPage(page);
                }
              }}
            >
              {page}
            </button>
          ))}

          <button
            className="pagination"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductTable;
