export interface ProductModel {
    id?: number;
    product?: string,
    status?: string,
    name?: string;
    category?: string;
    pharmaceuticalForm?: string;
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
    isRefundable?: string,
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
    description?: string
  }
  