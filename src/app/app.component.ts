import { Component, HostListener, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { GameService, GameStatus } from './game.service';
import { GET_ALL_WORDS } from './graphql/graphql.queries';
import { LetterStates } from './letter/letterModel';
import { WordComponent } from './word/word.component';
import { Word, WordState } from './word/wordModel';

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
    
    this.resetWords();
    this.gameService = game;
    
    this.showStart();


  }

  ngOnInit() {
    this.toastrService.overlayContainer = this.toastContainer;
  }

  showStart() {
    this.toastrService.show('Start now', '', {
      disableTimeOut: true,
      tapToDismiss: true,
      closeButton: false
    })
      .onTap
      .subscribe(() => this.showStartClickedHandler());
  }
  
  showStartClickedHandler() {
    console.log('showStart clicked');
    this.gameService.startGame();
  }

  showSuccess() {
    this.toastrService.success('Awesome!', '', {
      disableTimeOut: true,
      tapToDismiss: true,
      closeButton: true
    }).onHidden
    .subscribe(() => this.showSuccessClickedHandler());
  }
  showSuccessClickedHandler() {
    console.log('showStart clicked');
    this.resetGame();
  }

  showNotInList() {
    this.toastrService.info('Not in list', '', {
      timeOut: 1500,
    });
  }

  @ViewChildren('appword') wordComponents !: QueryList<WordComponent>;
  @ViewChild(ToastContainerDirective, { static: true })
  toastContainer!: ToastContainerDirective;
  
  @HostListener('document:keydown', ['$event'])
  async handleKeyboardEvent(event: KeyboardEvent): Promise<void> { 

    this.key = event.key;

    if (this.gameService.gameState == GameStatus.InProgress)
    {
      if ((this.letterIndex >= 0 && this.letterIndex <= this.letterCount) && (event.key == "Backspace")){
        if (this.letterIndex > 0) this.letterIndex -= 1;
        this.words[this.wordIndex].letters[this.letterIndex].value = this.blank;
        this.words[this.wordIndex].letters[this.letterIndex].state = LetterStates.Empty;
      }
      else if (event.key == "1"){
        this.answer = await (await this.gameService.getAnswer()).toString();
      }
      else if (this.letterIndex <= this.letterCount - 1){    
        // if a-z or A-Z
        if (event.keyCode >= 65 && event.keyCode <= 90){
          this.words[this.wordIndex].letters[this.letterIndex].value = event.key.toUpperCase();
          this.words[this.wordIndex].letters[this.letterIndex].state = LetterStates.BeforeCheck;
          this.letterIndex += 1;        
        }   
      }
      
      if ((this.letterIndex == this.letterCount) && 
        (this.wordIndex < this.wordCount) &&
        (event.key == "Enter")){
          
        var wordState = await this.gameService.checkWord(this.words[this.wordIndex]);
        switch (wordState) {
          case WordState.Correct:
            this.wordCorrect();
            break;
          case WordState.NotInList:
            this.wordNotInList();
            break;
          case WordState.WrongButInList:
            this.goToNextWord();        
            break;
        }
      }  
    }
  }

  async wordCorrect(){
    this.wordComponents.toArray()[this.wordIndex].jump();
    await this.delay(2500);
    this.showSuccess();
    this.gameService.endGame();
  }

  goToNextWord(){
    this.wordComponents.toArray()[this.wordIndex].flip();

    this.wordIndex += 1;
    this.letterIndex = 0;
  }

  wordNotInList(){
    this.wordComponents.toArray()[this.wordIndex].shake();
    this.showNotInList();
  }

  getCurrentWord(){
    return this.words[this.wordIndex].letters.join('');
  }

  resetGame(){
    this.gameService.startGame();
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

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}
