import { Component, OnInit, ViewChild } from '@angular/core';
import { Kullanici } from './../../models/Kullanici';
import { ApiService } from './../../services/api.service';
import { AlertDialogComponent } from '../dialogs/alert-dialog/alert-dialog.component';
import { MyAlertService } from './../../services/myAlert.service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { KullaniciFoto } from './../../models/KullaniciFoto';
import { FotoYukleDialogComponent } from '../dialogs/foto-yukle-dialog/foto-yukle-dialog.component';
import { Egitim } from './../../models/Egitim';
import { Kayit } from './../../models/Kayit';
import { MatSort } from '@angular/material/sort';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { KullaniciDialogComponent } from '../dialogs/kullanici-dialog/kullanici-dialog.component';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  dialogRef!:MatDialogRef<KullaniciDialogComponent>;
  dataSource!:any;
  confirmDialogRef!: MatDialogRef<ConfirmDialogComponent>;
  @ViewChild(MatSort) sort!:MatSort;
  kayitlar!: Kayit[];
  egitimler!: Egitim[];
  displayedColumns = ['egitimAdi', 'egitimKatAdi', 'egitimiVerenKullanici', 'egitimUcretliMi', 'islemler']
  aktifKullanici!:Kullanici;
  fotodialogRef!:MatDialogRef<FotoYukleDialogComponent>;
  constructor(
    public servis:ApiService,
    public alert:MyAlertService,
    public matDialog:MatDialog
  ) { }

  ngOnInit() {
    this.aktifKullaniciAl();
    this.kayitListele();
  }

  aktifKullaniciAl(){
    var kullaniciId = parseInt(localStorage.getItem("kullaniciId") || "0");
    this.servis.kullaniciById(kullaniciId).subscribe((d:any)=> {
      this.aktifKullanici = d;
    })
  }

  fotoGuncelle(){
    this.fotodialogRef = this.matDialog.open(FotoYukleDialogComponent,{
      width:'400px',
      data:this.aktifKullanici
    })
  this.fotodialogRef.afterClosed().subscribe((d:KullaniciFoto)=> {
    if(d){
      d.kullaniciId = this.aktifKullanici.kullaniciId;
      this.servis.kullaniciFotoGuncelle(d).subscribe((s:any)=> {
        this.alert.alertUygula(s);
        if(s.islem){
          location.href = "/profil";
        }
      })
    }
  })
 
  }

  kayitListele() {
    setTimeout(() => {
      if (this.aktifKullanici.rol == 1) {
        this.servis.egitmenEgitimleriListele(this.aktifKullanici.kullaniciId).subscribe((d: any) => {
          this.kayitlar = d;
          this.dataSource = new MatTableDataSource(this.kayitlar);
          this.dataSource.sort = this.sort;

        })
      } else {
        this.servis.kullaniciEgitimleriListeleKayit(this.aktifKullanici.kullaniciId).subscribe((d: any) => {
          this.kayitlar = d;
          this.dataSource = new MatTableDataSource(this.kayitlar);
          this.dataSource.sort = this.sort;
        })
      }
    }, 75);
  }

  kullaniciDuzenle(){

    this.dialogRef = this.matDialog.open(KullaniciDialogComponent,{
      width:'400px',
      data:{
        kayit:this.aktifKullanici,
        islem:'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe((d:Kullanici)=> {

      if(d){
        this.aktifKullanici.adSoyad = d.adSoyad;
        this.aktifKullanici.email = d.email;
        this.aktifKullanici.foto = d.foto;
        this.aktifKullanici.kullaniciAdi = d.kullaniciAdi;
        this.aktifKullanici.rol = d.rol;
        this.aktifKullanici.sifre = d.sifre;
  
        this.servis.kullaniciDuzenle(this.aktifKullanici).subscribe((s:any) => {
          this.alert.alertUygula(s);
          
        });
      }
    });
  }


  egitimKaydiSil(kayit: Kayit) {
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '400px'
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = kayit.egitimBilgi.egitimAdi + " isimli eğitim silinecektir onaylıyor musunuz ?"
    this.confirmDialogRef.afterClosed().subscribe(d => {

      if (d) {
        this.servis.kayitSil(kayit.kayitId).subscribe((s: any) => {
          this.alert.alertUygula(s);
          if (s.islem) {
            this.kayitListele();
          }
        })
      }
    })
  }
}
