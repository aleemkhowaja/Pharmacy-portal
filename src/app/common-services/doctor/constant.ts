import gql from 'graphql-tag'

export const ALL_DOCTORS_URL = gql`
query{
    getAllManagers{
        id,
        name
    }
}
`;