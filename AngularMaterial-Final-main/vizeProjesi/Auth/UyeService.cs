using vizeProjesi.Models;
using vizeProjesi.ViewModel;
using System.Linq;

namespace vizeProjesi.Auth
{
    public class UyeService
    {
        DatabaseProjeVizeEntities db = new DatabaseProjeVizeEntities();

        public KullaniciModel UyeOturumAc(string kadi, string parola)
        {
            KullaniciModel uye = db.Kullanici.Where(s => s.kullaniciAdi == kadi && s.sifre == parola).Select(x => new KullaniciModel()
            {
                kullaniciId = x.kullaniciId,
                adSoyad = x.adSoyad,
                email = x.email,
                kullaniciAdi = x.kullaniciAdi,
                foto = x.foto,
                sifre = x.sifre,
                rol = x.rol,
                
            }).SingleOrDefault();
            return uye;

        }
    }
}
