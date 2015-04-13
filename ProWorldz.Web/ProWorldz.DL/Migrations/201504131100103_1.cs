namespace ProWorldz.DL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _1 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Cities",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false),
                        CountryId = c.Int(nullable: false),
                        Active = c.Boolean(nullable: false),
                        CreationDate = c.DateTime(nullable: false),
                        ModificationDate = c.DateTime(),
                        CreatedBy = c.Int(nullable: false),
                        ModifiedBy = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Countries", t => t.CountryId, cascadeDelete: true)
                .Index(t => t.CountryId);
            
            CreateTable(
                "dbo.Countries",
                c => new
                    {
                        CountryId = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false),
                        Active = c.Boolean(nullable: false),
                        CreationDate = c.DateTime(nullable: false),
                        ModificationDate = c.DateTime(),
                        CreatedBy = c.Int(nullable: false),
                        ModifiedBy = c.Int(),
                    })
                .PrimaryKey(t => t.CountryId);
            
            CreateTable(
                "dbo.Communities",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false),
                        ParentId = c.Int(nullable: false),
                        Active = c.Boolean(nullable: false),
                        CreationDate = c.DateTime(nullable: false),
                        ModificationDate = c.DateTime(),
                        CreatedBy = c.Int(nullable: false),
                        ModifiedBy = c.Int(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.UserTypes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false),
                        Active = c.Boolean(nullable: false),
                        CreationDate = c.DateTime(nullable: false),
                        ModificationDate = c.DateTime(),
                        CreatedBy = c.Int(nullable: false),
                        ModifiedBy = c.Int(),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.Users", "DOB", c => c.DateTime(nullable: false));
            AddColumn("dbo.Users", "Gender", c => c.String(nullable: false));
            AddColumn("dbo.Users", "CommunityId", c => c.Int(nullable: false));
            AddColumn("dbo.Users", "SubCommunityId", c => c.Int(nullable: false));
            AddColumn("dbo.Users", "CommunityName", c => c.Int(nullable: false));
            AddColumn("dbo.Users", "SubCommunityName", c => c.Int(nullable: false));
            DropColumn("dbo.Users", "Deleted");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Users", "Deleted", c => c.Boolean(nullable: false));
            DropForeignKey("dbo.Cities", "CountryId", "dbo.Countries");
            DropIndex("dbo.Cities", new[] { "CountryId" });
            DropColumn("dbo.Users", "SubCommunityName");
            DropColumn("dbo.Users", "CommunityName");
            DropColumn("dbo.Users", "SubCommunityId");
            DropColumn("dbo.Users", "CommunityId");
            DropColumn("dbo.Users", "Gender");
            DropColumn("dbo.Users", "DOB");
            DropTable("dbo.UserTypes");
            DropTable("dbo.Communities");
            DropTable("dbo.Countries");
            DropTable("dbo.Cities");
        }
    }
}
