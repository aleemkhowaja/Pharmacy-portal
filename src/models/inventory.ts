export interface InventoryModel {
  id?: number;
  transactionNumber?: string;
  date?: string;
  method?: string;
  galenicForm?: number;
  zone?: string,
  status?: string,
  contains?: string,
  comment?: string,
  totalPPV?: number,
  totalPPH?: number,
  totalDeviation?: number,
  dci?: string,
  barCode?: string,
  products?: any[]
}
