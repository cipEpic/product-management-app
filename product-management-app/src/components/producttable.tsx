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
  
    const goToFirstPage = () => {
      setCurrentPage(1);
    };
  
    const goToLastPage = () => {
      setCurrentPage(totalPages);
    };
  
    // Handle range of page numbers (3 pages max)
    const getVisiblePages = () => {
      const visiblePages = [];
      const range = 3; // Number of visible pages
      const startPage = Math.max(1, currentPage - Math.floor(range / 2));
      const endPage = Math.min(totalPages, startPage + range - 1);
  
      for (let i = startPage; i <= endPage; i++) {
        visiblePages.push(i);
      }
  
      return visiblePages;
    };
  
    const visiblePages = getVisiblePages();
  
    return (
      <div className="product-table-wrapper">
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
                  <td>${product.price}</td>
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
              onClick={goToFirstPage}
              disabled={currentPage === 1}
            >
              First
            </button>
  
            <button
              className="pagination"
              onClick={goToPrevPage}
              disabled={currentPage === 1}
            >
              Prev
            </button>
  
            {visiblePages.map((page) => (
              <button
                key={page}
                className={`pagination ${currentPage === page ? 'active' : ''}`}
                onClick={() => goToPage(page)}
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
  
            <button
              className="pagination"
              onClick={goToLastPage}
              disabled={currentPage === totalPages}
            >
              End
            </button>
          </div>
        )}
      </div>
    );
  };
  

export default ProductTable;
