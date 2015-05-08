using ProWorldz.BL.BusinessLayer;
using ProWorldz.BL.BusinessModel;
using ProWorldz.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ProWorldz.Web.Controllers
{
    public class HomeController : Controller
    {
        UserPostBL UserPostBL = new UserPostBL();
        public ActionResult Index()
        {
            ViewBag.Message = "Modify this template to jump-start your ASP.NET MVC application.";

            UserBL userBL = new UserBL();

            return RedirectToAction("Login","Account");
        }
        public ActionResult UserPost()
        {
            PostCommentModel Model = new PostCommentModel();
            Model.UserPostList = UserPostBL.GetUserPost();
            Model.SucessMessage = (TempData["Success"] != null ? TempData["Success"].ToString() : string.Empty).ToString();
            Model.ErrorMessage =  (TempData["Error"] != null ? TempData["Error"].ToString() : string.Empty).ToString();
            return View(Model);
        }

        public ActionResult PostComment(PostCommentModel Model)
        {
            UserBM CurrentUser=(UserBM)Session["User"];
            if (CurrentUser != null)
            {
               
                UserPostBM UserPostBM = new UserPostBM();
                UserPostBM.Post = Model.UserPost.Post;
                UserPostBM.Subject = Model.UserPost.Subject;
                UserPostBM.UserId = CurrentUser.Id;
                UserPostBM.CreatedBy = CurrentUser.Id;
                UserPostBM.CreationDate = DateTime.Now;
                UserPostBL.Create(UserPostBM);
                TempData["Success"] = "Record saved Successfully.";
            }
            else
            {
                TempData["Error"] = "Please Login.";
            }
            return RedirectToAction("UserPost");
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
