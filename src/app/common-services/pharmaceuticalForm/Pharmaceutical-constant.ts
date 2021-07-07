import gql from 'graphql-tag'

export const ALL_PHARMACEUTICAL_URL = gql`
query{
    getAllPharmaceuticalForms{
        id,
        name
    }
}
`;