import { ProductModel } from 'src/models/product';
export interface TransactionModel {
    id?: Number
    productMode?:ProductModel
    quantity?:Number
  }