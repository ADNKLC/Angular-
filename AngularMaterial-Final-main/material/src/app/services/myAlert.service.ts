import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Sonuc } from '../models/sonuc';
import { AlertDialogComponent } from '../components/dialogs/alert-dialog/alert-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class MyAlertService {

  alertDialogRef: MatDialogRef<AlertDialogComponent> | null = null; // alert diaoloğumuzu referans aldık alertdialog component oldugunu söyledik

constructor(
  public matDiaolog : MatDialog // matdialog tanımladık
) { }

  alertUygula(s:Sonuc){
    var baslik = "";
    if(s.islem){ // Sonuc değişkeni boolean ve true dönerse buraya girecek
      baslik = "İşlem Tamam"
    } else{
      baslik = "Hata"
    }

    this.alertDialogRef = this.matDiaolog.open(AlertDialogComponent,{
      width:'300px'
    });
    
    this.alertDialogRef.componentInstance.dialogBaslik = baslik;
    this.alertDialogRef.componentInstance.dialogMesaj= s.mesaj;
    this.alertDialogRef.componentInstance.dialogIslem = s.islem;
    
    this.alertDialogRef.afterClosed().subscribe(d=> {
      this.alertDialogRef = null;
    });
  }
}
