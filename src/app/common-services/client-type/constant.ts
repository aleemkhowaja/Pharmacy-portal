import gql from 'graphql-tag'

export const ALL_TYPE_URL = gql`
query{
    getAllTypes{
        id,
        name
    }
}
`;