import { Kullanici } from "./Kullanici";

export class Egitim {
    egitimId!:number;
    egitimAdi!:string;
    egitimKatId!:number;
    egitimKatAdi!:string;
    egitimiVerenId!:number;
    egitimiVerenKullanici!:Kullanici;
    egitimUcretliMi!:number;
    egitimFoto!:string;
    egitimAciklamasi!:string;
}
