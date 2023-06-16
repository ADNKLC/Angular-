import { MyAlertService } from './../../services/myAlert.service';
import { Sonuc } from './../../models/sonuc';
import { ConfirmDialogComponent } from './../dialogs/confirm-dialog/confirm-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  confirmDialogRef !: MatDialogRef<ConfirmDialogComponent>
  
  constructor(
    public alert: MyAlertService,
    public MatDialog: MatDialog
  ) { }

  ngOnInit() {
  }

  alertAc(p:boolean){
    var s: Sonuc = new Sonuc();
    this.alert.alertUygula(s);
  }

  confirmAc(){
    this.confirmDialogRef = this.MatDialog.open(ConfirmDialogComponent,{
      width:'400px'
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = "Kayıt Silinecektir Onaylıyor Musunuz ?"
    this.confirmDialogRef.afterClosed().subscribe(d=> {
      console.log(d)
      if(d){
        // true döndüğünde yapmasını istediğimiz şeyler (onay verildiğinde)
      }
    })
  }
}
