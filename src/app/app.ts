import { Component } from '@angular/core';
import { Blackjack } from './blackjack/blackjack';

@Component({
  selector: 'app-root',
  imports: [Blackjack],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'blackJack';
}
