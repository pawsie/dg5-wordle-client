import { Component, HostListener } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_ALL_WORDS } from './graphql/graphql.queries';
import { LetterStates } from './letter/letterModel';
import { Word } from './word/wordModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  wordIndex = 0;
  letterIndex = 0;
  wordCount = 6;
  letterCount = 5;
  blank='';
  title = 'dg5-wordle-client';

  allWords!: string[];
  words: Word[] = new Array(this.wordCount);

  key: any;
  
  constructor(private apollo: Apollo) {

    this.apollo.watchQuery({ query: GET_ALL_WORDS }).valueChanges
      .subscribe(({ data, error }: any) => {
          this.allWords = data.allWords;   
        } 
      );
      
    this.resetWords();

    this.hardCodeSomeWords();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 

    this.key = event.key;

    if ((this.letterIndex >= 0 && this.letterIndex <= this.letterCount) && (event.key == "Backspace")){
      if (this.letterIndex > 0) this.letterIndex -= 1;
      this.words[this.wordIndex].letters[this.letterIndex].value = this.blank;      
    }
    else if (this.letterIndex <= this.letterCount - 1){    
      // if a-z or A-Z
      if (event.keyCode >= 65 && event.keyCode <= 90){
        this.words[this.wordIndex].letters[this.letterIndex].value = event.key.toUpperCase();
        this.letterIndex += 1;        
      }   
    }
    
    if ((this.letterIndex == this.letterCount) && 
      (this.wordIndex < this.wordCount) &&
      (event.key == "Enter")){
      this.wordIndex += 1;
      this.letterIndex = 0;
   }

  }

  hardCodeSomeWords(){
    this.words[5].letters[0].value = 'A';
    this.words[5].letters[1].value = 'B';
    this.words[5].letters[2].value = 'C';
    this.words[5].letters[3].value = 'D';
    this.words[5].letters[4].value = 'E';

    this.words[5].letters[0].state = LetterStates.BeforeCheck;
    this.words[5].letters[1].state = LetterStates.RightLetterRightPlace;
    this.words[5].letters[2].state = LetterStates.RightLetterWrongPlace;
    this.words[5].letters[3].state = LetterStates.WrongLetter;
  }

  resetWords(){
    for (var i = 0; i < this.wordCount; i++){
      this.words[i] = new Word();
    }
  }
}
