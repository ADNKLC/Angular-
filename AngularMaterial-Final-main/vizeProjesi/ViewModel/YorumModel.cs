using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace vizeProjesi.ViewModel
{
    public class YorumModel
    {
        public int yorumId { get; set; }
        public int yorumYapanId { get; set; }
        public KullaniciModel yorumYapanKullanici { get; set; }
        public int yorumYapilanEgitimId { get; set; }
        public string yorumYapilanEgitimAdi { get; set; }
        public string yorumIcerigi { get; set; }
    }
}