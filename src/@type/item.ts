export type ItemType = 'material' | 'sercice';

export type Item = {
  id: string;
  images: string[];
  name: string;
  price: number;
  code: string;
  sku: string;
};

export type CreateItem = {
  id: string;
  name: string;
  price: number;
  color: string;
  size: string;
  quantity: number;
};

export type ItemState = {
  isLoading: boolean;
  error: Error | string | null;
  items: Item[];
  item: Item | null;
  sortBy: string | null;
  filters: {
    name: string;
    stock: number | null;
  };
};

export type ProductFilter = {
  name: string;
  stock: number;
};

export type ItemOption = {
  value: string;
  label: string;
};

