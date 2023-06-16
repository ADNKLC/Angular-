import { Egitim } from './../../../models/Egitim';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EgitimFoto } from './../../../models/EgitimFoto';
import { ApiService } from './../../../services/api.service';
import { FotoYukleDialogComponent } from '../foto-yukle-dialog/foto-yukle-dialog.component';

@Component({
  selector: 'app-foto-yukle-egitim-dialog',
  templateUrl: './foto-yukle-egitim-dialog.component.html',
  styleUrls: ['./foto-yukle-egitim-dialog.component.css']
})
export class FotoYukleEgitimDialogComponent implements OnInit {

  secilenFoto!:any;
  egitimFoto:EgitimFoto = new EgitimFoto();
  seciliEgitim!:Egitim;


  constructor(
    public fotoDialogRef:MatDialogRef<FotoYukleDialogComponent>,
     @Inject(MAT_DIALOG_DATA) public data:any,
    public servis:ApiService
  ) { 
    this.seciliEgitim = this.data;
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
        this.egitimFoto.fotoData = fr.result.toString();
      }
      this.egitimFoto.fotoUzanti = foto.type;
    };
    fr.readAsDataURL(foto);
  }
}
