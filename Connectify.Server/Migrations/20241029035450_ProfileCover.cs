using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Connectify.Server.Migrations
{
    /// <inheritdoc />
    public partial class ProfileCover : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Type",
                table: "Media",
                newName: "MediaType");

            migrationBuilder.AddColumn<string>(
                name: "ProfileCover",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProfileCover",
                table: "AspNetUsers");

            migrationBuilder.RenameColumn(
                name: "MediaType",
                table: "Media",
                newName: "Type");
        }
    }
}
