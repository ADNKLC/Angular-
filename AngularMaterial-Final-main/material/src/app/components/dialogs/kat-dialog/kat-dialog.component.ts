import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Kategori } from 'src/app/models/Kategori';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-kat-dialog',
  templateUrl: './kat-dialog.component.html',
  styleUrls: ['./kat-dialog.component.css']
})
export class KatDialogComponent implements OnInit {

  form!:FormGroup;
  kayit!:Kategori;
  
  constructor(
    public servis:ApiService,
    public matDialog:MatDialog,
    public formBuild:FormBuilder,
    public dialogRef:MatDialogRef<KatDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {
    this.kayit = data.kayit;
    this.form = this.formOlustur();
   }

  ngOnInit() {
  }

  formOlustur(){
    return this.formBuild.group({
      katAdi:[this.kayit.katAdi]
    })
  }
}
