import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Kullanici } from 'src/app/models/Kullanici';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-kullanici-dialog',
  templateUrl: './kullanici-dialog.component.html',
  styleUrls: ['./kullanici-dialog.component.css']
})
export class KullaniciDialogComponent implements OnInit {

  aktifKullanici!:Kullanici;
  dialogBaslik!:string;
  islem!:string; 
  form!:FormGroup;
  yeniKayit!:Kullanici;

  constructor(
    public servis:ApiService,
    public matDialog:MatDialog,
    public formBuild:FormBuilder,
    public dialogRef:MatDialogRef<KullaniciDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {
    this.islem = data.islem;
    this.yeniKayit = data.kayit;
    if(this.islem == 'ekle'){
      this.dialogBaslik = "Kullanıcı Ekle";
    }
    if(this.islem == 'duzenle'){
      this.dialogBaslik = "Kullanıcı Düzenle";
    }

    this.form = this.formOlustur();
   }

  ngOnInit() {
    this.aktifKullaniciAl();
  }

  formOlustur(){
    return this.formBuild.group({
      kullaniciAdi:[this.yeniKayit.kullaniciAdi],
      email:[this.yeniKayit.email],
      sifre:[this.yeniKayit.sifre],
      adSoyad:[this.yeniKayit.adSoyad],
      foto:[this.yeniKayit.foto],
      rol:[this.yeniKayit.rol]
    })
  }

  aktifKullaniciAl(){
    var kullaniciId = parseInt(localStorage.getItem("kullaniciId") || "0");
    this.servis.kullaniciById(kullaniciId).subscribe((d:any)=> {
      this.aktifKullanici = d;
    })
  }
}
