using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Connectify.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddFileTypeCol : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "Media",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Type",
                table: "Media");
        }
    }
}
