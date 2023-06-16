import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { KullanicilarComponent } from './components/kullanicilar/kullanicilar.component';
import { EgitimlerComponent } from './components/egitimler/egitimler.component';
import { ProfilComponent } from './components/profil/profil.component';
import { EgitimListeleComponent } from './components/egitim-listele/egitim-listele.component';
import { KullaniciListeleComponent } from './components/kullanici-listele/kullanici-listele.component';
import { LoginComponent } from './components/login/login.component';
import { KategorilerComponent } from './components/kategoriler/kategoriler.component';
import { AuthGuard } from './services/AuthGuard';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'kullanicilar',component:KullanicilarComponent,canActivate:[AuthGuard],data:{yetkiler:['Admin'],gerigit:'/login'}},
  {path:'egitimler',component:EgitimlerComponent},
  {path:'profil',component:ProfilComponent},
  {path:'egitimlistele/:kullaniciId',component:EgitimListeleComponent,canActivate:[AuthGuard],data:{yetkiler:['Admin','Egitmen'],gerigit:'/login'}},
  {path:'kullanicilistele/:egitimId',component:KullaniciListeleComponent,canActivate:[AuthGuard],data:{yetkiler:['Admin','Egitmen'],gerigit:'/login'}},
  {path:'login',component:LoginComponent},
  {path:'kategoriler',component:KategorilerComponent,canActivate:[AuthGuard],data:{yetkiler:['Admin'],gerigit:'/login'}}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
