import { Product } from '../types/Product';

const PRODUCT_KEY = 'products';

export const getProducts = (): Product[] => {
  const data = localStorage.getItem(PRODUCT_KEY);
  try {
    return data ? JSON.parse(data) : []; // Always return an array
  } catch (error) {
    console.error("Error parsing localStorage data:", error);
    return [];
  }
};

export const saveProducts = (products: Product[]): void => {
  try {
    localStorage.setItem(PRODUCT_KEY, JSON.stringify(products));
  } catch (error) {
    console.error("Error saving data to localStorage:", error);
  }
};
