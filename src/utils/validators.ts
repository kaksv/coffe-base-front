import { CoffeeFormData, FormErrors } from '../types';

export const validateForm = (data: CoffeeFormData): FormErrors => {
  const errors: FormErrors = {};

  // Name validation
  if (!data.name.trim()) {
    errors.name = 'Name is required';
  } else if (data.name.length > 50) {
    errors.name = 'Name must be less than 50 characters';
  }

  // Memo validation
  if (data.memo.length > 200) {
    errors.memo = 'Memo must be less than 200 characters';
  }

  // Amount validation
  if (!data.amount) {
    errors.amount = 'Amount is required';
  }
  //  else if (data.amount < 1) {
  //   errors.amount = 'Amount must be at least $1';
  // } 
  // else if (data.amount > 1000) {
  //   errors.amount = 'Amount must be less than $1000';
  // }

  return errors;
};

export const getCoffeeSize = (amount: number): 'small' | 'medium' | 'large' => {
  if (amount < 0.01) return 'small';
  if (amount < 0.1) return 'medium';
  return 'large';
};