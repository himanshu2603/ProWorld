using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProWorldz.BL.BusinessModel
{
   public class UserPersonalInformationBM :  BaseBM
    {
        public int Id { get; set; }

       
        public int UserId { get; set; }

        public string Address1 { get; set; }

        public string Address2 { get; set; }
        public int CountryId { get; set; }
       
        public int CityId { get; set; }
        public string Phone { get; set; }
      
        public int StateId { get; set; }
    }
}
