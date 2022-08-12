import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_ALL_WORDS } from './graphql/graphql.queries';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dg5-wordle-client';
  allWords!: string[];

  constructor(private apollo: Apollo) {

    this.apollo.watchQuery({ query: GET_ALL_WORDS }).valueChanges
      .subscribe(({ data, error }: any) => {
          this.allWords = data.allWords;   
        } 
      );
  }
}
