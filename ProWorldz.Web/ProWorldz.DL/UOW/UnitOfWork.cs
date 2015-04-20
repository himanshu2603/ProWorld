using ProWorldz.DL.Models;
using ProWorldz.DL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProWorldz.DL.UOW
{
    public class UnitOfWork:IDisposable
    {

        private ProWorldzContext Context = new ProWorldzContext();
        private bool _dispose;

        private GenericRepository<User> userRepository;
        private GenericRepository<Country> countryRepository;
        private GenericRepository<Community> communityRepository;

        private GenericRepository<UserPost> userPostRepository;
        private GenericRepository<UserPostComment> userPostCommentRepository;
        private GenericRepository<UserGeneralInfomation> userGeneralInfomationRepository;
        private GenericRepository<UserPersonalInfomation> userPersonalInfomationRepository;
        private GenericRepository<UserProfessionalQualification> userProfessionalQualificationRepository;
        private GenericRepository<UserQualification> userQualificationRepository;

        public GenericRepository<UserPost> UserPostRepository
        {
            get
            {
                if (userPostRepository == null)
                    userPostRepository = new GenericRepository<UserPost>(Context);
                return userPostRepository;
            }
        }
        public GenericRepository<UserPostComment> UserPostCommentRepository
        {
            get
            {
                if (userPostCommentRepository == null)
                    userPostCommentRepository = new GenericRepository<UserPostComment>(Context);
                return userPostCommentRepository;
            }
        }
        public GenericRepository<UserGeneralInfomation> UserGeneralInfomationRepository
        {
            get
            {
                if (userGeneralInfomationRepository == null)
                    userGeneralInfomationRepository = new GenericRepository<UserGeneralInfomation>(Context);
                return userGeneralInfomationRepository;
            }
        }
        public GenericRepository<UserPersonalInfomation> UserPersonalInfomationRepository
        {
            get
            {
                if (userPersonalInfomationRepository == null)
                    userPersonalInfomationRepository = new GenericRepository<UserPersonalInfomation>(Context);
                return userPersonalInfomationRepository;
            }
        }
        public GenericRepository<UserProfessionalQualification> UserProfessionalQualificationRepository
        {
            get
            {
                if (userProfessionalQualificationRepository == null)
                    userProfessionalQualificationRepository = new GenericRepository<UserProfessionalQualification>(Context);
                return userProfessionalQualificationRepository;
            }
        }
        public GenericRepository<UserQualification> UserQualificationRepository
        {
            get
            {
                if (userQualificationRepository == null)
                    userQualificationRepository = new GenericRepository<UserQualification>(Context);
                return userQualificationRepository;
            }
        }







        public GenericRepository<User> UserRepository
        {
            get
            {
                if (userRepository == null)
                    userRepository = new GenericRepository<User>(Context);
                return userRepository;
            }
        }

        public GenericRepository<Country> CountryRepository
        {
            get
            {
                if (countryRepository == null)
                    countryRepository = new GenericRepository<Country>(Context);
                return countryRepository;
            }
        }

        public GenericRepository<Community> CommunityRepository
        {
            get
            {
                if (communityRepository == null)
                    communityRepository = new GenericRepository<Community>(Context);
                return communityRepository;
            }
        }
     
        public UnitOfWork()
        {
            _dispose = false;
        }
        public void Save()
        {
            Context.SaveChanges();
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        private void Dispose(bool disposing)
        {
            if (!_dispose)
            {

                if (disposing)
                {
                    Context.Dispose();
                }

            }
            _dispose = true;
        }
    }
}
