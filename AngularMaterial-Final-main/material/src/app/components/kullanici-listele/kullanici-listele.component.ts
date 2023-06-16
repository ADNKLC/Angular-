import { Sonuc } from './../../models/sonuc';
import { ApiService } from './../../services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Egitim } from './../../models/Egitim';
import { Kayit } from './../../models/Kayit';
import { Kullanici } from './../../models/Kullanici';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { MyAlertService } from './../../services/myAlert.service';
import { KullaniciSecComponent } from '../dialogs/kullanici-sec/kullanici-sec.component';
import { KullaniciDialogComponent } from '../dialogs/kullanici-dialog/kullanici-dialog.component';

@Component({
  selector: 'app-kullanici-listele',
  templateUrl: './kullanici-listele.component.html',
  styleUrls: ['./kullanici-listele.component.css']
})
export class KullaniciListeleComponent implements OnInit {
  aktifKullanici!:Kullanici;
  kayitlar!: Kayit[];
  displayedColumns = ['foto','kullaniciId','kullaniciAdi','email','sifre','adSoyad','rol','islemler']
  dataSource!:any;
  @ViewChild(MatSort) sort!:MatSort;
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  egitimId!:number;
  seciliEgitim!: Egitim;
  confirmDialogRef!:MatDialogRef<ConfirmDialogComponent>;
  dialogRef!:MatDialogRef<KullaniciSecComponent>

  constructor(
    public servis:ApiService,
    public route:ActivatedRoute,
    public matDialog:MatDialog,
    public alert:MyAlertService
  ){}
  ngOnInit() {
    this.route.params.subscribe(p => {
      this.egitimId = p['egitimId'];
      this.egitimById();
      this.kayitListele();
    })
  }

  egitimById(){
    this.servis.egitimById(this.egitimId).subscribe((d:any) => {
      this.seciliEgitim = d;
    })
  }

  kayitListele(){
    this.servis.egitimKullanicilariListeleKayit(this.egitimId).subscribe((d:any) => {
      this.kayitlar = d;
      this.dataSource = new MatTableDataSource(this.kayitlar)
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  kayitSil(kayit:Kayit){
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent,{
      width:'450px'
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = kayit.kullaniciBilgi.adSoyad + " isimli kullanıcı bu eğitimden çıkarılacaktır. Onaylıyor musunuz ?"
    this.confirmDialogRef.afterClosed().subscribe(d=> {
      if(d){
        this.servis.kayitSil(kayit.kayitId).subscribe((s:any) => {
          this.alert.alertUygula(s);
          if(s.islem){
            this.kayitListele();
          }
        })
      }
    })
  }

  ekle(){
    this.dialogRef = this.matDialog.open(KullaniciSecComponent,{
      width:'1200px'
    });
    this.dialogRef.afterClosed().subscribe(d=> {
      if(d){
        var kayit:Kayit = new Kayit();
        kayit.kayitEgitimId = this.egitimId;
        kayit.kayitKullaniciId = d.kullaniciId;
        this.servis.kayitYap(kayit).subscribe((s:any)=> {
          this.alert.alertUygula(s);
          if(s.islem){
            this.kayitListele();
          }
        })

      }
    })
  }

  aktifKullaniciAl(){
    var kullaniciId = parseInt(localStorage.getItem("kullaniciId") || "0");
    this.servis.kullaniciById(kullaniciId).subscribe((d:any)=> {
      this.aktifKullanici = d;
    })
  }
}
