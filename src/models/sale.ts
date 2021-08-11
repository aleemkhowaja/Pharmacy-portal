import { UserModel } from './user';
import { TransactionModel } from './transaction-details';
import { ClientModel } from './client';
export interface SaleModel {

    id?: number;
    transactionNumber?: string;
    customer?: ClientModel;
    customerName?: string;
    transDate?: Date;
    createdDate?: Date;
    modifiedDate?: Date;
    amount?: number;
    quantity?: number;
    transStatus?: string;
    reference?: string;
    isDelivered?: boolean;
    type?: string;
    paymentMethod?: number;
    customerId?: number;
    saledproductDetails?: string;
    transactionDetails?: TransactionModel;
    createdBy?: UserModel;
    modifiedBy?: UserModel;

    // sale quantity details
    unitQuantity?: number;
    unitPrice?: number;
    discount?: number;
    remUG?: number;
    available?: number;
    discountType?: number;
    basisOfReimbursement?: number;
    rateOfReim?: number;
    expiryDate?: Date;

    applyTo?: number;
    percentage?: number;
    dicountAmount?: number;
    amountAfterDiscount?: number;
    totalAfterDiscount?: number;


    // Quote
    isQuote?: boolean;

  }
