//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace vizeProjesi.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Yorum
    {
        public int yorumId { get; set; }
        public int yorumYapanId { get; set; }
        public int yorumYapilanEgitimId { get; set; }
        public string yorumIcerigi { get; set; }
    
        public virtual Egitim Egitim { get; set; }
        public virtual Kullanici Kullanici { get; set; }
    }
}
