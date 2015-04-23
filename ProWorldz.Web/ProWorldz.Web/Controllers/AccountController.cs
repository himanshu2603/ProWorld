using System;
using System.Collections.Generic;
using System.Linq;
using System.Transactions;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using DotNetOpenAuth.AspNet;
using Microsoft.Web.WebPages.OAuth;
using WebMatrix.WebData;
using ProWorldz.Web.Filters;
using ProWorldz.Web.Models;
using ProWorldz.BL.BusinessLayer;
using ProWorldz.BL.BusinessModel;

namespace ProWorldz.Web.Controllers
{

    public class AccountController : Controller
    {
        //
        // GET: /Account/Login
        UserGeneralInformationBL UserGeneralInformationBL = new BL.BusinessLayer.UserGeneralInformationBL();
        UserPersonalInformationBL UserPersonalInformationBL = new BL.BusinessLayer.UserPersonalInformationBL();
        UserProfessionalQualificationBL UserProfessionalQualificationBL = new BL.BusinessLayer.UserProfessionalQualificationBL();
        UserQualificationBL UserQualificationBL = new BL.BusinessLayer.UserQualificationBL();
        public ActionResult Test()
        {

            UserModel Model = new UserModel();

            //    List<string> mylist = new List<string>({Id= "element1",Name= "element2" });
            CommunityBL CommunityBL = new BL.BusinessLayer.CommunityBL();

            Model.CommunityList = CommunityBL.GetCommunity().Where(o => o.ParentId == 0).ToList();

            Model.SubCommunityList = CommunityBL.GetCommunity().Where(o => o.ParentId != 0).ToList();
            return View(Model);
        }
        public ActionResult Login(string returnUrl)
        {
            LoginModel Model = new LoginModel();
            Model.SucessMessage = (TempData["Success"] != null ? TempData["Success"].ToString() : string.Empty).ToString();
            Model.ErrorMessage = (TempData["Error"] != null ? TempData["Error"].ToString() : string.Empty).ToString();

            return View(Model);
        }
        [HttpPost]
        public ActionResult LoginUser(LoginModel Model)
        {
            UserBL UserBL = new BL.BusinessLayer.UserBL();
            UserBM User = UserBL.GetUsers().Where(p => p.Email == Model.Email && p.Password == Model.Password).FirstOrDefault();
            if (User != null)
            {
                Session["User"] = User;
                FormsAuthentication.SetAuthCookie(User.Name, false);
                return RedirectToAction("Profile");
            }
            else
            {
                TempData["Error"] = "Invalid username and password";
                return RedirectToAction("Login");
            }

            return RedirectToAction("Login");
        }

        public ActionResult Profile()
        {
            CommunityBL CommunityBL = new BL.BusinessLayer.CommunityBL();
            CountryBL CountryBL = new BL.BusinessLayer.CountryBL();
            StateBL StateBL = new BL.BusinessLayer.StateBL();
            CityBL CityBL = new BL.BusinessLayer.CityBL();
            ProfileModel Model = new ProfileModel();


            Model.SucessMessage = (TempData["Success"] != null ? TempData["Success"].ToString() : string.Empty).ToString();
            Model.ErrorMessage = (TempData["Error"] != null ? TempData["Error"].ToString() : string.Empty).ToString();

            if (Session["User"] != null)
            {

                UserBM CurrentUser = (UserBM)Session["User"];
                List<UserGeneralInformationBM> GenerealInfoList = UserGeneralInformationBL.GetGeneralInformation().Where(p => p.UserId == CurrentUser.Id).ToList();
                if (GenerealInfoList.Count > 0)
                    Model.UserGeneralInformationModel = GenerealInfoList.FirstOrDefault();
                if (Model.UserGeneralInformationModel == null)
                    Model.UserGeneralInformationModel = new UserGeneralInformationBM();



               




                

                Model.CommunityList = CommunityBL.GetCommunity().Where(o => o.ParentId == 0).ToList();

                Model.SubCommunityList = CommunityBL.GetCommunity().Where(o => o.ParentId != 0).ToList();
                Model.CountryList = CountryBL.GetCountry();
                Model.StateList = StateBL.GetState();
                Model.CityList = CityBL.GetCities();

                return View(Model);
            }
            return RedirectToAction("Login");
        }
        [HttpPost]
        public ActionResult ForgotPassword(LoginModel Model)
        {
            TempData["Success"] = "Password Has been send on your emal.";
            return RedirectToAction("Login");
        }

        public ActionResult UpdateGeneralInformation(ProfileModel Model, HttpPostedFileBase file)
        {
            UserBM CurrentUser = (UserBM)Session["User"];
            if (CurrentUser != null)
            {
                if (file != null)
                {
                    UserGeneralInformationBL UserGeneralInformationBL = new BL.BusinessLayer.UserGeneralInformationBL();

                    string ImageName = System.IO.Path.GetFileName(file.FileName);
                    string physicalPath = Server.MapPath("~/Images/" + ImageName);
                    file.SaveAs(physicalPath);
                    UserGeneralInformationBM UserGeneralInformation = new UserGeneralInformationBM();
                    UserGeneralInformation.CommunityId = Model.UserGeneralInformationModel.CommunityId;
                    UserGeneralInformation.SubCommunityId = Model.UserGeneralInformationModel.SubCommunityId;
                    UserGeneralInformation.Image = "/Images/" + ImageName;
                    UserGeneralInformation.UserId = CurrentUser.Id;
                    UserGeneralInformation.CreatedBy = CurrentUser.Id;
                    UserGeneralInformation.CreationDate = DateTime.Now;
                    UserGeneralInformationBL.Create(UserGeneralInformation);
                    TempData["Success"] = "Record saved Successfully.";
                }
            }
            else
            {
                TempData["Error"] = "Please Login.";
            }

            return RedirectToAction("Profile");
        }



        public ActionResult UpdatePersonalInformation(ProfileModel Model)
        {
            UserBM CurrentUser = (UserBM)Session["User"];
            if (CurrentUser != null)
            {

                UserPersonalInformationBM UserPersonalInformationBM = new UserPersonalInformationBM();
                UserPersonalInformationBM.CountryId = Model.UserPersonalInformationModel.CountryId;
                UserPersonalInformationBM.StateId = Model.UserPersonalInformationModel.StateId;
                UserPersonalInformationBM.CityId = Model.UserPersonalInformationModel.CityId;
                UserPersonalInformationBM.Phone = Model.UserPersonalInformationModel.Phone;
                UserPersonalInformationBM.Address1 = Model.UserPersonalInformationModel.Address1;
                UserPersonalInformationBM.Address2 = Model.UserPersonalInformationModel.Address2;
                UserPersonalInformationBM.UserId = CurrentUser.Id;
                UserPersonalInformationBM.CreatedBy = CurrentUser.Id;
                UserPersonalInformationBM.CreationDate = DateTime.Now;
                UserPersonalInformationBL.Create(UserPersonalInformationBM);
                    TempData["Success"] = "Record saved Successfully.";
                
            }
            else
            {
                TempData["Error"] = "Please Login.";
            }

            return RedirectToAction("Profile");
        }

        public ActionResult UserProfessionalQualification(ProfileModel Model)
        {
            UserBM CurrentUser = (UserBM)Session["User"];
            if (CurrentUser != null)
            {

                UserProfessionalQualificationBM UserProfessionalQualificationBM = new UserProfessionalQualificationBM();
                UserProfessionalQualificationBM.CompanyName = Model.UserProfessionalQualificationModel.CompanyName;
                UserProfessionalQualificationBM.StartDate = Model.UserProfessionalQualificationModel.StartDate;
                UserProfessionalQualificationBM.EndDate = Model.UserProfessionalQualificationModel.EndDate;
                UserProfessionalQualificationBM.Designation = DateTime.Now;//Note remove DS
                UserProfessionalQualificationBM.Salary = Model.UserProfessionalQualificationModel.Salary;
              
                UserProfessionalQualificationBM.UserId = CurrentUser.Id;
                UserProfessionalQualificationBM.CreatedBy = CurrentUser.Id;
                UserProfessionalQualificationBM.CreationDate = DateTime.Now;
                UserProfessionalQualificationBL.Create(UserProfessionalQualificationBM);
                TempData["Success"] = "Record saved Successfully.";

            }
            else
            {
                TempData["Error"] = "Please Login.";
            }

            return RedirectToAction("Profile");
        }




        public ActionResult UserQualification(ProfileModel Model)
        {
            UserBM CurrentUser = (UserBM)Session["User"];
            if (CurrentUser != null)
            {

                UserQualificatinBM UserQualificatinBM = new UserQualificatinBM();
                UserQualificatinBM.SchoolName = Model.UserQualificatinModel.SchoolName;
                UserQualificatinBM.Degree = Model.UserQualificatinModel.Degree;
                UserQualificatinBM.Percentage = Model.UserQualificatinModel.Percentage;
                UserQualificatinBM.Description = Model.UserQualificatinModel.Description;
              

                UserQualificatinBM.UserId = CurrentUser.Id;
                UserQualificatinBM.CreatedBy = CurrentUser.Id;
                UserQualificatinBM.CreationDate = DateTime.Now;
                UserQualificationBL.Create(UserQualificatinBM);
                TempData["Success"] = "Record saved Successfully.";

            }
            else
            {
                TempData["Error"] = "Please Login.";
            }

            return RedirectToAction("Profile");
        }

       
        public ActionResult LogOff()
        {
            FormsAuthentication.SignOut();

            return RedirectToAction("Login", "Account");
        }

        //
        // GET: /Account/Register

        [AllowAnonymous]
        public ActionResult Register()
        {

            UserModel Model = new UserModel();

            //    List<string> mylist = new List<string>({Id= "element1",Name= "element2" });
            CommunityBL CommunityBL = new BL.BusinessLayer.CommunityBL();

            Model.CommunityList = CommunityBL.GetCommunity().Where(o => o.ParentId == 0).ToList();

            Model.SubCommunityList = CommunityBL.GetCommunity().Where(o => o.ParentId != 0).ToList();
            return View(Model);
        }

        //
        // POST: /Account/Register

        [HttpPost]
        public ActionResult Test(UserModel model, FormCollection collection)
        {

            UserBL userBL = new UserBL();
            UserBM userBM = new UserBM();
            userBM.Name = model.Name;
            userBM.Email = model.Email;
            userBM.Password = model.Password;
            userBM.UserTypeId = Convert.ToInt32(collection["UserType"].ToString());
            userBM.DOB = DateTime.Now;
            userBM.CreationDate = DateTime.Now.Date;
            userBM.ModificationDate = DateTime.Now.Date;

            string gender = collection["gender"].ToString();
            userBM.Gender = "M";
            userBM.Active = true;
            userBM.CommunityId = model.CommunityId;
            userBM.SubCommunityId = model.SubCommunityId;
            userBM.CommunityName = 1;
            userBM.SubCommunityName = 1;
            userBM.CreatedBy = 1;
            userBM.ModifiedBy = 1;

            userBL.Create(userBM);
            // If we got this far, something failed, redisplay form
            return RedirectToAction("Register");
        }

        //
        // POST: /Account/Disassociate

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Disassociate(string provider, string providerUserId)
        {
            string ownerAccount = OAuthWebSecurity.GetUserName(provider, providerUserId);
            ManageMessageId? message = null;

            // Only disassociate the account if the currently logged in user is the owner
            if (ownerAccount == User.Identity.Name)
            {
                // Use a transaction to prevent the user from deleting their last login credential
                using (var scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = IsolationLevel.Serializable }))
                {
                    bool hasLocalAccount = OAuthWebSecurity.HasLocalAccount(WebSecurity.GetUserId(User.Identity.Name));
                    if (hasLocalAccount || OAuthWebSecurity.GetAccountsFromUserName(User.Identity.Name).Count > 1)
                    {
                        OAuthWebSecurity.DeleteAccount(provider, providerUserId);
                        scope.Complete();
                        message = ManageMessageId.RemoveLoginSuccess;
                    }
                }
            }

            return RedirectToAction("Manage", new { Message = message });
        }

        //
        // GET: /Account/Manage

        public ActionResult Manage(ManageMessageId? message)
        {
            ViewBag.StatusMessage =
                message == ManageMessageId.ChangePasswordSuccess ? "Your password has been changed."
                : message == ManageMessageId.SetPasswordSuccess ? "Your password has been set."
                : message == ManageMessageId.RemoveLoginSuccess ? "The external login was removed."
                : "";
            ViewBag.HasLocalPassword = OAuthWebSecurity.HasLocalAccount(WebSecurity.GetUserId(User.Identity.Name));
            ViewBag.ReturnUrl = Url.Action("Manage");
            return View();
        }

        //
        // POST: /Account/Manage

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Manage(LocalPasswordModel model)
        {
            bool hasLocalAccount = OAuthWebSecurity.HasLocalAccount(WebSecurity.GetUserId(User.Identity.Name));
            ViewBag.HasLocalPassword = hasLocalAccount;
            ViewBag.ReturnUrl = Url.Action("Manage");
            if (hasLocalAccount)
            {
                if (ModelState.IsValid)
                {
                    // ChangePassword will throw an exception rather than return false in certain failure scenarios.
                    bool changePasswordSucceeded;
                    try
                    {
                        changePasswordSucceeded = WebSecurity.ChangePassword(User.Identity.Name, model.OldPassword, model.NewPassword);
                    }
                    catch (Exception)
                    {
                        changePasswordSucceeded = false;
                    }

                    if (changePasswordSucceeded)
                    {
                        return RedirectToAction("Manage", new { Message = ManageMessageId.ChangePasswordSuccess });
                    }
                    else
                    {
                        ModelState.AddModelError("", "The current password is incorrect or the new password is invalid.");
                    }
                }
            }
            else
            {
                // User does not have a local password so remove any validation errors caused by a missing
                // OldPassword field
                ModelState state = ModelState["OldPassword"];
                if (state != null)
                {
                    state.Errors.Clear();
                }

                if (ModelState.IsValid)
                {
                    try
                    {
                        WebSecurity.CreateAccount(User.Identity.Name, model.NewPassword);
                        return RedirectToAction("Manage", new { Message = ManageMessageId.SetPasswordSuccess });
                    }
                    catch (Exception)
                    {
                        ModelState.AddModelError("", String.Format("Unable to create local account. An account with the name \"{0}\" may already exist.", User.Identity.Name));
                    }
                }
            }

            // If we got this far, something failed, redisplay form
            return View(model);
        }

        //
        // POST: /Account/ExternalLogin

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public ActionResult ExternalLogin(string provider, string returnUrl)
        {
            return new ExternalLoginResult(provider, Url.Action("ExternalLoginCallback", new { ReturnUrl = returnUrl }));
        }

        //
        // GET: /Account/ExternalLoginCallback

        [AllowAnonymous]
        public ActionResult ExternalLoginCallback(string returnUrl)
        {
            AuthenticationResult result = OAuthWebSecurity.VerifyAuthentication(Url.Action("ExternalLoginCallback", new { ReturnUrl = returnUrl }));
            if (!result.IsSuccessful)
            {
                return RedirectToAction("ExternalLoginFailure");
            }

            if (OAuthWebSecurity.Login(result.Provider, result.ProviderUserId, createPersistentCookie: false))
            {
                return RedirectToLocal(returnUrl);
            }

            if (User.Identity.IsAuthenticated)
            {
                // If the current user is logged in add the new account
                OAuthWebSecurity.CreateOrUpdateAccount(result.Provider, result.ProviderUserId, User.Identity.Name);
                return RedirectToLocal(returnUrl);
            }
            else
            {
                // User is new, ask for their desired membership name
                string loginData = OAuthWebSecurity.SerializeProviderUserId(result.Provider, result.ProviderUserId);
                ViewBag.ProviderDisplayName = OAuthWebSecurity.GetOAuthClientData(result.Provider).DisplayName;
                ViewBag.ReturnUrl = returnUrl;
                return View("ExternalLoginConfirmation", new RegisterExternalLoginModel { UserName = result.UserName, ExternalLoginData = loginData });
            }
        }

        //
        // POST: /Account/ExternalLoginConfirmation

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public ActionResult ExternalLoginConfirmation(RegisterExternalLoginModel model, string returnUrl)
        {
            string provider = null;
            string providerUserId = null;

            if (User.Identity.IsAuthenticated || !OAuthWebSecurity.TryDeserializeProviderUserId(model.ExternalLoginData, out provider, out providerUserId))
            {
                return RedirectToAction("Manage");
            }

            if (ModelState.IsValid)
            {
                // Insert a new user into the database
                using (UsersContext db = new UsersContext())
                {
                    UserProfile user = db.UserProfiles.FirstOrDefault(u => u.UserName.ToLower() == model.UserName.ToLower());
                    // Check if user already exists
                    if (user == null)
                    {
                        // Insert name into the profile table
                        db.UserProfiles.Add(new UserProfile { UserName = model.UserName });
                        db.SaveChanges();

                        OAuthWebSecurity.CreateOrUpdateAccount(provider, providerUserId, model.UserName);
                        OAuthWebSecurity.Login(provider, providerUserId, createPersistentCookie: false);

                        return RedirectToLocal(returnUrl);
                    }
                    else
                    {
                        ModelState.AddModelError("UserName", "User name already exists. Please enter a different user name.");
                    }
                }
            }

            ViewBag.ProviderDisplayName = OAuthWebSecurity.GetOAuthClientData(provider).DisplayName;
            ViewBag.ReturnUrl = returnUrl;
            return View(model);
        }

        //
        // GET: /Account/ExternalLoginFailure

        [AllowAnonymous]
        public ActionResult ExternalLoginFailure()
        {
            return View();
        }

        [AllowAnonymous]
        [ChildActionOnly]
        public ActionResult ExternalLoginsList(string returnUrl)
        {
            ViewBag.ReturnUrl = returnUrl;
            return PartialView("_ExternalLoginsListPartial", OAuthWebSecurity.RegisteredClientData);
        }

        [ChildActionOnly]
        public ActionResult RemoveExternalLogins()
        {
            ICollection<OAuthAccount> accounts = OAuthWebSecurity.GetAccountsFromUserName(User.Identity.Name);
            List<ExternalLogin> externalLogins = new List<ExternalLogin>();
            foreach (OAuthAccount account in accounts)
            {
                AuthenticationClientData clientData = OAuthWebSecurity.GetOAuthClientData(account.Provider);

                externalLogins.Add(new ExternalLogin
                {
                    Provider = account.Provider,
                    ProviderDisplayName = clientData.DisplayName,
                    ProviderUserId = account.ProviderUserId,
                });
            }

            ViewBag.ShowRemoveButton = externalLogins.Count > 1 || OAuthWebSecurity.HasLocalAccount(WebSecurity.GetUserId(User.Identity.Name));
            return PartialView("_RemoveExternalLoginsPartial", externalLogins);
        }

        #region Helpers
        private ActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            else
            {
                return RedirectToAction("Index", "Home");
            }
        }

        public enum ManageMessageId
        {
            ChangePasswordSuccess,
            SetPasswordSuccess,
            RemoveLoginSuccess,
        }

        internal class ExternalLoginResult : ActionResult
        {
            public ExternalLoginResult(string provider, string returnUrl)
            {
                Provider = provider;
                ReturnUrl = returnUrl;
            }

            public string Provider { get; private set; }
            public string ReturnUrl { get; private set; }

            public override void ExecuteResult(ControllerContext context)
            {
                OAuthWebSecurity.RequestAuthentication(Provider, ReturnUrl);
            }
        }

        private static string ErrorCodeToString(MembershipCreateStatus createStatus)
        {
            // See http://go.microsoft.com/fwlink/?LinkID=177550 for
            // a full list of status codes.
            switch (createStatus)
            {
                case MembershipCreateStatus.DuplicateUserName:
                    return "User name already exists. Please enter a different user name.";

                case MembershipCreateStatus.DuplicateEmail:
                    return "A user name for that e-mail address already exists. Please enter a different e-mail address.";

                case MembershipCreateStatus.InvalidPassword:
                    return "The password provided is invalid. Please enter a valid password value.";

                case MembershipCreateStatus.InvalidEmail:
                    return "The e-mail address provided is invalid. Please check the value and try again.";

                case MembershipCreateStatus.InvalidAnswer:
                    return "The password retrieval answer provided is invalid. Please check the value and try again.";

                case MembershipCreateStatus.InvalidQuestion:
                    return "The password retrieval question provided is invalid. Please check the value and try again.";

                case MembershipCreateStatus.InvalidUserName:
                    return "The user name provided is invalid. Please check the value and try again.";

                case MembershipCreateStatus.ProviderError:
                    return "The authentication provider returned an error. Please verify your entry and try again. If the problem persists, please contact your system administrator.";

                case MembershipCreateStatus.UserRejected:
                    return "The user creation request has been canceled. Please verify your entry and try again. If the problem persists, please contact your system administrator.";

                default:
                    return "An unknown error occurred. Please verify your entry and try again. If the problem persists, please contact your system administrator.";
            }
        }
        #endregion
    }
}
