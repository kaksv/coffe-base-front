export interface CoffeeFormData {
  name: string;
  memo: string;
  amount: number;
}

export interface FormErrors {
  name?: string;
  memo?: string;
  amount?: string;
}

export type CoffeeSize = 'small' | 'medium' | 'large';