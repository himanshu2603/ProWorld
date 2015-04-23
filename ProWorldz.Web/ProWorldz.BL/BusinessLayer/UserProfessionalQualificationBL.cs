using ProWorldz.BL.BusinessModel;
using ProWorldz.DL.Models;
using ProWorldz.DL.UOW;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProWorldz.BL.BusinessLayer
{
   public class UserProfessionalQualificationBL
    {


          UnitOfWork uow;

          public UserProfessionalQualificationBL()
        {
            uow = new UnitOfWork();
        }
          public void Create(UserProfessionalQualificationBM model)
          {
              uow.UserProfessionalQualificationRepository.Add(ConvertToDM(model));
              uow.Save();
          }

          public List<UserProfessionalQualificationBM> GetProfessionalQualification()
        {
            return uow.UserProfessionalQualificationRepository.GetAll().ConvertAll<UserProfessionalQualificationBM>(new Converter<UserProfessionalQualification, UserProfessionalQualificationBM>(ConvertToBM));
        }

          public UserProfessionalQualificationBM GetProfessionalQualificationById(int id)
        {
            return ConvertToBM(uow.UserProfessionalQualificationRepository.GetByID(id));
        }

         public void CreateProfessionalQualification(UserProfessionalQualificationBM model)
        {
            uow.UserProfessionalQualificationRepository.Add(ConvertToDM(model));
            uow.Save();
        }

         public void Update(UserProfessionalQualificationBM model)
        {
            uow.UserProfessionalQualificationRepository.Update(ConvertToDM(model));
            uow.Save();
        }

         private UserProfessionalQualification ConvertToDM(UserProfessionalQualificationBM model)
        {
            return new UserProfessionalQualification
            {
                Id = model.Id,
                UserId = model.UserId,
                CompanyName = model.CompanyName,
                StartDate = model.StartDate,
                EndDate = model.EndDate,
                Designation = model.Designation,
                Salary = model.Salary,

                CreatedBy = model.CreatedBy,
                CreationDate = model.CreationDate,

                ModifiedBy = model.ModifiedBy,
                ModificationDate = model.ModificationDate
            };
        }

         private UserProfessionalQualificationBM ConvertToBM(UserProfessionalQualification model)
        {
            return new UserProfessionalQualificationBM()
            {
                Id = model.Id,
             UserId=model.UserId,
           CompanyName=model.CompanyName,
           StartDate=model.StartDate,
           EndDate=model.EndDate,
           Designation=model.Designation,
           Salary=model.Salary,

              CreatedBy=model.CreatedBy,
              CreationDate=model.CreationDate,

                ModifiedBy = model.ModifiedBy,
                ModificationDate = model.ModificationDate


            };
        }
    }
}
