import { Component, Input, OnInit } from '@angular/core';
import { Letter, LetterStates } from './letterModel';


@Component({
  selector: 'app-letter',
  templateUrl: './letter.component.html',
  styleUrls: ['./letter.component.scss']
})
export class LetterComponent implements OnInit {

  @Input() letter !: Letter;
  
  constructor() { }

  ngOnInit(): void {
  }

  
  getStyle(){
    var colors = getColors(this.letter.state);
    return {'color': colors.color, 'background-color': colors['background-color'], 'border-color': colors['border-color']};
  }
  
}

function getColors(letterState: LetterStates){
  
  var textColor = 'white';
  var backgroundColor = 'white';
  var borderColor = 'gray';

  switch (letterState){
    case LetterStates.BeforeCheck:
      textColor = 'black';
      backgroundColor = 'white';
      borderColor = 'gray';
      break;
    case LetterStates.RightLetterRightPlace:
      backgroundColor = '#6aaa64';
      borderColor = '#6aaa64';
      break;
    case LetterStates.RightLetterWrongPlace:
      backgroundColor = '#c9b458';
      borderColor = '#c9b458';
      break;
    case LetterStates.WrongLetter:
      backgroundColor = 'gray';
      borderColor = 'gray';
      break;  
  }
  
  return {'color': textColor, 'background-color': backgroundColor, 'border-color': borderColor};

}