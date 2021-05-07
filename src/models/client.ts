import { ManagerModel } from './manager';
import { TypeModel } from './type';
import { OrganizationModel } from './organization';
import { CountryModel } from './country';
export interface ClientModel {
  id?: number;
  customerId?: number;
  manager?: ManagerModel;
  firstName?: string;
  lastName?: string;
  type?: TypeModel;
  cin?: string;
  cnss?: string;
  email?: string;
  phone?: string;
  creditLimit?: string;
  organization?: OrganizationModel;
  registerationNumber?: string;
  affiliateNumber?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  country?: CountryModel;
  description?: String;
  balanced?: number;
  doctorId?: number;
}
