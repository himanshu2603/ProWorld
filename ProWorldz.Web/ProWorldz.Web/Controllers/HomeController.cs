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


            //UserBL objBL = new UserBL();
            //UserBM objBM = new UserBM();

            //objBM.Name = "Nitin";
            //objBM.Email = "nitinkumar0107@gmail.com";
            //objBM.Active = true;
            //objBM.Deleted = false;
            //objBM.CreatedBy = 1;
            //objBM.Password = "123456";

            //objBL.CreateUser(objBM);

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
