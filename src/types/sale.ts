export interface Customer {
  id: string;
  name: string;
  voucher_progress?: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  is_voucherable?: boolean;
  is_returnable?: boolean;
}

export interface SaleItem {
  product_id: string;
  quantity: number;
  is_returned: boolean;
  usar_vale?: boolean;
}
