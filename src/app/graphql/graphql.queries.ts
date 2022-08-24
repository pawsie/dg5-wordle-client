import {gql} from 'apollo-angular'

export const GET_ALL_WORDS = gql`
  query {
    allWords 
  }
`

export const CHECK_LETTERS = gql`
  query CheckLetters($word: String!) {
    gameWord
    gameState
    checkLetters(word: $word)
  }
`