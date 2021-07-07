import gql from 'graphql-tag'

export const ALL_RANGE_URL = gql`
query{
    getAllRanges{
        id,
        name
    }
}
`;