export interface StockModel {
  id?: number;
  product?: string;
  inStore?: number;
  reserved?: number;
  available?: number;
  orders?: number;
  pph?: number;
  ppv?: number;
  zone?: string;
  expirationDate?: string;
  barCode?: string,
  barCode2?: string
}
