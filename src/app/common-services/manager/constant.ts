import gql from 'graphql-tag'

export const ALL_USER_URL = gql`
query{
    getAllManagers{
        id,
        name
    }
}
`;