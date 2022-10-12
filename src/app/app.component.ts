import { Component, HostListener, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Apollo } from 'apollo-angular';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { GameService, GameStatus } from './game.service';
import { GET_ALL_WORDS } from './graphql/graphql.queries';
import { HelpDialogComponent } from './help-dialog/help-dialog.component';
import { KeyboardComponent, KeyStates } from './keyboard/keyboard.component';
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
  gameService: GameService;
  answer!: string;
  answerDisplayed!: string;
  keyMap : any;
  checkingWord: boolean = false;

  constructor(private apollo: Apollo,
              game: GameService,
              private toastrService: ToastrService,
              private dialog: MatDialog) {
               
    this.apollo.watchQuery({ query: GET_ALL_WORDS }).valueChanges
      .subscribe(({ data, error }: any) => {
          this.allWords = data.allWords;   
        } 
      );
    
    this.resetWords();
    this.gameService = game;
    
    // this.showStart();
    this.openHelpDialog();

  }

  openHelpDialog(): void {
    this.dialog.open(HelpDialogComponent, {
      hasBackdrop: true
    });
  }

  ngOnInit() {
    this.toastrService.overlayContainer = this.toastContainer;
  }

  showStart() {
    this.toastrService.show('Start now!', '', {
      disableTimeOut: true,
      tapToDismiss: true,
      closeButton: false
    })
      .onTap
      .subscribe(() => this.showStartClickedHandler());
  }
  
  async showStartClickedHandler() {
    console.log('showStart clicked');
    this.resetGame();

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
    console.log('showSuccess clicked');
    this.resetGame();
  }

  showNotInList() {
    this.toastrService.info('Not in list', '', {
      timeOut: 1500,
    });
  }

  showAnswer() {
    this.toastrService.show(this.answer, '', {
      disableTimeOut: true,
      tapToDismiss: true,
      closeButton: false
    })
      .onTap
      .subscribe(() => this.showAnswerClickedHandler());
  }

  showAnswerClickedHandler() {
    console.log('showAnswer clicked');
    this.resetGame();
  }

  @ViewChildren('appword') wordComponents !: QueryList<WordComponent>;
  @ViewChildren('appkeyboard') keyboardComponents !: QueryList<KeyboardComponent>;
  @ViewChild(ToastContainerDirective, { static: true })
  toastContainer!: ToastContainerDirective;
  
  @HostListener('document:keydown', ['$event'])
  // physical keyboard keypress
  async handleKeyboardEvent(event: KeyboardEvent): Promise<void> {
    this.onKey(event.key)
  }

  // virtual keyboard keyclick
  onKeyboardClick(key: any){
    this.onKey(key);
  }

  async onKey(key: string){
    if (this.gameService.gameState == GameStatus.InProgress && !this.checkingWord)
    {
      if ((this.letterIndex >= 0 && this.letterIndex <= this.letterCount) && (key == "Backspace" || key == "Back")){
        if (this.letterIndex > 0) this.letterIndex -= 1;
        this.words[this.wordIndex].letters[this.letterIndex].value = this.blank;
        this.words[this.wordIndex].letters[this.letterIndex].state = LetterStates.Empty;
      }
      else if (key == "1"){
        this.answerDisplayed = this.answer;
      }
      else if (key == "2"){        
        this.openHelpDialog();
      }
      else if ((this.letterIndex <= this.letterCount - 1) && (this.wordIndex < this.wordCount)){
        // if a-z or A-Z
        const alphaRegex = new RegExp('^[a-zA-Z]$');
        if (alphaRegex.test(key)){
          this.words[this.wordIndex].letters[this.letterIndex].value = key.toUpperCase();
          this.words[this.wordIndex].letters[this.letterIndex].state = LetterStates.BeforeCheck;
          this.letterIndex += 1;        
        }   
      }
      
      if ((this.letterIndex == this.letterCount) && 
        (this.wordIndex < this.wordCount) &&
        (key == "Enter")){
                    
          this.checkingWord = true;

          var wordState = await this.gameService.checkWord(this.words[this.wordIndex]);
          switch (wordState) {
            case WordState.Correct:
              await this.wordCorrect();
              break;
            case WordState.NotInList:
              this.wordNotInList();
              break;
            case WordState.WrongButInList:
              await this.goToNextWord();     
              break;
          }

          this.checkingWord = false;          
      }  
    }
  }

  async wordCorrect(){
    this.wordComponents.toArray()[this.wordIndex].jump();
    await this.delay(2500);
    this.updateUsedKeys();
    this.showSuccess();
    this.gameService.endGame();
  }

  async goToNextWord(){
    this.wordComponents.toArray()[this.wordIndex].flip();
    await this.delay(1500);

    this.updateUsedKeys();

    this.wordIndex += 1;
    this.letterIndex = 0;

    // didn't manage to guess after max tries
    if (this.wordIndex == this.wordCount){
      this.showAnswer();
    }
  }

  updateUsedKeys(){
    const word = this.words[this.wordIndex]; 
    // update used keys
    for (var i = 0; i < this.letterCount; i++){
      const letter = word.letters[i];
      this.keyboardComponents.first.updateKeyMap(letter.value, this.mapLetterStateToKeyState(letter.state));
    } 
  }

  private mapLetterStateToKeyState(letterState: LetterStates): KeyStates {
    switch (letterState) {
      case LetterStates.RightLetterRightPlace: {
        return KeyStates.RightLetterRightPlace;
      }
      case LetterStates.RightLetterWrongPlace: {
        return KeyStates.RightLetterWrongPlace;
      }
      case LetterStates.WrongLetter: {
        return KeyStates.WrongLetter;
      }
      default: {
        return KeyStates.Unused;
      }
    }
  }

  wordNotInList(){
    this.wordComponents.toArray()[this.wordIndex].shake();
    this.showNotInList();
  }

  getCurrentWord(){
    return this.words[this.wordIndex].letters.join('');
  }

  async resetGame(){
    var result = await this.gameService.startGame();
    this.answer = result.startGame.gameWord;

    this.resetIndices();
    this.resetWords();
    this.resetKeyboard();
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

  resetKeyboard(){
    this.keyboardComponents.first.reset();
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}
