import gql from 'graphql-tag'

export const ALL_PROVIDER_URL = gql`
query{
    getAllProviders{
        id,
        name,
        phone
    }
}
`;