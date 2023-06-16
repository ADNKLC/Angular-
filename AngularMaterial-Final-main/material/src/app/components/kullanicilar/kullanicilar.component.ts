import { FotoYukleDialogComponent } from './../dialogs/foto-yukle-dialog/foto-yukle-dialog.component';
import { KullaniciDialogComponent } from './../dialogs/kullanici-dialog/kullanici-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Kullanici } from './../../models/Kullanici';
import { ApiService } from './../../services/api.service';
import { MyAlertService } from './../../services/myAlert.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { KullaniciFoto } from './../../models/KullaniciFoto';


@Component({
  selector: 'app-kullanicilar',
  templateUrl: './kullanicilar.component.html',
  styleUrls: ['./kullanicilar.component.css']
})
export class KullanicilarComponent implements OnInit {

  kullanicilar!: Kullanici[];
  displayedColumns = ['foto','kullaniciId','kullaniciAdi','email','sifre','adSoyad','rol','islemler','alinanverilenegitimler']
  dataSource!:any;
  @ViewChild(MatSort) sort!:MatSort;
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  dialogRef!:MatDialogRef<KullaniciDialogComponent>;
  fotodialogRef!:MatDialogRef<FotoYukleDialogComponent>;
  confirmDialogRef!:MatDialogRef<ConfirmDialogComponent>;

  constructor(
    public servis:ApiService,
    public matDialog:MatDialog,
    public alert:MyAlertService
  ) { }

  ngOnInit(
  ) {
    this.kullaniciListele();
  }

  kullaniciListele(){
    this.servis.kullaniciListele().subscribe((d:any) => {
      this.kullanicilar = d;
      this.dataSource = new MatTableDataSource(this.kullanicilar)
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  filtreUygula(e:any){
    var deger = e.target.value;
    this.dataSource.filter = deger.trim().toLowerCase();
    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }

  kullaniciEkle(){
    var yeniKayit: Kullanici = new Kullanici();
    this.dialogRef = this.matDialog.open(KullaniciDialogComponent,{
      width:'400px',
      data:{
        kayit:yeniKayit,
        islem:'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=> {
      if(d){
        d.foto = "profil.jpg";
        this.servis.kullaniciEkle(d).subscribe((s:any) => {
          this.alert.alertUygula(s);
          if(s.islem){
            this.kullaniciListele();
          }
        });
      }
      
    });
  }

  kullaniciDuzenle(kayit:Kullanici){

    this.dialogRef = this.matDialog.open(KullaniciDialogComponent,{
      width:'400px',
      data:{
        kayit:kayit,
        islem:'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe((d:Kullanici)=> {

      if(d){
        kayit.adSoyad = d.adSoyad;
        kayit.email = d.email;
        kayit.foto = d.foto;
        kayit.kullaniciAdi = d.kullaniciAdi;
        kayit.rol = d.rol;
        kayit.sifre = d.sifre;
  
        this.servis.kullaniciDuzenle(kayit).subscribe((s:any) => {
          this.alert.alertUygula(s);
          
        });
      }
    });
  }

  kullaniciSil(kayit:Kullanici){
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent,{
      width:'500px'
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = kayit.adSoyad + " isimli kullanıcı silinecektir. Onaylıyor musunuz ?"
    this.confirmDialogRef.afterClosed().subscribe(d=> {
      if(d){
        this.servis.kullaniciSil(kayit.kullaniciId).subscribe((s:any) => {
          this.alert.alertUygula(s);
          if(s.islem){
            this.kullaniciListele();
          }
        })
      }
    })
  }

  fotoGuncelle(kayit:Kullanici){
    this.fotodialogRef = this.matDialog.open(FotoYukleDialogComponent,{
      width:'400px',
      data:kayit
    })
  this.fotodialogRef.afterClosed().subscribe((d:KullaniciFoto)=> {
    if(d){
      d.kullaniciId = kayit.kullaniciId;
      this.servis.kullaniciFotoGuncelle(d).subscribe((s:any)=> {
        this.alert.alertUygula(s);
        if(s.islem){
          this.kullaniciListele();
          console.log("taam")
        }
      })
    }

  })
  
  }
}

// 7 52dk civarı öğrencinin aldıgı dersler sayısı listelendi