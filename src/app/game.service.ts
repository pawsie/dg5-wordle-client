import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { CHECK_LETTERS, GET_ALL_WORDS } from './graphql/graphql.queries';
import { Word } from './word/wordModel';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  
  constructor(private apollo: Apollo) { }

  
  async updateLetterStates(word:Word){

    const wordString = this.getWordString(word);
    
    const result = await this.checkLettersQuery(wordString);
   
    word.letters.forEach((letter, i) => {
      letter.state = result[i];
    });    
    
  }

  async checkLettersQuery(word: String): Promise<number[]>{
        
    const result = await this.apollo.client
    .query<any>({
      query: CHECK_LETTERS, 
      variables: { word },
    })

    console.log(result.data.checkLetters);
    console.log(result.data);

    return result.data.checkLetters;    

        // this.apollo.watchQuery({ query: GET_ALL_WORDS }).valueChanges
    // .subscribe(({ data, error }: any) => {
    //     this.allWords = data.allWords;   
    //   } 
    // );    
   
  }

  getWordString(word: Word){
    return word.letters.join('');
  }

}
