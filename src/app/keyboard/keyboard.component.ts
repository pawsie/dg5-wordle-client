import { Component, OnInit } from '@angular/core';

export enum KeyStates { 
  Unused,
  WrongLetter,
  RightLetterWrongPlace,
  RightLetterRightPlace,
  Spacer1,
  NonLetter3
};

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit {

  keyMap: Map<string, KeyStates> = new Map<string, KeyStates>([
    ['Q', KeyStates.Unused],
    ['W', KeyStates.Unused],
    ['E', KeyStates.Unused],
    ['R', KeyStates.Unused],
    ['T', KeyStates.Unused],
    ['Y', KeyStates.Unused],
    ['U', KeyStates.Unused],
    ['I', KeyStates.Unused],
    ['O', KeyStates.Unused],
    ['P', KeyStates.Unused],

    ['', KeyStates.Spacer1],
    ['A', KeyStates.Unused],
    ['S', KeyStates.Unused],
    ['D', KeyStates.Unused],
    ['F', KeyStates.Unused],
    ['G', KeyStates.Unused],
    ['H', KeyStates.Unused],
    ['J', KeyStates.Unused],
    ['K', KeyStates.Unused],
    ['L', KeyStates.Unused],

    ['Enter', KeyStates.NonLetter3],
    ['Z', KeyStates.Unused],
    ['X', KeyStates.Unused],
    ['C', KeyStates.Unused],
    ['V', KeyStates.Unused],
    ['B', KeyStates.Unused],
    ['N', KeyStates.Unused],
    ['M', KeyStates.Unused],
    ['Back', KeyStates.NonLetter3],
  ]);
  
  constructor() {     
    
  }

  ngOnInit(): void {
    this.reset();
  }

  asIsOrder() {
    return 1;
  }

  updateKeyMap(key: string, value: KeyStates){
    const newState = this.keyMap.get(key);    
    if (newState != undefined){
      // Only update the key state if the key state is "upgraded"
      if (value > newState) {
        this.keyMap.set(key, value);
      }  
    }
  }

  getKeyboardStateClassName(keyState: KeyStates): String {
    switch (keyState) {
      case KeyStates.Unused: 
        return 'key';
      case KeyStates.WrongLetter:
        return 'key wrong-letter';
      case KeyStates.RightLetterWrongPlace:
        return 'key right-letter-wrong-place';
      case KeyStates.RightLetterRightPlace:
        return 'key right-letter-right-place';
      case KeyStates.Spacer1:
        return 'spacer-1';
      case KeyStates.NonLetter3:
        return 'key non-letter-3';
      default:
        return '';
    }
  }

  reset() {

    const alphaRegex = new RegExp('^[A-Z]$');

    this.keyMap.forEach ((value, key) => {
        if (alphaRegex.test(key)) 
          this.keyMap.set(key, KeyStates.Unused);
      }
    );
    
  }
}
