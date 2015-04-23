using ProWorldz.BL.BusinessModel;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ProWorldz.Web.Models
{
    public class BaseModel
    {
        public string SucessMessage { get; set; }
        public string ErrorMessage { get; set; }
    }
    public class PostCommentModel:BaseModel
    {
        public UserPostBM UserPost { get; set; }

        public List<UserPostBM> UserPostList { get; set; }
    }
    public class ProfileModel:BaseModel
    {
        public UserGeneralInformationBM UserGeneralInformationModel { get; set; }
        public UserPersonalInformationBM UserPersonalInformationModel { get; set; }
        public UserProfessionalQualificationBM UserProfessionalQualificationModel { get; set; }
        public UserQualificatinBM UserQualificatinModel { get; set; }

        public List<CommunityBM> CommunityList { get; set; }
        public List<CommunityBM> SubCommunityList { get; set; }

        public List<CityBM> CityList { get; set; }
        public List<StateBM> StateList { get; set; }
        public List<CountryBM> CountryList { get; set; }
        public ProfileModel()
        {
            UserGeneralInformationModel = new UserGeneralInformationBM();
            UserPersonalInformationModel = new UserPersonalInformationBM();
            UserProfessionalQualificationModel = new UserProfessionalQualificationBM();
            UserQualificatinModel = new UserQualificatinBM();

        }
    }
    public class UserModel
    {
        public int Id { get; set; }

        [Required(ErrorMessage="Name enter please")]
        public string Name { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        
        public string Password { get; set; }

        public int UserTypeId { get; set; }

       
        public DateTime DOB { get; set; }


        public bool Active { get; set; }

        public bool Deleted { get; set; }

        public string Gender { get; set; }
       
        public System.DateTime CreationDate { get; set; }
       
        public Nullable<System.DateTime> ModificationDate { get; set; }
         
        public int CreatedBy { get; set; }
                
        public Nullable<int> ModifiedBy { get; set; }


        public int CommunityId { get; set; }

        public int SubCommunityId { get; set; }

        public int CommunityName { get; set; }

        public int SubCommunityName { get; set; }


        public List<CommunityBM> CommunityList { get; set; }
        public List<CommunityBM> SubCommunityList { get; set; }
    }
}