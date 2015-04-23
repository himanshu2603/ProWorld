using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProWorldz.BL.BusinessModel
{
    public class UserProfessionalQualificationBM : BaseBM
    {

        public int Id { get; set; }

        public int UserId { get; set; }
        [Required]
        public string CompanyName { get; set; }
        [Required]
        public DateTime StartDate { get; set; }
        [Required]
        public DateTime EndDate { get; set; }

        public DateTime Designation { get; set; }
        [Required]
        public Decimal Salary { get; set; }

    }
}
