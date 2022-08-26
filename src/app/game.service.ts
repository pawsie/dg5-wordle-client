import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { CHECK_WORD, GET_ANSWER, START_GAME } from './graphql/graphql.queries';
import { Word, WordState } from './word/wordModel';

export enum GameStatus { 
  BeforeStart,
  InProgress,
  Complete
};

@Injectable({
  providedIn: 'root'
})
export class GameService {
  
  gameState = GameStatus.BeforeStart;

  constructor(private apollo: Apollo) { }

  async startGame(): Promise<any>{
        
    const result = await this.apollo.client
    .mutate<any>(
      { mutation: START_GAME  }
    )    

    this.gameState = result.data.startGame.gameState;
    console.log(result.data);
    return result.data;
  }

  endGame() {
    this.gameState = GameStatus.Complete;
  }
  
   async checkWord(word: Word): Promise<WordState>{

    const wordString = this.getWordString(word);    
    const result = await this.checkWordQuery(wordString);    
    if (result.isWordInList){ 
      word.letters.forEach((letter, i) => {
        letter.state = result.letterStates[i];      
      });
    }

    var wordState = WordState.NotInList;
    if (result.isWordCorrect) wordState = WordState.Correct;
    else if (result.isWordInList) wordState = WordState.WrongButInList;

    return wordState;
  }

  async checkWordQuery(word: String): Promise<any>{
        
    const result = await this.apollo.client
    .query<any>({
      query: CHECK_WORD, 
      variables: { word },
    })

    return result.data.checkWord;
  }

  async getAnswer(): Promise<any>{
        
    const result = await this.apollo.client
    .query<any>({
      query: GET_ANSWER
    })

    return result.data.gameWord;   
  }

  getWordString(word: Word){
    return word.letters.join('');
  }

}
