import { Component, HostListener, QueryList, ViewChildren } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_ALL_WORDS } from './graphql/graphql.queries';
import { LetterStates } from './letter/letterModel';
import { WordComponent } from './word/word.component';
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

  }

  @ViewChildren('appword') wordComponents !: QueryList<WordComponent>;
  
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

        if (this.isWordInDictionary()) this.goToNextWord();
        else this.stayAtCurrentWord();
   }

  }

  isWordInDictionary(): boolean{
    var word = this.getCurrentWord();
    return this.allWords.includes(this.getCurrentWord().toLowerCase());    
  }

  goToNextWord(){
    this.wordComponents.toArray()[this.wordIndex].flip();

    this.words[this.wordIndex].letters[0].state = LetterStates.RightLetterRightPlace;
    this.words[this.wordIndex].letters[1].state = LetterStates.RightLetterWrongPlace;
    this.words[this.wordIndex].letters[2].state = LetterStates.WrongLetter;
    this.words[this.wordIndex].letters[3].state = LetterStates.RightLetterRightPlace;
    this.words[this.wordIndex].letters[4].state = LetterStates.RightLetterWrongPlace;

    this.wordIndex += 1;
    this.letterIndex = 0;
  }

  stayAtCurrentWord(){
    this.wordComponents.toArray()[this.wordIndex].shake();
  }


  resetWords(){
    for (var i = 0; i < this.wordCount; i++){
      this.words[i] = new Word();
    }
  }

  getCurrentWord(){
    return this.words[this.wordIndex].letters.join('');    
  }
}
