import { Egitim } from './../../models/Egitim';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Kayit } from './../../models/Kayit';
import { Kullanici } from './../../models/Kullanici';
import { Sonuc } from './../../models/sonuc';
import { ApiService } from './../../services/api.service';
import { MyAlertService } from './../../services/myAlert.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-egitim-listele',
  templateUrl: './egitim-listele.component.html',
  styleUrls: ['./egitim-listele.component.css']
})
export class EgitimListeleComponent implements OnInit {

  kayitlar!: Kayit[];
  egitimler!: Egitim[];
  seciliKullanici!: Kullanici;
  kullaniciId!: number;
  displayedColumns = ['egitimAdi', 'egitimKatAdi', 'egitimiVerenKullanici', 'egitimUcretliMi', 'islemler']
  dataSource!: any;
  @ViewChild(MatSort) sort!:MatSort;
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  egitimId = 9999999;
  confirmDialogRef!: MatDialogRef<ConfirmDialogComponent>;

  constructor(
    public servis: ApiService,
    public alert: MyAlertService,
    public route: ActivatedRoute,
    public matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      if (p) {
        this.kullaniciId = p['kullaniciId'];
        this.kullaniciGetir();
        this.kayitListele();
        this.egitimListele();
      }
    })
  }

  kullaniciGetir() {
    this.servis.kullaniciById(this.kullaniciId).subscribe((d: any) => {
      this.seciliKullanici = d;
    })
  }

  kayitListele() {
    setTimeout(() => {
      if (this.seciliKullanici.rol == 1) {
        this.servis.egitmenEgitimleriListele(this.kullaniciId).subscribe((d: any) => {
          this.kayitlar = d;
          this.dataSource = new MatTableDataSource(this.kayitlar);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;

        })
      } else {
        this.servis.kullaniciEgitimleriListeleKayit(this.kullaniciId).subscribe((d: any) => {
          this.kayitlar = d;
          this.dataSource = new MatTableDataSource(this.kayitlar);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        })
      }
    }, 75);
  }

  egitimListele() {
    this.servis.egitimListele().subscribe((d: any) => {
      this.egitimler = d;
    })
  }

  egitimSec(egitimId: number) {
    console.log(egitimId);
    this.egitimId = egitimId;
  }

  egitimKaydet() {
    if (this.egitimId == 9999999) {
      var s: Sonuc = new Sonuc();
      s.islem = false;
      s.mesaj = "Lütfen bir eğitim seçiniz !";
      this.alert.alertUygula(s);
      return;
    }

    var kayit: Kayit = new Kayit();
    kayit.kayitEgitimId = this.egitimId;
    kayit.kayitKullaniciId = this.kullaniciId;

    this.servis.kayitYap(kayit).subscribe((s: any) => {
      this.alert.alertUygula(s);
      if (s.islem) {
        this.kayitListele();
      }
    })
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
