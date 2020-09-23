/**
 * This file contains helper functions for the App
 * Simple business logics for manipulating data
 */

export const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const authService = () => {
  // @TODO:: Implement authentication services
};
