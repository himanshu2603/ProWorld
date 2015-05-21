namespace ProWorldz.DL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class desiChanga : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.UserProfessionalQualifications", "Designation", c => c.DateTime(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.UserProfessionalQualifications", "Designation", c => c.Int(nullable: false));
        }
    }
}
