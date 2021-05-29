import gql from 'graphql-tag'

export const ALL_SUPPLIER_URL = gql`
query($pageNumber: Int!, $pageSize: Int!, $sortOrder : String!, $sortBy : String!, $lastName: String,
      $telephone : String, $city : String) {
        getAllSuppliers(pageNumber : $pageNumber, pageSize: $pageSize, sortOrder: $sortOrder, sortBy: $sortBy, 
            filter:{ lastName : $lastName,phone : $telephone,city : $city}) {
        id,
        lastName,
        email,
        phone,
        fax,
        website,
        city,
        postalCode,
        country{
            id,
            name
        }
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

export const SAVE_SUPPLIER_URL = gql`mutation($id : ID, $country : ID, $lastName : String, $email : String!,
    $phone : String, $fax : String, $website : String, $address: String, $city : String,
    $postalCode : String, $description : String, $createdBy : String, $modifiedBy : String
    ){
        save(input: {
        id : $id
        lastName: $lastName,
        email: $email,
        phone: $phone,
        fax: $fax,
        website: $website,
        address: $address,
        city: $city,
        postalCode: $postalCode,
        country: {
            id: $country
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
gql`query($suplierId: ID!){
  customerById(id: $suplierId){
    id,
    lastName,
    email,
    phone,
    fax,
    website,
    city,
    postalCode,
    country{
        id,
        name
    }
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

export const UPDATE_SUPPLIER_URL = gql`mutation($id : ID!,$country : ID, $lastName : String, $email : String!,
    $phone : String, $fax : String, $website : String, $address: String, $city : String,
    $postalCode : String, $description : String, $balance : Int, $modifiedBy : String
  ){
    updateCustomer(id: $id, input: {
        lastName: $lastName,
        email: $email,
        phone: $phone,
        fax: $fax,
        website: $website,
        address: $address,
        city : $city
        postalCode: $postalCode,
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


