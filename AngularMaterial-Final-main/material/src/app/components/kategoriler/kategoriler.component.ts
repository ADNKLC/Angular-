import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { ApiService } from './../../services/api.service';
import { MyAlertService } from './../../services/myAlert.service';
import { Kategori } from './../../models/Kategori';
import { MatTableDataSource } from '@angular/material/table';
import { Sonuc } from './../../models/sonuc';
import { KatDialogComponent } from '../dialogs/kat-dialog/kat-dialog.component';

@Component({
  selector: 'app-kategoriler',
  templateUrl: './kategoriler.component.html',
  styleUrls: ['./kategoriler.component.css']
})
export class KategorilerComponent implements OnInit {
  
  dialogRef!:MatDialogRef<KatDialogComponent>;
  kategoriler!:Kategori[]
  @ViewChild(MatSort) sort!:MatSort;
  confirmDialogRef!:MatDialogRef<ConfirmDialogComponent>;
  dataSource!:any;
  displayedColumns = ['katId','katAdi','islemler']
  constructor(
    public servis:ApiService,
    public matDialog:MatDialog,
    public alert:MyAlertService
  ) { }

  ngOnInit() {
    this.kategoriListele();
  }


  kategoriListele(){
    this.servis.kategoriListele().subscribe((d:any) => {
      this.kategoriler = d;
      this.dataSource = new MatTableDataSource(this.kategoriler)
      this.dataSource.sort = this.sort;
    })
  }


  kategoriDuzenle(kat:Kategori){
    this.dialogRef = this.matDialog.open(KatDialogComponent,{
      width:'400px',
      data:{
        kayit:kat,
        islem:'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe((d:Kategori)=> {

      if(d){
        kat.katAdi = d.katAdi;
        this.servis.kategoriDuzenle(kat).subscribe((s:any) => {
          this.alert.alertUygula(s);
          
        });
      }
    });
  }

  kategoriSil(kat:Kategori){
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent,{
      width:'500px'
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = kat.katAdi + " isimli kategori silinecektir. Onaylıyor musunuz ?"
    this.confirmDialogRef.afterClosed().subscribe(d=> {
      if(d){
        this.servis.kategoriSil(kat.katId).subscribe((s:any) => {
          this.alert.alertUygula(s);
          if(s.islem){
            this.kategoriListele();
          }
        })
      }
    })
  }

  kategoriEkle(katAdi:string){
    var yeniKategori: Kategori = new Kategori();
    yeniKategori.katAdi = katAdi;
    this.servis.kategoriEkle(yeniKategori).subscribe((d:any)=> {
      this.alert.alertUygula(d);
      if(d.islem){
        this.kategoriListele();
      }
    })
  }


}
