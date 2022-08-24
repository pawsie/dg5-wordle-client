import {gql} from 'apollo-angular'

export const GET_ALL_WORDS = gql`
  query {
    allWords 
  }
`

export const CHECK_WORD = gql`
  query CheckWord($word: String!) {
    checkWord(word: $word) {
      isWordInDictionary
      letterStates
    }
  }
`

export const GET_ANSWER = gql`
  query {
    gameWord
  }
`