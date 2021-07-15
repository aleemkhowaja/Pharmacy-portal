import gql from 'graphql-tag';

export const ALL_TRANSACTION_URL = gql`
query
    ($pageNumber: Int!, $pageSize: Int!, $sortOrder : String!, $sortBy : String!, $transactionNumber : String, 
    $customerName : String, $amount : BigDecimal, $transType : String) 
    {

        getAllTransaction(pageNumber : $pageNumber, pageSize: $pageSize, sortOrder: $sortOrder, sortBy: $sortBy, 
            filter:{transactionNumber : $transactionNumber, type :  $transType, customer:{lastName : $customerName}, amount : $amount}) 
    {
    id,
    customer{
            id,
            lastName
        },
        transactionNumber,
        transDate,
        amount,
        quantity,
        transStatus,
        reference,
        isDelivered,
        type,
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
}
`;

export const SAVE_PURCHASE = gql`mutation($product : ID, $provider : ID){
      createPurchase(input: {
        product: {
          id: $product
        },
        provider: {
            id: $provider
        }
      }){
        id
      }
}`;

export const ALL_PURCHASE = gql`
query {
  getAllPurchases {
        id,
        could,
        avail,
        total,
        createdDate,
        deliveryReference,
        transactionNumber,
        product{
            id,
            name,
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
            provider{
                id,
                name,
                phone
            }
        },
        provider{
            id,
            name,
            phone
        }
  }
}
`;

export const ALL_PROVIDER = gql`
query {
  getAllProviders {
        id,
        name,
        phone,
        products{
            id,
            name,
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
            provider{
                id,
                name
            }
        }
  }
}
`;

export const ALL_PRODUCT = gql`
query($pageNumber: Int!, $pageSize: Int!, $sortOrder : String!, $sortBy : String!, $name: String,
      $barCode : String, $barCode2 : String, $laboratory : String, $subRange : String, $productTable : String,
       $ppv : String, $pph : String, $category: ID, $dci : ID, $pharmaceuticalForm: ID) {
        getAllProducts(pageNumber : $pageNumber, pageSize: $pageSize, sortOrder: $sortOrder, sortBy: $sortBy,
            filter:{lastName : $name,barCode : $barCode, barCode2 : $barCode2, laboratory : $laboratory, subRange : $subRange, productTable : $productTable,
             ppv : $ppv, pph : $pph, category:{id :$category}, dci:{id :$dci}, pharmaceuticalForm:{id :$pharmaceuticalForm}}) {
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
        provider{
          id,
          name
        }
  }
}
`;
