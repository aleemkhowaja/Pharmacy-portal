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

export const SAVE_SALE_URL = gql`mutation($quanity : Int,$amount : BigDecimal, $reference : String,
    $isDelivered : Boolean, $type : String, $transStatus : String, $paymentMethod : ID, $customerId : ID, $saledproductDetails : String,$createdBy : String, $modifiedBy : String
    ){
        createTransaction(input: {
        quantity: $quanity,
        amount: $amount,
        transStatus : $transStatus,
        reference: $reference,
        isDelivered: $isDelivered,
        type: $type,
        saledProductDetails : $saledproductDetails,
        paymentMethod: {
            id : $paymentMethod
        },
        customer: {
            id : $customerId
        },
        createdBy: {
            username : $createdBy
        },
        modifiedBy : {
            username : $modifiedBy
        }
    }){
        id
    }
}`;

export const GET_BY_ID =
gql`query($transactionId: ID!){
    transactionById(id: $transactionId){
        id,
        transactionNumber,
        customer{
                id,
                lastName
            },
            transDate,
            amount,
            quantity,
            transStatus,
            reference,
            isDelivered,
            type,
            transactionDetails{
                id,
                product{
                    id,
                    name,
                    vatOnSale,
                    ppv
                },
                quantity,
                discount,
                amountAfterDiscount,
                percentage,
                totalAfterDiscount
            },
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

export const UPDATE_CLIENT_URL = gql`mutation($id : ID!, $manager : ID, $doctor : ID!, $firstName : String, $lastName : String!,
  $type : ID, $cin : String, $cnss : String, $email : String, $phone : String,
  $creditLimit : String, $orgId : ID!, $registerationNumber : String, $affiliateNumber : String, $address : String,
  $city : String, $postalCode : String, $countryId : ID!, $description : String, $modifiedBy : String
  ){
    updateCustomer(id: $id, input: {
        manager: {
          id: $manager
      },
      doctor: {
        id : $doctor
        },
      firstName: $firstName,
      lastName: $lastName,
      type: {
          id: $type
      },
      cin: $cin,
      cnss: $cnss,
      email: $email,
      phone: $phone,
      creditLimit: $creditLimit,
      organization: {
          id: $orgId
      },
      registerationNumber : $registerationNumber
      affiliateNumber: $affiliateNumber,
      address: $address,
      city: $city,
      postalCode: $postalCode,
      country: {
          id: $countryId
      },
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


