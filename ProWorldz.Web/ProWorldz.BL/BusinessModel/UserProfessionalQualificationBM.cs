using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProWorldz.BL.BusinessModel
{
   public class UserProfessionalQualificationBM :BaseBM
    {
        
        public int Id { get; set; }
        
        public int UserId { get; set; }

        public string CompanyName { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public DateTime Designation { get; set; }

        public Decimal Salary { get; set; }

    }
}
