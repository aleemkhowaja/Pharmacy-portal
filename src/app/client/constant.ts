import gql from 'graphql-tag'

export const ALL_CLIENT_URL = gql`
query($pageNumber: Int!, $pageSize: Int!, $sortOrder : String!, $sortBy : String!, $lastName: String,
      $email : String, $phone : String, $cin : String, 
      $cnss : String, $balance : String, $typeId : ID) {
  getAllCustomers(pageNumber : $pageNumber, pageSize: $pageSize, sortOrder: $sortOrder, sortBy: $sortBy, filter:{ lastName : $lastName,
                  email : $email, phone : $phone, cin : $cin, cnss : $cnss, creditLimit : $balance, type:{id :$typeId}}) {
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
        }
        description,
        doctor{
            id,
            firstName   
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


