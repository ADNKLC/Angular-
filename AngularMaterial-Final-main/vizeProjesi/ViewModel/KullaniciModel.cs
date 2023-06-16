using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace vizeProjesi.ViewModel
{
    public class KullaniciModel
    {
        public int kullaniciId { get; set; }
        public string kullaniciAdi { get; set; }
        public string email { get; set; }
        public string sifre { get; set; }
        public string adSoyad { get; set; }
        public string foto { get; set; }
        public int rol { get; set; }
    }
}