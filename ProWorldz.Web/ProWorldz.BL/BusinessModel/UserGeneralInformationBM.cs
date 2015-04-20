using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProWorldz.BL.BusinessModel
{
    public class UserGeneralInformationBM : BaseBM
    {
        
        public int Id { get; set; }
       
        public int CommunityId { get; set; }


       
        public int UserId { get; set; }

        public int SubCommunityId { get; set; }

        public string Image { get; set; }
    }
}
