import gql from 'graphql-tag'

export const ALL_CATEGORIES_URL = gql`
query{
    getAllCategories{
        id,
        name
    }
}
`;