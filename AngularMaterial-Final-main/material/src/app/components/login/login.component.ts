import { Kullanici} from './../../models/Kullanici';
import { Component, OnInit } from '@angular/core';
import { Sonuc } from './../../models/sonuc';
import { ApiService } from './../../services/api.service';
import { MyAlertService } from './../../services/myAlert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  yeni: Kullanici = new Kullanici();
  constructor(
    public servis:ApiService,
    public alert:MyAlertService
  ) { }

  ngOnInit() {
  }
  oturumAc(kAdi: string, parola: string) {
    this.servis.tokenAl(kAdi, parola).subscribe({
      next: (d: any) => {
        console.log(d);
        localStorage.setItem("token", d.access_token);
        localStorage.setItem("kullaniciId", d.kullaniciId);
        localStorage.setItem("kullaniciAdi", d.kullaniciAdi);
        localStorage.setItem("uyeYetkileri", d.uyeYetkileri);
        location.href = "/";
      },
      error: (err: any) => {
        var s: Sonuc = new Sonuc();
        s.islem = false;
        s.mesaj = "Hatalı kullanıcı adı ya da parola";
        this.alert.alertUygula(s);
      }
    });
  }

  kayitOl(adSoyad:string,kAdi:string,sifre:string,eposta:string){
    

    this.yeni.adSoyad = adSoyad;
    this.yeni.sifre = sifre;
    this.yeni.email = eposta;
    this.yeni.rol = 2;
    this.yeni.foto = "profil.jpg";
    this.yeni.kullaniciAdi = kAdi;

    console.log("EKLENECEK BİRAZDAN: " + this.yeni)
    this.servis.kullaniciEkle(this.yeni).subscribe((s:any)=> {
      console.log("GİRDİ")
      this.alert.alertUygula(s);
      if(s.islem){
        this.oturumAc(kAdi,sifre);
      }
    })
    
  }
}
