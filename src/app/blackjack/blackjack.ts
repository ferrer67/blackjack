import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-blackjack',
  standalone: true,
  imports: [],
  templateUrl: './blackjack.html',
  styleUrl: './blackjack.css'
})
export class Blackjack {
  deck = signal<number[]>([]);
  dealerHand = signal<number[]>([]);
  playerHand = signal<number[]>([]);
  playerTotal: number = 0;
  dealerTotal: number = 0;
  message: string = "";



  // genereate the cards for the deck it will be played
  deckCards() {
    for (let i = 0; i <= 4; i++) {
      for (let j = 1; j <= 13; j++) {
        if (j >= 11 && j <= 13) {
          this.deck().push(10);
        } else {
          this.deck().push(j);
        }
      }
    }
    console.log(this.deck());

    //create player and dealer hands
    for (let i = 0; i < 2; i++) {
      const shuffled = [...this.deck()].sort(() => Math.random() - 0.5);

      switch (i) {
        case 0:
          this.dealerHand.set(shuffled.slice(0, 1));
          this.dealerTotal = [...this.dealerHand()].reduce((acc, current) => acc + current, 0);
          break;
        case 1:
          this.playerHand.set(shuffled.slice(0, 2));
          this.playerTotal = [...this.playerHand()].reduce((acc, current) => acc + current, 0);
          break;
      }
    }


  }

  hit() {
    if (!this.message) {
      if (this.playerTotal < 21) {
        const shuffled = [...this.deck()].sort(() => Math.random() - 0.5);
        this.playerHand().push(shuffled[0]);
        this.playerTotal = [...this.playerHand()].reduce((acc, current) => acc + current, 0);

      }

      if (this.playerTotal > 21) {
        this.message = "Player lose."
      } else if (this.playerTotal == 21) {
        this.message = "blackjack you win."

      }

    } else {
      console.log("Game ended.");
    }

  }

  dealerTake() {
    if (!this.message) {
      this.dealerTotal = [...this.dealerHand()].reduce((acc, current) => acc + current, 0);

      console.log(this.playerHand());

      console.log(this.playerTotal);

      if (this.playerTotal < 21) {
        for (this.dealerTotal; this.dealerTotal < this.playerTotal && this.dealerTotal < 21;) {
          const shuffled = [...this.deck()].sort(() => Math.random() - 0.5);
          this.dealerHand().push(shuffled[0])

          this.dealerTotal = [...this.dealerHand()].reduce((acc, current) => acc + current, 0);

          console.log(this.dealerHand());

        }
        console.log("out of loop" + this.dealerHand());
      }

      if (this.dealerTotal > this.playerTotal && this.dealerTotal <= 21) {
        this.message = "Dealers win.";
      } else if (this.dealerTotal == this.playerTotal) {
        this.message = "Draw";
      } else {
        this.message = "Player win.";
      }

    } else {
      console.log("Game ended.");
    }
  }



  stand() {

    this.dealerTake();

  }

  ngOnInit() {
    this.deckCards();
  }
}