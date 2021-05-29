import gql from 'graphql-tag'

export const ALL_PRODUCT_URL = gql`
query($pageNumber: Int!, $pageSize: Int!, $sortOrder : String!, $sortBy : String!, $name: String,
      $barCode : String, $ppv : String, $dci : ID) {
        getAllProducts(pageNumber : $pageNumber, pageSize: $pageSize, sortOrder: $sortOrder, sortBy: $sortBy, 
            filter:{name : $name,barCode : $barCode, ppv : $ppv, dci:{id :$dci}}) {
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

export const SAVE_CLIENT_URL = gql`mutation($manager : ID, $doctor : ID!, $firstName : String, $lastName : String!,
    $type : ID, $cin : String, $cnss : String, $email : String, $phone : String,
    $creditLimit : String, $orgId : ID!, $registerationNumber : String, $affiliateNumber : String, $address : String,
    $city : String, $postalCode : String, $countryId : ID!, $description : String, $createdBy : String
    ){
        createCustomer(input: {
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
gql`query($customerId: ID!){
  customerById(id: $customerId){
    id,
        manager{
            id,
            name
        },
        firstName,
        lastName,
        type{
            id,
            name
        },
        cin,
        cnss,
        email,
        phone,
        creditLimit,
        organization{
            id,
            name
        },
        affiliateNumber,
        address,
        city,
        postalCode,
        country{
            id,
            name
        },
        description,
        doctor{
            id,
            firstName   
        },
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


