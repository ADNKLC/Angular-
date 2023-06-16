import { Egitim } from "./Egitim";
import { Kullanici } from "./Kullanici";

export class Kayit {
    kayitId!:number;
    kayitKullaniciId!:number;
    kayitEgitimId!:number;
    kullaniciBilgi!:Kullanici;
    egitimBilgi!:Egitim;
}
