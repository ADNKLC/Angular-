using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace vizeProjesi.ViewModel
{
    public class EgitimModel
    {
        public int egitimId { get; set; }
        public string egitimAdi { get; set; }
        public int egitimKatId { get; set; }
        public string egitimKatAdi { get; set; }
        public int egitimiVerenId { get; set; }
        public KullaniciModel egitimiVerenKullanici { get; set; }
        public int egitimUcretliMi { get; set; }
        public string egitimFoto { get; set; }
        public string egitimAciklamasi { get; set; }
    }
}