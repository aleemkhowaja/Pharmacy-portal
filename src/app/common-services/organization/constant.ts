import gql from 'graphql-tag'

export const ALL_ORGANZATION_URL = gql`
query{
    getAllOrganizations{
        id,
        name
    }
}
`;