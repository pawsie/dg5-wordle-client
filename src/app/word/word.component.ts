import { animate, animateChild, keyframes, query, sequence, stagger, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Word } from './wordModel';

const shakeAnimation = [
  animate('0.5s', 
    keyframes([
      style({transform: 'translateX(-10px)', offset: 0}),
      style({transform: 'translateX(20px)', offset: 0.2}),
      style({transform: 'translateX(-20px)', offset: 0.4}),
      style({transform: 'translateX(20px)', offset: 0.6}),
      style({transform: 'translateX(-20px)', offset: 0.8}),
      style({transform: 'translateX(10px)', offset: 1}),
    ])
  )
];

const jumpAnimation = [
  animate('0.5s 1400ms', 
    keyframes([
      style({transform: 'translateY(-20px)', offset: 0}),
      style({transform: 'translateY(-40px)', offset: 0.2}),
      style({transform: 'translateY(-60px)', offset: 0.4}),
      style({transform: 'translateY(-40px)', offset: 0.6}),
      style({transform: 'translateY(-20px)', offset: 0.8}),
      style({transform: 'translateY(-0px)', offset: 1}),
    ])
  )
];

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss'],
  animations: [
    trigger('shake', [transition('true <=> false', shakeAnimation)]),
    trigger('flipLetters', [transition('true <=> false', [query('.app-letter', stagger('500ms', animateChild()), { optional: true })])]),
    trigger('jumpLetters', [transition('true <=> false', sequence([ query('.app-letter', stagger('500ms', animateChild())),  
                                                                    query('.app-letter', stagger('100ms', jumpAnimation))],
    ))])
  ],
})
export class WordComponent implements OnInit {

  @Input() word !: Word;
  
  constructor() { }

  ngOnInit(): void {
  }

  shakeTrigger = true;
  flipTrigger = true;
  jumpTrigger = true;

  shake() {
    this.shakeTrigger = !this.shakeTrigger;
  }
  flip() {
    this.flipTrigger = !this.flipTrigger;
  }
  jump() {
    this.jumpTrigger = !this.jumpTrigger;    
  }
}
