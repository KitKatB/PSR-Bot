import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  game = 'Paper..Scissors...Rock!';
  user_score = 0;
  bot_score = 0;
  chosen_move = '';
  displayMove = false;
  winner = '';

  // [p,s,r]
  paper = [0, 0, 0];
  scissors = [0, 0, 0];
  rock = [0, 0, 0];
  move_names = ['Paper', 'Scissors', 'Rock'];
  moves = [this.paper, this.scissors, this.rock];

  // user moves
  user_lastMove;
  user_nextMove;
  // bot move
  bot_Move_n = this.chooseMove(this.move_names.length);
  bot_move;
  bot_nextMove =  this.move_names[this.bot_Move_n];
  // move button
  // play game
  // record move
  move(move_number: number) {
    // reveal bot and render user
    this.chosen_move = this.move_names[move_number];
    this.bot_move = this.bot_nextMove;
    // evaluate move
    this.eval_nextMove(move_number);
    // score
    this.score(move_number, this.bot_move);
  }

  eval_nextMove(move_number: number) {
    if (!this.user_lastMove) {
      this.user_lastMove = this.moves[move_number];
    } else {
      this.user_lastMove[move_number]++;
      this.user_lastMove = this.moves[move_number];
    }
    // evaluate next move
    const max_freq = Math.max.apply(Math, this.user_lastMove);
    // if max is 0 randomise next bot move
    if (max_freq !== 0) {
      let next_possibleUserMove;
      let temp;
      let counter;
      // list all probable next move based on previous move
      // return indexes
      temp = this.findmaxIndexes(this.user_lastMove, max_freq);
      next_possibleUserMove = temp[this.chooseMove(temp.length)];
      // counter
      counter = this.counterMove(next_possibleUserMove);
      this.bot_Move_n = counter;
      this.bot_nextMove = this.move_names[counter];
    } else {
      this.bot_nextMove = this.move_names[this.chooseMove(this.move_names.length)];
    }
    console.log(this.user_lastMove);
  }

  findmaxIndexes(listArg: number[], max: number): number[] {
    const indexes = [];
    for (let i = 0; i < listArg.length; i++) {
      if (listArg[i] === max) {
        indexes.push(i);
      }
    }
    return indexes;
  }

  chooseMove(arrayLength: number): number {
    return Math.floor(Math.random() * Math.floor(arrayLength));
  }

  counterMove(possibleMove: number): number {
    if (possibleMove === 2) {
      return 0 ;
    }
    return possibleMove + 1;
  }

  score(uMove: number, bMove: string) {
    let temp = uMove - 1;
    if (temp < 0) {
      temp = 2;
    }
    // user win
    // bot win
    // tie
    if (this.move_names[temp] === bMove) {
      console.log(this.move_names[temp] + ' ' + bMove);
      console.log('user win');
      this.user_score++;
      this.winner = 'You';
      return;
    } else if (this.move_names[uMove] !== bMove) {
      console.log(this.move_names[uMove] + ' ' + bMove);
      console.log('bot win');
      this.bot_score++;
      this.winner = 'Bot';
      return;
    } else {
      console.log(this.move_names[uMove] + ' ' + bMove);
      console.log('tie');
      this.winner = 'Tie!';
      return;
    }
  }
}
