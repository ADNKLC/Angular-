import { Egitim } from './../../../models/Egitim';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from './../../../services/api.service';
import { Kullanici } from './../../../models/Kullanici';
import { Kategori } from './../../../models/Kategori';

@Component({
  selector: 'app-egitim-dialog',
  templateUrl: './egitim-dialog.component.html',
  styleUrls: ['./egitim-dialog.component.css']
})
export class EgitimDialogComponent implements OnInit {

  aktifKullanici!:Kullanici;
  kategoriler!:Kategori[];
  egitmenler!:Kullanici[];
  dialogBaslik!:string;
  islem!:string; 
  form!:FormGroup;
  yeniKayit!:Egitim;

  constructor(
    public servis:ApiService,
    public matDialog:MatDialog,
    public formBuild:FormBuilder,
    public dialogRef:MatDialogRef<EgitimDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {
    this.islem = data.islem;
    this.yeniKayit = data.kayit;
    if(this.islem == 'ekle'){
      this.dialogBaslik = "Eğitim Ekle";
    }
    if(this.islem == 'duzenle'){
      this.dialogBaslik = "Eğitim Düzenle";
    }

    this.form = this.formOlustur();
   }

  ngOnInit() {
    this.egitmenlerListele();
    this.kategoriListele();
    this.aktifKullaniciAl();
  }

  formOlustur(){
    return this.formBuild.group({
      egitimAdi:[this.yeniKayit.egitimAdi],
      egitimKatId:[this.yeniKayit.egitimKatId],
      egitimiVerenId:[this.yeniKayit.egitimiVerenId],
      egitimUcretliMi:[this.yeniKayit.egitimUcretliMi],
      egitimAciklamasi:[this.yeniKayit.egitimAciklamasi],
    })
  }

  egitmenlerListele(){
    this.servis.kullaniciListele().subscribe((d:any) => {
      this.egitmenler = d;
      var filtreli = this.egitmenler.filter(s=> s.rol == 1);
      this.egitmenler = filtreli;
    })
  }

  kategoriListele(){
    this.servis.kategoriListele().subscribe((d:any) => {
      this.kategoriler = d;
    })
  }

  aktifKullaniciAl(){
    var kullaniciId = parseInt(localStorage.getItem("kullaniciId") || "0");
    this.servis.kullaniciById(kullaniciId).subscribe((d:any)=> {
      this.aktifKullanici = d;
    })
  }
}

