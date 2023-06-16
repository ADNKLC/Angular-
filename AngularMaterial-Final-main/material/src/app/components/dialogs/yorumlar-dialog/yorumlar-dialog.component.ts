import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Egitim } from 'src/app/models/Egitim';
import { Kullanici } from 'src/app/models/Kullanici';
import { Yorum } from 'src/app/models/Yorum';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';

@Component({
  selector: 'app-yorumlar-dialog',
  templateUrl: './yorumlar-dialog.component.html',
  styleUrls: ['./yorumlar-dialog.component.css']
})
export class YorumlarDialogComponent implements OnInit {

  aktifKullanici!:Kullanici;
  egitim!:Egitim;
  egitimKullanicilari!:Kullanici[];
  yorumlar!:Yorum[];
  egitimAlmisMi = false;
  constructor(
    public servis:ApiService,
    public matDialog:MatDialog,
    public dialogRef:MatDialogRef<YorumlarDialogComponent>,
    public alert:MyAlertService,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { 
    this.egitim = data.kayit;
  }

  ngOnInit() {
    this.egitimYorumlariListele();
    this.aktifKullaniciAl();
    this.kullaniciEgitimiAlmisMi();
  }


  egitimYorumlariListele(){
    this.servis.yorumListeleByEgitim(this.egitim.egitimId).subscribe((d:any)=> {
      this.yorumlar = d;
      console.log(this.yorumlar);
    })
  }

  aktifKullaniciAl(){
    var kullaniciId = parseInt(localStorage.getItem("kullaniciId") || "0");
    this.servis.kullaniciById(kullaniciId).subscribe((d:any)=> {
      this.aktifKullanici = d;
    })
  }

  kullaniciEgitimiAlmisMi(){
    this.servis.egitimKullanicilariListeleKayit(this.egitim.egitimId).subscribe((d:any)=> {
      for (var kullanici of d) {
        if(kullanici.kullaniciBilgi.kullaniciId == this.aktifKullanici.kullaniciId){
          this.egitimAlmisMi = true;
        }
      }
    })
  }

  yorumEkle(yorum:any){
    var eklenecekYorum: Yorum= new Yorum();
    eklenecekYorum.yorumIcerigi = yorum;
    eklenecekYorum.yorumYapanId = this.aktifKullanici.kullaniciId;
    eklenecekYorum.yorumYapilanEgitimId = this.egitim.egitimId;
    this.servis.yorumEkle(eklenecekYorum).subscribe((d:any) => {
      this.alert.alertUygula(d);
      if(d.islem){
        this.egitimYorumlariListele();
      }
    })
  }

  yorumSil(yorum:Yorum){
    this.servis.yorumSil(yorum.yorumId).subscribe((d:any)=> {
      this.alert.alertUygula(d);
      if(d.islem){
        this.egitimYorumlariListele();
      }
    })
  }
}
