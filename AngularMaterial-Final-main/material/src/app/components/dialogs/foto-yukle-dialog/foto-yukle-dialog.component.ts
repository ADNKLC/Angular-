import { ApiService } from './../../../services/api.service';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Kullanici } from './../../../models/Kullanici';
import { KullaniciFoto } from './../../../models/KullaniciFoto';


@Component({
  selector: 'app-foto-yukle-dialog',
  templateUrl: './foto-yukle-dialog.component.html',
  styleUrls: ['./foto-yukle-dialog.component.css']
})
export class FotoYukleDialogComponent implements OnInit {

  secilenFoto!:any;
  kullaniciFoto:KullaniciFoto = new KullaniciFoto();
  seciliKullanici!:Kullanici;

  constructor(
    public fotoDialogRef:MatDialogRef<FotoYukleDialogComponent>,
     @Inject(MAT_DIALOG_DATA) public data:any,
    public servis:ApiService
  ) {
    this.seciliKullanici = this.data;
   }

  ngOnInit() {
  }

  fotoSec(e:any){
    var fotolar = e.target.files;
    var foto = fotolar[0];

    var fr = new FileReader();
    fr.onloadend=()=>{
      this.secilenFoto = fr.result;
      if (fr.result !== null) {
        this.kullaniciFoto.fotoData = fr.result.toString();
      }
      this.kullaniciFoto.fotoUzanti = foto.type;
    };
    fr.readAsDataURL(foto);
  }
}
