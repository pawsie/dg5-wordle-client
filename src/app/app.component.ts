import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_ALL_WORDS } from './graphql/graphql.queries';
import { Word } from './word/wordModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  wordCount = 6;
  title = 'dg5-wordle-client';

  allWords!: string[];
  words: Word[] = new Array(this.wordCount);

  constructor(private apollo: Apollo) {

    this.apollo.watchQuery({ query: GET_ALL_WORDS }).valueChanges
      .subscribe(({ data, error }: any) => {
          this.allWords = data.allWords;   
        } 
      );
      
    this.resetWords();

    this.words[0].letters[0].value = 'A';
    this.words[0].letters[1].value = 'B';
    this.words[0].letters[2].value = 'C';
    this.words[0].letters[3].value = 'D';
    this.words[0].letters[4].value = 'E';
    this.words[1].letters[0].value = 'A';
    this.words[1].letters[1].value = 'B';
    this.words[1].letters[2].value = 'C';
    this.words[1].letters[3].value = 'D';
    this.words[1].letters[4].value = 'E';
    this.words[1].letters[0].value = 'A';
    this.words[2].letters[1].value = 'B';
    this.words[3].letters[2].value = 'C';
    this.words[4].letters[3].value = 'D';
    this.words[5].letters[4].value = 'E';

  }

  resetWords(){
    for (var i = 0; i < this.wordCount; i++){
      this.words[i] = new Word();
    }
  }
}
