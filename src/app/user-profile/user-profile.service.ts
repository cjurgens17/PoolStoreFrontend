import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, Subject, catchError, combineLatest, filter, find, map, switchMap, tap, throwError } from 'rxjs';
import { Pokemon } from '../pokemon/pokemon';
import { User } from '../user-info/user-info';
import { UserLoginService } from '../user-login/user-login-service';
import { Message } from '../all-users/message';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  private userUrl = "http://localhost:8080/user";

  msg: Message = {
    text: '',
    userPokemon: '',
    userPokemonImage: '',
    tradePokemon: '',
    tradePokemonImage: '',
    username: '',
    currentUsername: '',
    traded: false
  }

  currentUserLogin$ = this.userLoginService.getCurrentUser();

  currentUser$ = this.currentUserLogin$
  .pipe(
    filter(userLogin => Boolean(userLogin)),
    switchMap(userLogin => {
      if(userLogin?.username){
        return this.http.get<User>(`${this.userUrl}/${userLogin.username}`)
      }else {
        return EMPTY;
      }
    }),
    tap(user => console.log(`current User`, user))
  );

//Hot Observable that shows and updates a users msgs initally and when they get deleted
  userPokemon$ = this.currentUser$
  .pipe(
    filter(user => Boolean(user)),
    switchMap(user => {
      return this.http.get<Pokemon[]>(`${this.userUrl}/${user.id}/userPokemon`)
    }),
    tap(pokemon => console.log('user pokemon', pokemon))
  );

  constructor(private http: HttpClient, private userLoginService: UserLoginService) {}
    //gets users messages
  getUserMessages(id: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.userUrl}/${id}/userMessages`)
    .pipe(
      catchError(this.handleError)
    )
  }


  private handleError(err: HttpErrorResponse){

    let errorMessage= '';
    if(err.error instanceof ErrorEvent){
      errorMessage = `An error occured: ${err.error.message}`;
    }else{
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }

    console.error(errorMessage);
    return throwError(() => errorMessage);
  }

  //auth service for user-profile guard, if user is signed it will retrun true
  //else it will return false;
  //update this when we implement a behavior subject??
   isLoggedIn(): boolean {
    let user = JSON.parse(localStorage.getItem('userLoginInfo') || '{}');
    const id = user.id;

    if(id >= 1){
      return true;
    }
    return false;
  }
}
