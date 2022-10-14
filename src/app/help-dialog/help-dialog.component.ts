import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { LetterStates } from '../letter/letterModel';
import { Word } from '../word/wordModel';

@Component({
  selector: 'app-help-dialog',
  templateUrl: './help-dialog.component.html',
  styleUrls: ['./help-dialog.component.scss']
})
export class HelpDialogComponent implements OnInit {

  wordGames: Word = new Word();
  wordHotel: Word = new Word();
  wordClick: Word = new Word();

  constructor(
    public dialogRef: MatDialogRef<HelpDialogComponent>) { }
  
    onClose(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    // initialize to BeforeCheck so the flip animation will take place
    for (var i = 0; i < 5; i++){
      this.wordGames.letters[i].state = LetterStates.BeforeCheck;
      this.wordHotel.letters[i].state = LetterStates.BeforeCheck;
      this.wordClick.letters[i].state = LetterStates.BeforeCheck;
    }
  }

  ngAfterViewInit(): void {
    // set these after view init so that the flip animation will take place
    this.initWords(); 
  }

  initWords() {
    this.wordGames.letters[0].value = 'G';
    this.wordGames.letters[1].value = 'A';
    this.wordGames.letters[2].value = 'M';
    this.wordGames.letters[3].value = 'E';
    this.wordGames.letters[4].value = 'S';
    this.wordGames.letters[0].state = LetterStates.RightLetterRightPlace;

    this.wordHotel.letters[0].value = 'H';
    this.wordHotel.letters[1].value = 'O';
    this.wordHotel.letters[2].value = 'T';
    this.wordHotel.letters[3].value = 'E';
    this.wordHotel.letters[4].value = 'L';
    this.wordHotel.letters[1].state = LetterStates.RightLetterWrongPlace;

    this.wordClick.letters[0].value = 'C';
    this.wordClick.letters[1].value = 'L';
    this.wordClick.letters[2].value = 'I';
    this.wordClick.letters[3].value = 'C';
    this.wordClick.letters[4].value = 'K';
    this.wordClick.letters[3].state = LetterStates.WrongLetter;
  }
}
