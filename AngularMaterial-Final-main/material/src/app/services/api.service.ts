import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Kullanici } from '../models/Kullanici';
import { Egitim } from '../models/Egitim';
import { Kategori } from '../models/Kategori';
import { Kayit } from '../models/Kayit';
import { KullaniciFoto } from '../models/KullaniciFoto';
import { EgitimFoto } from '../models/EgitimFoto';
import { Yorum } from '../models/Yorum';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl = "https://localhost:44362/api/";
  siteUrl = "https://localhost:44362/"
constructor(
  public http:HttpClient
) { }

  

// KULLANICI İŞLEMLERİ

  kullaniciListele(){
    return this.http.get(this.apiUrl+"kullanicilistele")
  }
  kullaniciById(kullaniciId:number){
    return this.http.get(this.apiUrl+"kullanicibyid/"+ kullaniciId)
  }
  kullaniciEkle(kullanici:Kullanici){
    return this.http.post(this.apiUrl+"kullaniciekle",kullanici)
  }
  kullaniciDuzenle(kullanici:Kullanici){
    return this.http.put(this.apiUrl+"kullaniciduzenle",kullanici)
  }
  kullaniciSil(kullaniciId:number){
    return this.http.delete(this.apiUrl+"kullanicisil/"+kullaniciId)
  }

  kullaniciFotoGuncelle(kullaniciFoto:KullaniciFoto){
    return this.http.post(this.apiUrl + "kullanicifotoguncelle",kullaniciFoto)
  }


  // EĞİTİM İŞLEMLERİ

  egitimListele(){
    return this.http.get(this.apiUrl+"egitimlistele")
  }
  egitimById(egitimId:number){
    return this.http.get(this.apiUrl+"egitimbyid/"+ egitimId)
  }
  egitimByKatId(egitimKatId:number){
    return this.http.get(this.apiUrl+"egitimbykatid/"+ egitimKatId)
  }
  egitimByEgitmenId(egitimEgitmenId:number){
    return this.http.get(this.apiUrl+"egitimByEgitmenId/"+ egitimEgitmenId)
  }
  egitimEkle(egitim:Egitim){
    return this.http.post(this.apiUrl+"egitimekle",egitim)
  }
  egitimDuzenle(egitim:Egitim){
    return this.http.put(this.apiUrl+"egitimduzenle",egitim)
  }
  egitimSil(egitimId:number){
    return this.http.delete(this.apiUrl+"egitimsil/"+egitimId)
  }

  egitimFotoGuncelle(egitimFoto:EgitimFoto){
    return this.http.post(this.apiUrl + "egitimfotoguncelle",egitimFoto)
  }


  // KATEGORİ İŞLEMLERİ

  kategoriListele(){
    return this.http.get(this.apiUrl+"kategorilistele")
  }
  kategoriById(kategoriId:number){
    return this.http.get(this.apiUrl+"kategoriById/"+ kategoriId)
  }
  kategoriEkle(kategori:Kategori){
    return this.http.post(this.apiUrl+"kategoriekle",kategori)
  }
  kategoriDuzenle(kategori:Kategori){
    return this.http.put(this.apiUrl+"kategoriduzenle",kategori)
  }
  kategoriSil(kategoriId:number){
    return this.http.delete(this.apiUrl+"kategorisil/"+kategoriId)
  }



  // Kayıtlar

  kullaniciEgitimleriListele(kullaniciId:number){
    return this.http.get(this.apiUrl+"kullaniciegitimlistele/"+kullaniciId)
    // Eğitim Modellerden oluşan liste döndürür.
  }

  kullaniciEgitimleriListeleKayit(kullaniciId:number){
    return this.http.get(this.apiUrl+"kullaniciegitimlistelek/"+kullaniciId)
    // Kayıt Modellerden oluşan liste döndürür.
  }

  egitimKullanicilariListele(egitimId:number){
    return this.http.get(this.apiUrl+"egitimkullanicilistele/"+egitimId)
    // Kullanıcı Modellerden oluşan liste döndürür.
  }

  egitimKullanicilariListeleKayit(egitimId:number){
    return this.http.get(this.apiUrl+"egitimkullanicilistelek/"+egitimId)
    // Kayıt Modellerden oluşan liste döndürür.
  }

  kayitYap(kayit:Kayit){
    return this.http.post(this.apiUrl+"kayitekle",kayit)
  }

  kayitSil(kayitId:number){
    console.log("GELEN ID "+ kayitId)
    return this.http.delete(this.apiUrl+"kayitSil/" + kayitId)
  }

  egitmenEgitimleriListele(egitmenId:number){   
    return this.http.get(this.apiUrl + "egitmenegitimlistele/" + egitmenId)
  }

  // Oturum

  tokenAl(kAdi:string,parola:string){
    var data = "username="+kAdi+"&password="+parola+"&grant_type=password";
    var reqHeader = new HttpHeaders({"Content-Type":"application/x-www-form-urlencoded"});
    return this.http.post(this.apiUrl +"token",data,{headers:reqHeader});
  }

  oturumKontrol(){
    if(localStorage.getItem("token")){
      return true;
    } else{
      return false;
    }
  }

  yetkiKontrol(yetkiler:any){
    var sonuc: boolean = false;
    var uyeYetkiler: string[] | null = JSON.parse(localStorage.getItem("uyeYetkileri") || "null");

    if(uyeYetkiler !== null){
      yetkiler.forEach((element:any) => {
        if(uyeYetkiler!== null){
          if(uyeYetkiler.indexOf(element) > -1){
            sonuc = true;
          }
        }
        
      });
    }
    return sonuc;
  }
  
  // Yorumlar

  yorumListele(){
    return this.http.get(this.apiUrl+"yorumlistele")
  }

  yorumListeleByEgitim(egitimId:number){
    return this.http.get(this.apiUrl+"yorumbyegitim/"+ egitimId)
  }

  yorumListeleByKullanici(kullaniciId:number){
    return this.http.get(this.apiUrl+"yorumbykullanici/"+ kullaniciId)
  }

  yorumEkle(yorum:Yorum){
    return this.http.post(this.apiUrl+"yorumekle",yorum)
  }

  yorumSil(yorumId:number){
    return this.http.delete(this.apiUrl+"yorumsil/"+yorumId)
  }
}
