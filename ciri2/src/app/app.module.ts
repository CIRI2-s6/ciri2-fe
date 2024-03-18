import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthModule, AuthHttpInterceptor } from '@auth0/auth0-angular';
import { NotifierModule } from 'angular-notifier';
import { notifierOptions } from './options/notifierOptions';
import { NavbarComponent } from './components/navigation/navbar/navbar.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    NavbarComponent,
    BrowserModule,
    AppRoutingModule,
    AuthModule.forRoot({
      domain: 'dev-or5ax9l3.us.auth0.com',
      clientId: 'H28yGpxGSrtT6tfOfXZJKuj36XsUYxBQ',
      authorizationParams: {
        audience: 'http://api.ciri2.com',
        redirect_uri: window.location.origin,
      },
      httpInterceptor: {
        allowedList: ['http://localhost:8080/components/*'],
      },
    }),
    HttpClientModule,
    NotifierModule.withConfig(notifierOptions),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
