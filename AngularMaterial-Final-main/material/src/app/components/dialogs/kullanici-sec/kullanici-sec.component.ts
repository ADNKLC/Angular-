import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Kullanici } from 'src/app/models/Kullanici';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { FotoYukleDialogComponent } from '../foto-yukle-dialog/foto-yukle-dialog.component';
import { KullaniciDialogComponent } from '../kullanici-dialog/kullanici-dialog.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-kullanici-sec',
  templateUrl: './kullanici-sec.component.html',
  styleUrls: ['./kullanici-sec.component.css']
})
export class KullaniciSecComponent implements OnInit {

  kullanicilar!: Kullanici[];
  displayedColumns = ['kullaniciId','kullaniciAdi','email','sifre','adSoyad','rol','islemler']
  dataSource!:any;
  @ViewChild(MatSort) sort!:MatSort;
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  fotodialogRef!:MatDialogRef<FotoYukleDialogComponent>;
  confirmDialogRef!:MatDialogRef<ConfirmDialogComponent>;

  constructor(
    public servis:ApiService,
    public matDialog:MatDialog,
    public alert:MyAlertService,
    public dialogRef:MatDialogRef<KullaniciDialogComponent>
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
    
    kullaniciSec(kullanici:Kullanici){
      this.dialogRef.close(kullanici);
    }
}
