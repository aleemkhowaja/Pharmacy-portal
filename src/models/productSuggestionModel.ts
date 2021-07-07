import { CategoryModel } from "./category";
import { DciModel } from "./dci";
import { PharmaceuticalFormModel } from "./pharmaceuticalFormModel";
import { TherapeuticClassModel } from "./therapeuticClass";
import { RangeModel } from "./range";
export interface ProductSuggestionModel {
    id?: number;
    status?: string,
    lastName?: string;
    category?: CategoryModel;
    categoryId?:number;
    pharmaceuticalForm?: PharmaceuticalFormModel;
    pharmaceuticalId?:number;
    ppv?: number;
    pph?: number;
    barcode?: string;
    barcode2?: string;
    zone?: boolean;
    zonee?:string;
    active?: boolean;
    activee?:string;
    laboratory?: string;
    dci?: DciModel;
    therapeuticClass?: TherapeuticClassModel,
    therapeuticClassId?:number,
    galenicForm?: string
    range?: RangeModel,
    subRange?: string,
    productTable?: string,
    prescriptionRequired?: boolean,
    marketProduct?: boolean,
    vatOnPurchase?: string,
    vatOnSales?: string,
    isRefundable?: string,
    reimbursementBasis?: string,
    presentation?: string,
    excipients?: string,
    dosageForAdults?: string, 
    dosageForChildren?:string, 
    indications?: string,
    drivingContraindications?: string,
    breastFeedingContraindications?: string,
    pregnancyContraindications?: string,
    productLabReference?: string,
    conditioning?: string,
    packaging?: string,
    monograph?: string,
    description?: string,
    nameOrBarcode?: string,
    product?: string,
  }
  