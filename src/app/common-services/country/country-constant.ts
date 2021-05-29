import gql from 'graphql-tag'

export const ALL_COUNTRY_URL = gql`
query{
    getAllCountries{
        id,
        name
    }
}
`;