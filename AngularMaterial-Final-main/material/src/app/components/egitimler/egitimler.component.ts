import { Egitim } from './../../models/Egitim';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Kategori } from './../../models/Kategori';
import { ApiService } from './../../services/api.service';
import { MyAlertService } from './../../services/myAlert.service';
import { FotoYukleDialogComponent } from '../dialogs/foto-yukle-dialog/foto-yukle-dialog.component';
import { FotoYukleEgitimDialogComponent } from '../dialogs/foto-yukle-egitim-dialog/foto-yukle-egitim-dialog.component';
import { EgitimFoto } from './../../models/EgitimFoto';
import { EgitimDialogComponent } from '../dialogs/egitim-dialog/egitim-dialog.component';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { Kullanici } from './../../models/Kullanici';
import { Kayit } from './../../models/Kayit';
import { YorumlarDialogComponent } from '../dialogs/yorumlar-dialog/yorumlar-dialog.component';

@Component({
  selector: 'app-egitimler',
  templateUrl: './egitimler.component.html',
  styleUrls: ['./egitimler.component.css']
})
export class EgitimlerComponent implements OnInit {

  aktifKullanici!:Kullanici;
  confirmDialogRef!:MatDialogRef<ConfirmDialogComponent>;
  fotodialogRef!:MatDialogRef<FotoYukleEgitimDialogComponent>;
  dialogRef!:MatDialogRef<EgitimDialogComponent>;
  yorumdialogRef!:MatDialogRef<YorumlarDialogComponent>;
  filtre = 99999;
  kategoriler!: Kategori[];
  egitimler!: Egitim[];
  filtreliEgitimler!: Egitim[]
  dataSource!: any;
  displayedColumns = ["egitimAdi", "egitimKatAdi", "egitimiVerenKullanici", "egitimUcretliMi", "egitimFoto", "egitimAciklamasi"];

  constructor(
    public servis: ApiService,
    public alert: MyAlertService,
    public matDialog: MatDialog

  ) { }

  ngOnInit() {
    this.egitimListele();
    this.kategoriListele();
    this.aktifKullaniciAl();
  }

  egitimListele() {
    if (this.filtre == 99999) {
      this.servis.egitimListele().subscribe((d: any) => {
        this.egitimler = d;
      });
    } else {
      this.servis.egitimListele().subscribe((d: any) => {
        this.egitimler = d;
        var filtreli = this.egitimler.filter(s => s.egitimKatId == this.filtre);
        this.egitimler = filtreli;
      })
    }

  }

  kategoriListele() {
    this.servis.kategoriListele().subscribe((d: any) => {
      this.kategoriler = d;
    });
  }

  kategorilereGoreListele(katId: number) {
    this.filtre = katId;
    this.egitimListele();
  }


  fotoGuncelle(kayit:Egitim){
    this.fotodialogRef = this.matDialog.open(FotoYukleEgitimDialogComponent,{
      width:'400px',
      data:kayit
    })
  this.fotodialogRef.afterClosed().subscribe((d:EgitimFoto)=> {
    if(d){
      d.egitimId = kayit.egitimId;
      this.servis.egitimFotoGuncelle(d).subscribe((s:any)=> {
        this.alert.alertUygula(s);
        if(s.islem){
          this.egitimListele();
        }  }) } })
   }

   egitimEkle(){
    var yeniKayit: Egitim = new Egitim();
    this.dialogRef = this.matDialog.open(EgitimDialogComponent,{
      width:'400px',
      data:{
        kayit:yeniKayit,
        islem:'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=> {
      if(d){
        d.egitimFoto = "egitim.jpg";
        this.servis.egitimEkle(d).subscribe((s:any) => {
          this.alert.alertUygula(s);
          if(s.islem){
            this.egitimListele();
          }
        });
      }
      
    });
  }

  egitimDuzenle(kayit:Egitim){

    this.dialogRef = this.matDialog.open(EgitimDialogComponent,{
      width:'400px',
      data:{
        kayit:kayit,
        islem:'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe((d:Egitim)=> {

      if(d){
        kayit.egitimAdi = d.egitimAdi;
        kayit.egitimKatId = d.egitimKatId;
        kayit.egitimiVerenId = d.egitimiVerenId;
        kayit.egitimAciklamasi = d.egitimAciklamasi;
        kayit.egitimUcretliMi = d.egitimUcretliMi;
  
        this.servis.egitimDuzenle(kayit).subscribe((s:any) => {
          this.alert.alertUygula(s);
          this.egitimListele();
        });
      }
    });
  }

  egitimSil(kayit:Egitim){
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent,{
      width:'500px'
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = kayit.egitimAdi + " isimli eğitim silinecektir. Onaylıyor musunuz ?"
    this.confirmDialogRef.afterClosed().subscribe(d=> {
      if(d){
        this.servis.egitimSil(kayit.egitimId).subscribe((s:any) => {
          this.alert.alertUygula(s);
          if(s.islem){
            this.egitimListele();
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

  egitimKaydiYap(egitim:Egitim){
    var yeniKayit : Kayit = new Kayit();
    yeniKayit.kayitKullaniciId = this.aktifKullanici.kullaniciId;
    yeniKayit.kayitEgitimId = egitim.egitimId;
    this.servis.kayitYap(yeniKayit).subscribe((d:any) => {
      this.alert.alertUygula(d);

    })
  }

  yorumlariAc(egitim:Egitim){
    this.yorumdialogRef = this.matDialog.open(YorumlarDialogComponent,{
      width:'400px',
      data:{
        kayit:egitim
      }
    });
    this.yorumdialogRef.afterClosed().subscribe((d:Egitim)=> {

      if(d){
        console.log("BURDAYIZ")
      }
    });
  }
}
