using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Connectify.Server.Migrations
{
    /// <inheritdoc />
    public partial class AllowNullForGroupId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Posts_AppGroups_GroupId",
                table: "Posts");

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_AppGroups_GroupId",
                table: "Posts",
                column: "GroupId",
                principalTable: "AppGroups",
                principalColumn: "GroupId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Posts_AppGroups_GroupId",
                table: "Posts");

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_AppGroups_GroupId",
                table: "Posts",
                column: "GroupId",
                principalTable: "AppGroups",
                principalColumn: "GroupId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
