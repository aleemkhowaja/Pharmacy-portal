import { UserModel } from './user';
import { TransactionModel } from './transaction-details';
import { ClientModel } from './client';
import { ProductModel } from './product';
export interface PurchaseModel {

  id?: number;
  transactionNumber?: String
  customer?: ClientModel
  customerName?: String
  transDate?: Date
  createdOn?: Date
  amount?: number
  quantity?: Number
  transStatus?: String
  reference?: String
  isDelivered?: Boolean
  type?: String
  paymentMethod?: number
  customerId?: number
  transactionDetails?: TransactionModel
  createdBy?: UserModel

  //purchase quantity details
  unitQuantity?: number
  unitPrice?: number
  discount?: number
  remUG?: number
  available?: number
  discountType?: number
  basisOfReimbursement?: number
  rateOfReim?: number
  expiryDate?: Date

  applyTo?: number


}