import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthModule, AuthHttpInterceptor } from '@auth0/auth0-angular';
import { NotifierModule } from 'angular-notifier';
import { notifierOptions } from './options/notifierOptions';
import { NavbarComponent } from './components/navigation/navbar/navbar.component';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    NavbarComponent,
    BrowserModule,
    AppRoutingModule,
    AuthModule.forRoot({
      domain: environment.domain,
      clientId: environment.clientId,
      authorizationParams: {
        audience: environment.audience,
        redirect_uri: window.location.origin
      },
      httpInterceptor: {
        allowedList: [environment.apiUrl + '/*']
      }
    }),
    HttpClientModule,
    NotifierModule.withConfig(notifierOptions)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
