import {gql} from 'apollo-angular'

const GET_ALL_WORDS = gql`
  query {
    allWords 
  }
`

export { GET_ALL_WORDS }