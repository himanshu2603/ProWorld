using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProWorldz.DL.Models
{
  public  class UserProfessionalQualification:BaseClass
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey("User")]
        public int UserId { get; set; }

         public string CompanyName { get; set; }

         public DateTime StartDate { get; set; }

         public DateTime EndDate { get; set; }

         public DateTime Designation { get; set; }

         public Decimal Salary { get; set; }

         public virtual User User { get; set; }

       
    }
}
