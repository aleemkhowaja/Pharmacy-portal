import { RangeModel } from './range';
import { TherapeuticClassModel } from './therapeuticClass';
import { CategoryModel } from 'src/models/category';
import { DciModel } from './dci';
import { PharmaceuticalFormModel } from './pharmaceuticalFormModel';
export interface ProductModel {
    id?: number;
    product?: string,
    status?: string,
    name?: string;
    category?: string;
    pharmaceuticalForm?: string;
    ppu?: number;
    ppv?: number;
    pph?: number;
    barcode?: string;
    barcode2?: string;
    zone?: boolean;
    active?: boolean;
    laboratory?: string;
    dci?: string;
    therapeuticClass?: string,
    galenicForm?: string
    range?: string,
    subRange?: string,
    productTable?: string,
    prescriptionRequired?: boolean,
    marketProduct?: boolean,
    vatOnPurchase?: string,
    vatOnSales?: string,
    isRefundable?: boolean,
    reimbursementBasis?: string,
    presentation?: string,
    excipients?: string,
    dosageForAdults?: string, 
    indications?: string,
    drivingContraindications?: string,
    breastFeedingContraindications?: string,
    pregnancyContraindications?: string,
    productLabReference?: string,
    packaging?: string,
    monograph?: string,
    description?: string,
    nameOrBarcode?: string,
    quantity?:number,
    minStock?:number,
    maxStock?:number
    categoryId?:number
    therapeuticClassId?:number,
    dosageForChildren?:string
    conditioning?: string,
    dciModel?: DciModel
    categoryModel?: CategoryModel;
    therapeuticClassModel?:TherapeuticClassModel
    pharmaceuticalFormModel?:PharmaceuticalFormModel
    rangeModel?:RangeModel

    trDetailsVisible?:Boolean;
    percentage?:Number
    dicountAmount?:Number
    isQuantityCalculatonIgonre?:Boolean
    isDiscountAvaiable?:Boolean

  }
  