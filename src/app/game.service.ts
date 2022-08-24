import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { CHECK_WORD, GET_ANSWER } from './graphql/graphql.queries';
import { Word } from './word/wordModel';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  
  constructor(private apollo: Apollo) { }

  async checkWord(word: Word): Promise<Boolean>{

    const wordString = this.getWordString(word);    
    const result = await this.checkWordQuery(wordString);    
    if (result.isWordInDictionary){ 
      word.letters.forEach((letter, i) => {
        letter.state = result.letterStates[i];      
      });
    }
    return result.isWordInDictionary;
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
