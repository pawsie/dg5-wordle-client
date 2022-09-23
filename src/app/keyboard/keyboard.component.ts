import { Component, OnInit } from '@angular/core';

export enum KeyStates { 
  Unused,
  WrongLetter,
  RightLetterWrongPlace,
  RightLetterRightPlace,
};

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit {

  myMap: any;

  // keyMap: Map<string, string> = new Map<string, string>([
  //   ['Q', KeyStates.Unused.valueOf()],
  //   ['W', KeyStates.RightLetterRightPlace.valueOf()],
  //   ['E', KeyStates.RightLetterWrongPlace.valueOf()],
  //   ['R', KeyStates.WrongLetter.valueOf()],
  //   ['T', KeyStates.Unused.valueOf()],
  //   ['Y', KeyStates.Unused.valueOf()],
  //   ['U', KeyStates.Unused.valueOf()],
  //   ['I', KeyStates.Unused.valueOf()],
  //   ['O', KeyStates.Unused.valueOf()],
  //   ['P', KeyStates.Unused.valueOf()],

  //   ['A', KeyStates.Unused.valueOf()],
  //   ['S', KeyStates.RightLetterRightPlace.valueOf()],
  //   ['D', KeyStates.Unused.valueOf()],
  //   ['F', KeyStates.Unused.valueOf()],
  //   ['G', KeyStates.Unused.valueOf()],
  //   ['H', KeyStates.Unused.valueOf()],
  //   ['J', KeyStates.Unused.valueOf()],
  //   ['K', KeyStates.Unused.valueOf()],
  //   ['L', KeyStates.Unused.valueOf()],

  //   ['Z', KeyStates.Unused.valueOf()],
  //   ['X', KeyStates.Unused.valueOf()],
  //   ['C', KeyStates.Unused.valueOf()],
  //   ['V', KeyStates.Unused.valueOf()],
  //   ['B', KeyStates.Unused.valueOf()],
  //   ['N', KeyStates.Unused.valueOf()],
  //   ['M', KeyStates.Unused.valueOf()],
  // ]);
  
  constructor() {     
    
  }

  ngOnInit(): void {
    this.reset();
  }

  // asIsOrder() {
  //   return 1;
  // }

  updateKeyMap(key: string, value: KeyStates){
    switch (key) {
      case 'A':
      case 'B':
      case 'C':
      case 'D':
      case 'E':
      case 'F':
      case 'G':
      case 'H':
      case 'I':
      case 'J':
      case 'K': 
      case 'L': 
      case 'M': 
      case 'N': 
      case 'O': 
      case 'P': 
      case 'Q': 
      case 'R': 
      case 'S': 
      case 'T': 
      case 'U': 
      case 'V':    
      case 'W':    
      case 'X':    
      case 'Y':    
      case 'Z': {
        // Only update the key state if the key state is "upgraded"
        if (value > this.myMap[key]) {
          this.myMap[key] = value;
        }   
        break;
      }
    
      default:
        break;
    }
  }

  getKeyboardStateClassName(keyState: KeyStates): String {
    switch (keyState) {
      case KeyStates.Unused: 
        return '';
      case KeyStates.WrongLetter:
        return 'wrong-letter';
      case KeyStates.RightLetterWrongPlace:
        return 'right-letter-wrong-place';
      case KeyStates.RightLetterRightPlace:
        return 'right-letter-right-place';
    }
  }

  reset() {
    this.myMap = {
      'Q': KeyStates.Unused,
      'W': KeyStates.Unused,
      'E': KeyStates.Unused,
      'R': KeyStates.Unused,
      'T': KeyStates.Unused,
      'Y': KeyStates.Unused,
      'U': KeyStates.Unused,
      'I': KeyStates.Unused,
      'O': KeyStates.Unused,
      'P': KeyStates.Unused,
  
      'A': KeyStates.Unused,
      'S': KeyStates.Unused,
      'D': KeyStates.Unused,
      'F': KeyStates.Unused,
      'G': KeyStates.Unused,
      'H': KeyStates.Unused,
      'J': KeyStates.Unused,
      'K': KeyStates.Unused,
      'L': KeyStates.Unused,
  
      'Z': KeyStates.Unused,
      'X': KeyStates.Unused,
      'C': KeyStates.Unused,
      'V': KeyStates.Unused,
      'B': KeyStates.Unused,
      'N': KeyStates.Unused,
      'M': KeyStates.Unused   
    }
  }
}
