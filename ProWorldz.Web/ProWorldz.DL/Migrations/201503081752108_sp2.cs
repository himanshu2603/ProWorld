namespace ProWorldz.DL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class sp2 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Users", "Email", c => c.String(nullable: false));
            AddColumn("dbo.Users", "UserTypeId", c => c.Int(nullable: false));
            AddColumn("dbo.Users", "CreationDate", c => c.DateTime(nullable: false));
            AddColumn("dbo.Users", "ModificationDate", c => c.DateTime());
            AddColumn("dbo.Users", "CreatedBy", c => c.Int(nullable: false));
            AddColumn("dbo.Users", "ModifiedBy", c => c.Int());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Users", "ModifiedBy");
            DropColumn("dbo.Users", "CreatedBy");
            DropColumn("dbo.Users", "ModificationDate");
            DropColumn("dbo.Users", "CreationDate");
            DropColumn("dbo.Users", "UserTypeId");
            DropColumn("dbo.Users", "Email");
        }
    }
}
