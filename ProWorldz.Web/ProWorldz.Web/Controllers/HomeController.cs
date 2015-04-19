using ProWorldz.BL.BusinessLayer;
using ProWorldz.BL.BusinessModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ProWorldz.Web.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Message = "Modify this template to jump-start your ASP.NET MVC application.";

            UserBL userBL = new UserBL();

           // UserBM userBM = new UserBM();
           // userBM.Name = "Himanshu";
           // userBM.Email = "test@test.com";
           // userBM.Password = "123123";
           // userBM.UserTypeId = 1;
           // userBM.DOB = DateTime.Now.Date;
           // userBM.CreationDate =  DateTime.Now.Date;
           // userBM.ModificationDate = DateTime.Now.Date;
           // userBM.Gender = "M";
           // userBM.Active = true;
           // userBM.CommunityId = 1;
           // userBM.SubCommunityId = 1;
           // userBM.CommunityName = 1;
           // userBM.SubCommunityName = 1;
           // userBM.CreatedBy = 1;
           // userBM.ModifiedBy = 1;
           //userBL.Create(userBM);
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your app description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}
