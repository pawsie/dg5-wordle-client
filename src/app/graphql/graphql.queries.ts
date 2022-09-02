import {gql} from 'apollo-angular'

export const GET_ALL_WORDS = gql`
  query {
    allWords 
  }
`

export const CHECK_WORD = gql`
  query CheckWord($word: String!) {
    checkWord(word: $word) {
      isWordInList
      isWordCorrect
      letterStates
    }
  }
`

// export const GET_ANSWER = gql`
//   query {
//     gameWord
//   }
// `

export const START_GAME = gql`
  mutation StartGame {
    startGame{
      gameState
      gameWord
      success      
    }
  }
`;