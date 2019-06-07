import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface State {
  turn : string,
  values : string[][],
  countTurn : number,
  winner: boolean
}

@Injectable({
  providedIn: 'root'
})

export class StateService {

  private _state$: BehaviorSubject<State>;

  constructor() { 

	  let initialState = {
	    turn: 'PLAYERX',
	    values: [
	      ['-','-','-'],
	      ['-','-','-'],
	      ['-','-','-']
      ],
      countTurn: 0,
      winner : false
	  };

	  this._state$ = new BehaviorSubject(initialState);

  }

  get state$ (): BehaviorSubject<State> {
    return this._state$; 
  }

  get state (): State {
    return this._state$.getValue();
  }

  set state (state: State) {
    this._state$.next(state);
  }
  
  updateValue(row, col) {
    if(this.state.values[row][col] === '-') {
      let newValue = this.state.turn === 'PLAYERX' ? 'X' : '0';
      let newTurn = this.state.turn === 'PLAYERX' ? 'PLAYER0' : 'PLAYERX';
      this.state.values[row][col] = newValue;
      if(this.checkWin(row,col,newValue)){
        this.state.winner = true;
      }
      this.state.turn = newTurn;
      this.state.countTurn++;
      this._state$.next(this.state);
    }
  }

  checkWin(row, col, turn){
    let winCol : boolean = true;
    let winDia1 : boolean = true;
    let winDia2 : boolean = true;
    let winRow : boolean = true;
    for (let index = 0; index < 3; index++) {
      // Comprobar row
      if(this.state.values[row][index] !== turn) {
        winRow = false;
      }

      // Comprobar col
      if(this.state.values[index][col] !== turn) {
        winCol = false;
      }

      // Comprobar diagonal
      if(this.state.values[index][index] !== turn) {
        winDia1 = false;
      }
      
      // Comprobar diagonal
      if(this.state.values[index][2-index] !== turn) {
        winDia2 = false;
      }
    }
    console.log('Winner: ' + (winCol || winRow || winDia1 || winDia2) );
    return (winCol || winRow || winDia1 || winDia2)
  }

  reset() {
    this.state = {
      turn: 'PLAYERX',
      values: [
        ['-','-','-'],
        ['-','-','-'],
        ['-','-','-']
      ],
      countTurn: 0,
      winner : false
    };
  }

}
