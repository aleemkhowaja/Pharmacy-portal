import gql from 'graphql-tag'

export const ALL_SUBRANGE_URL = gql`
query{
    getAllCountries{
        id,
        name
    }
}
`;