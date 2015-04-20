using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProWorldz.BL.BusinessModel
{
  public  class UserQualificatinBM: BaseBM
    {
        
        public int Id { get; set; }

        
        public int UserId { get; set; }

        public string SchoolName { get; set; }

        public string Degree { get; set; }

        public string Percentage { get; set; }

        public string Description { get; set; }
    }
}
