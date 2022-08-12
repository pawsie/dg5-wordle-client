import { Component, Input, OnInit } from '@angular/core';
import { Word } from './wordModel';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss']
})
export class WordComponent implements OnInit {

  @Input() word !: Word;
  
  constructor() { }

  ngOnInit(): void {
  }

}
