
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  isService?: boolean;
}

export interface OrderDetails {
  quantity: number;
  mainEngraving: string;
  engraveBackSide: boolean;
  backSideEngraving: string;
  discountCode: string;
}
