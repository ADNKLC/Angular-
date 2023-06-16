import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { MaterialModule } from './material.module';
import { AlertDialogComponent } from './components/dialogs/alert-dialog/alert-dialog.component';
import { MyAlertService } from './services/myAlert.service';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { EgitimlerComponent } from './components/egitimler/egitimler.component';
import { KullanicilarComponent } from './components/kullanicilar/kullanicilar.component';
import { ProfilComponent } from './components/profil/profil.component';
import { KullaniciDialogComponent } from './components/dialogs/kullanici-dialog/kullanici-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EgitimListeleComponent } from './components/egitim-listele/egitim-listele.component';
import { FotoYukleDialogComponent } from './components/dialogs/foto-yukle-dialog/foto-yukle-dialog.component';
import { FotoYukleEgitimDialogComponent } from './components/dialogs/foto-yukle-egitim-dialog/foto-yukle-egitim-dialog.component';
import { EgitimDialogComponent } from './components/dialogs/egitim-dialog/egitim-dialog.component';
import { YorumlarDialogComponent } from './components/dialogs/yorumlar-dialog/yorumlar-dialog.component';
import { KullaniciListeleComponent } from './components/kullanici-listele/kullanici-listele.component';
import { KullaniciSecComponent } from './components/dialogs/kullanici-sec/kullanici-sec.component';
import { LoginComponent } from './components/login/login.component';
import { KategorilerComponent } from './components/kategoriler/kategoriler.component';
import { KatDialogComponent } from './components/dialogs/kat-dialog/kat-dialog.component';
import { ApiService } from './services/api.service';
import { AuthInterceptor } from './services/AuthInterceptor';
import { AuthGuard } from './services/AuthGuard';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AlertDialogComponent,
    ConfirmDialogComponent,
    MainNavComponent,
    EgitimlerComponent,
    KullanicilarComponent,
    ProfilComponent,
    KullaniciDialogComponent,
    EgitimListeleComponent,
    FotoYukleDialogComponent,
    FotoYukleEgitimDialogComponent,
    EgitimDialogComponent,
    YorumlarDialogComponent,
    KullaniciListeleComponent,
    KullaniciSecComponent,
    LoginComponent,
    KategorilerComponent,
    KatDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],

  providers: [MyAlertService,ApiService,AuthGuard,
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true},
],
  bootstrap: [AppComponent]
})
export class AppModule { }
