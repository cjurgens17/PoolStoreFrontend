import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PokemonModule } from './pokemon/pokemon.module';
import { UserInfoModule } from './user-info/user-info.module';
import { UserLoginModule } from './user-login/user-login.module';
import { UserProfileModule } from './user-profile/user-profile.module';
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {path: 'home', component: HomeComponent},
      {path: '', redirectTo: 'home', pathMatch:'full'},
      {path: '**', redirectTo: 'home', pathMatch: 'full'}
    ]),
    PokemonModule,
    UserInfoModule,
    UserLoginModule,
    UserProfileModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
