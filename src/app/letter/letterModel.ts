export enum LetterStates { 
    BeforeCheck,
    WrongLetter,
    RightLetterWrongPlace,
    RightLetterRightPlace,
    Empty
  };
  
export class Letter { 
  value: string = '';
  state = LetterStates.Empty;
    toString: any;
}

Letter.prototype.toString = function letterToString() {return `${this.value}`;};