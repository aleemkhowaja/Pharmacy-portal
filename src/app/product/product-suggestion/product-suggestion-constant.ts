import gql from 'graphql-tag'

export const ALL_PRODUCT_SUGGESTION_URL = gql`
query($pageNumber: Int!, $pageSize: Int!, $sortOrder : String!, $sortBy : String!, $lastName: String,
      $barCode : String, $ppv : String, $dci : ID) {
        getAllProductSuggestions(pageNumber : $pageNumber, pageSize: $pageSize, sortOrder: $sortOrder, sortBy: $sortBy, 
            filter:{lastName : $lastName,barCode : $barCode, ppv : $ppv, dci:{id :$dci}}) {
        id,
        lastName,
        barCode,
        barCode2,
        category{
            id,
            name
        },
        therapeuticClass{
            id,
            name
        },
        pharmaceuticalForm{
            id,
            name
        },
        dci{
            name
        },
        laboratory,
        range1{
            id,
            name
        },
        subRange,
        productTable,
        requiresPrescription,
        productMarket,
        pph,
        ppv,
        vatOnPurchase,
        vatOnSale,
        isRefundable,
        basisOfReimbursement,
        presentation,
        excipients,
        adultDosage,
        dosageForChildren,
        indications,
        contraindicationDriving,
        breastFeedingContraindication,
        pregnancyContraindication,
        productLabReference,
        conditioning,
        monoGraph,
        description,
        count,
        status,
        createdBy {
            id,
            firstName
        },
        createdDate,
        modifiedBy{
            id,
            firstName
        },
        modifiedDate
  }
}`;

export const GET_PRODUCT_SUGGESTION_BY_ID =
    gql`query($productId: ID!){
      ProductSuggestionById(id: $productId){
        id,
        lastName,
        barCode,
        barCode2,
        category{
            id,
            name
        },
        therapeuticClass{
            id,
            name
        },
        pharmaceuticalForm{
            id,
            name
        },
        dci{
            name
        },
        laboratory,
        range1{
            id,
            name
        },
        subRange,
        productTable,
        requiresPrescription,
        productMarket,
        pph,
        ppv,
        vatOnPurchase,
        vatOnSale,
        isRefundable,
        basisOfReimbursement,
        presentation,
        excipients,
        adultDosage,
        dosageForChildren,
        indications,
        contraindicationDriving,
        breastFeedingContraindication,
        pregnancyContraindication,
        productLabReference,
        conditioning,
        monoGraph,
        description,
        count,
        status,
        createdBy {
            id,
            firstName
        },
        createdDate,
        modifiedBy{
            id,
            firstName
        },
        modifiedDate
  }
}`;

export const SAVE_PRODUCT_SUGGESTION_URL = gql`mutation(
    $lastName : String, 
    $barCode : String, 
    $barCode2 : String, 
    $categoryId : ID,
      $therapeuticClassId : ID, 
      $pharmaceuticalFormId : ID, 
      $dciId : ID, 
      $laboratory : String, 
      $range : ID,
      $subRange : String, 
      $productTable : String, 
      $requiresPrescription : Boolean, 
      $productMarket : Boolean, 
      $pph : String,
      $ppv : String, 
      $vatOnPurchase : String, 
      $vatOnSale : String, 
      $isRefundable : Boolean, 
      $basisOfReimbursement : String,
      $presentation : String, 
      $excipients : String, 
      $adultDosage : String, 
      $dosageForChildren : String, 
      $indications : String,
      $contraindicationDriving : String, 
      $breastFeedingContraindication : String, 
      $pregnancyContraindication : String,
      $productLabReference : String, 
      $conditioning : String, 
      $monoGraph : String, 
      $description : String, 
      $createdBy : String,
      $modifiedBy : String
      ){
        createProductSuggestion(input: {
            lastName: $lastName,
            barCode: $barCode,
            barCode2: $barCode2, 
            category: {
              id: $categoryId
          },
          therapeuticClass: {
            id : $therapeuticClassId
            },
            pharmaceuticalForm: {
            id : $pharmaceuticalFormId
            },
            dci: {
                id: $dciId
            },   
            laboratory: $laboratory,
            
            range1: {
              id: $range
          },
          subRange: $subRange,
          productTable: $productTable,
          requiresPrescription: $requiresPrescription,
          productMarket: $productMarket,
          pph: $pph,
          ppv: $ppv,
          vatOnPurchase : $vatOnPurchase,
          vatOnSale: $vatOnSale,
          isRefundable: $isRefundable,
          basisOfReimbursement: $basisOfReimbursement,
          presentation: $presentation,
          excipients: $excipients,
          adultDosage: $adultDosage,
          dosageForChildren: $dosageForChildren,
          indications: $indications,
          contraindicationDriving: $contraindicationDriving,
          breastFeedingContraindication: $breastFeedingContraindication,
          pregnancyContraindication: $pregnancyContraindication,
          productLabReference: $productLabReference,
          conditioning: $conditioning,
          monoGraph: $monoGraph,
          description: $description,
          createdBy : {
            username : $modifiedBy
          },
          createdBy : {
              username : $createdBy
            },
          modifiedBy : {
            username : $modifiedBy
          }
    
        }){
            id
        }
    }`;

export const UPDATE_PRODUCT_SUGGESTION_URL = gql`mutation($id : ID!, $name : String, $barCode : String, $barCode2 : String, $categoryId : ID!,
      $therapeuticClassId : ID, $pharmaceuticalFormId : ID!, $dciId : ID!, $laboratory : String, $range : ID!,
      $subRange : String, $productTable : String, $requiresPrescription : String, $productMarket : String, $pph : String,
      $ppv : String, $vatOnPurchase : String, $vatOnSale : String, $isRefundable : String, $basisOfReimbursement : String,
      $presentation : String, $excipients : String, $adultDosage : String, $dosageForChildren : String, $indications : String,
      $contraindicationDriving : String, $breastFeedingContraindication : String, $pregnancyContraindication : String,
      $productLabReference : String, $conditioning : String, $monoGraph : String, $description : String, $modifiedBy : String
      ){
        updateProductSuggestion(id: $id, input: {
            name: $name,
            barCode: $barCode,
            barCode2: $barCode2, 
            category: {
              id: $categoryId
          },
          therapeuticClass: {
            id : $therapeuticClassId
            },
            pharmaceuticalForm: {
            id : $pharmaceuticalFormId
            },
            dci: {
                id: $dciId
            },   
            laboratory: $laboratory,
            
            range1: {
              id: $range
          },
          subRange: $subRange,
          productTable: $productTable,
          requiresPrescription: $requiresPrescription,
          productMarket: $productMarket,
          pph: $pph,
          ppv: $ppv,
          vatOnPurchase : $vatOnPurchase,
          vatOnSale: $vatOnSale,
          isRefundable: $isRefundable,
          basisOfReimbursement: $basisOfReimbursement,
          presentation: $presentation,
          excipients: $excipients,
          adultDosage: $adultDosage,
          dosageForChildren: $dosageForChildren,
          indications: $indications,
          contraindicationDriving: $contraindicationDriving,
          breastFeedingContraindication: $breastFeedingContraindication,
          pregnancyContraindication: $pregnancyContraindication,
          productLabReference: $productLabReference,
          conditioning: $conditioning,
          monoGraph: $monoGraph,
          description: $description,
          createdBy : {
            username : $modifiedBy
          },
          modifiedBy : {
            username : $modifiedBy
          }
    
        }){
            id
        }
    }`;