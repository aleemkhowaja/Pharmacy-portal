import gql from 'graphql-tag'

export const ALL_THERAPEUTICCLASSES_URL = gql`
query{
    getAllTherapeuticClasses{
        id,
        name
    }
}
`;