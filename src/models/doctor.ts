import { UserModel } from './user';
import { ManagerModel } from './manager';
import { TypeModel } from './type';
export interface DoctorModel {
  id?: number;
  firstName?: string;
  lastName?: string;
  typeId?: number;
  type?: TypeModel;
  cin?: string;
  cnss?: string;
  email?: string;
  phone?: string;
  creditLimit?: string;
  registerationNumber?: string;
  affiliateNumber?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  description?: String;
  balanced?: number;
  doctorId?: number;
  status?:String,
  createdBy?:UserModel,
  createdDate?:Date,
  modifiedBy?:UserModel,
  modifiedDate?:Date
}
