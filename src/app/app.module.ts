import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { LetterComponent } from './letter/letter.component';
import { WordComponent } from './word/word.component';
import { GameService } from './game.service';
import { ToastContainerModule, ToastrModule } from 'ngx-toastr';
import { KeyboardComponent } from './keyboard/keyboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LetterComponent,
    WordComponent,
    KeyboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
      preventDuplicates: true      
    }),
    ToastContainerModule,
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
