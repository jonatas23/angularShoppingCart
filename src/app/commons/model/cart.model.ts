import {Product} from './product.model';

export interface Carrinho {
  id: number;
  items: CarrinhoItem[];
  totalPrice: number;
}

export interface CarrinhoItem {
  id: number;
  product: Product;
  quantity: number;
}
