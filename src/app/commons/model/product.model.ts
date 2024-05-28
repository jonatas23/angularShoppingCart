export interface Product {
  id?: number;
  name: string;
  codigo: number;
  descricao: string;
  quantidade: number;
  valor: number;
}

export class ProductImpl implements Product {
  constructor(
    public name: string = '',
    public codigo: number = 0,
    public descricao: string = '',
    public quantidade: number = 0,
    public valor: number = 0
  ) {}
}
