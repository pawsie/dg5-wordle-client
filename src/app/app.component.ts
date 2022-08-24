import { Component, HostListener, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { GameService } from './game.service';
import { GET_ALL_WORDS } from './graphql/graphql.queries';
import { WordComponent } from './word/word.component';
import { Word } from './word/wordModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  wordIndex = 0;
  letterIndex = 0;
  wordCount = 6;
  letterCount = 5;
  blank='';
  title = 'dg5-wordle-client';
  allWords!: string[];
  words: Word[] = new Array(this.wordCount);
  key: any;
  gameService: GameService;
  answer!: string;

  constructor(private apollo: Apollo,
              game: GameService,
              private toastrService: ToastrService) {

    this.apollo.watchQuery({ query: GET_ALL_WORDS }).valueChanges
      .subscribe(({ data, error }: any) => {
          this.allWords = data.allWords;   
        } 
      );
    
    this.gameService = game;
    this.resetWords();

  }

  ngOnInit() {
    this.toastrService.overlayContainer = this.toastContainer;
  }

  showSuccess() {
    this.toastrService.success('Hello world!', 'Toastr fun!');
  }

  @ViewChildren('appword') wordComponents !: QueryList<WordComponent>;
  @ViewChild(ToastContainerDirective, { static: true })
  toastContainer!: ToastContainerDirective;
  
  @HostListener('document:keydown', ['$event'])
  async handleKeyboardEvent(event: KeyboardEvent): Promise<void> { 

    this.key = event.key;

    if ((this.letterIndex >= 0 && this.letterIndex <= this.letterCount) && (event.key == "Backspace")){
      if (this.letterIndex > 0) this.letterIndex -= 1;
      this.words[this.wordIndex].letters[this.letterIndex].value = this.blank;      
    }
    else if (event.key == "1"){
      this.answer = await (await this.gameService.getAnswer()).toString();
    }
    else if (event.key == "2"){
      this.showSuccess();
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
      var isWordInDictionary = await this.gameService.checkWord(this.words[this.wordIndex]);
        if (isWordInDictionary) this.goToNextWord();
        else this.stayAtCurrentWord();
   }

  }

  goToNextWord(){
    this.wordComponents.toArray()[this.wordIndex].flip();

    this.wordIndex += 1;
    this.letterIndex = 0;
  }

  stayAtCurrentWord(){
    this.wordComponents.toArray()[this.wordIndex].shake();
  }

  getCurrentWord(){
    return this.words[this.wordIndex].letters.join('');
  }

  resetGame(){
    this.resetIndices();
    this.resetWords();
  }

  resetIndices(){
    this.wordIndex = 0;
    this.letterIndex = 0;
  }

  resetWords(){
    for (var i = 0; i < this.wordCount; i++){
      this.words[i] = new Word();
    }
  }
}
