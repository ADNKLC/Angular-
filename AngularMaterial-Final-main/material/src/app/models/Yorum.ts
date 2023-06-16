import { Kullanici } from "./Kullanici";

export class Yorum {
    yorumId!:number;
    yorumYapanId!:number;
    yorumYapanKullanici!:Kullanici;
    yorumYapilanEgitimId!:number;
    yorumYapilanEgitimAdi!:string;
    yorumIcerigi!:string;
}
