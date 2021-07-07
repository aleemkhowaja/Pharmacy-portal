import gql from 'graphql-tag';

export const SAVE_DELIVERY = gql`mutation($product : ID, $provider : ID,$manager : ID, $deadline : Date, 
    $deliveryNoteDate: Date, $deliveryReference: String){
      createDelivery(input: {
        product: {
          id: $product
        },
        provider: {
            id: $provider
        },
        manager: {
            id: $manager
        },
        deliveryReference: $deliveryReference,
        deliveryNoteDate: $deliveryNoteDate,
        deadline: $deadline,
      }){
        id
      }
}`;
export const ALL_DELIVERY = gql`
query {
  getAllDeliveries {
        id,
        total,
        createdDate,
        deliveryReference,
        transactionNumber,
        deliveryNoteDate,
        deadline,
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