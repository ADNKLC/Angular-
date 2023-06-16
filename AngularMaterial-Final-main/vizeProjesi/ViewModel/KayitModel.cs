using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace vizeProjesi.ViewModel
{
    public class KayitModel
    {
        public int kayitId { get; set; }
        public int kayitKullaniciId { get; set; }
        public int kayitEgitimId { get; set; }
        public KullaniciModel kullaniciBilgi { get; set; }
        public EgitimModel egitimBilgi { get; set; }
    }
}