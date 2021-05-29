import gql from 'graphql-tag'

export const ALL_DCI_URL = gql`
query{
    getAllDCI{
        id,
        name
    }
}
`;