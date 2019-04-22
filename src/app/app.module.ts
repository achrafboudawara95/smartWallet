import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicStorageModule } from '@ionic/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MembersPage } from './members/members.page'
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { Facebook } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AuthGuardService } from 'src/sevices/AuthGuardService';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent,MembersPage],
  entryComponents: [MembersPage],
  imports: [BrowserModule,
            ReactiveFormsModule,
            IonicModule.forRoot(), AppRoutingModule,
            AngularFireModule.initializeApp(environment.firebase),
            AngularFireDatabaseModule,
            AngularFireAuthModule,
            IonicStorageModule.forRoot()
  ],
  providers: [
    AuthGuardService,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Facebook,
    GooglePlus
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
