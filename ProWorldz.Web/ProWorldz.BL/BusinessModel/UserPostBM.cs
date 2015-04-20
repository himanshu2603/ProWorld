using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProWorldz.BL.BusinessModel
{
   public class UserPostBM : BaseBM
    {
        
        public int Id { get; set; }

        
        public int UserId { get; set; }

        public string Subject { get; set; }

        public string Post { get; set; }
    }
}
