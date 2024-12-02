using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Connectify.Server.Migrations
{
    /// <inheritdoc />
    public partial class FixPostForeignKey : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PostReports_Posts_post_id",
                table: "PostReports");

            migrationBuilder.DropForeignKey(
                name: "FK_PostSaves_Posts_post_id",
                table: "PostSaves");

            migrationBuilder.AddForeignKey(
                name: "FK_PostReports_Posts_post_id",
                table: "PostReports",
                column: "post_id",
                principalTable: "Posts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PostSaves_Posts_post_id",
                table: "PostSaves",
                column: "post_id",
                principalTable: "Posts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PostReports_Posts_post_id",
                table: "PostReports");

            migrationBuilder.DropForeignKey(
                name: "FK_PostSaves_Posts_post_id",
                table: "PostSaves");

            migrationBuilder.AddForeignKey(
                name: "FK_PostReports_Posts_post_id",
                table: "PostReports",
                column: "post_id",
                principalTable: "Posts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PostSaves_Posts_post_id",
                table: "PostSaves",
                column: "post_id",
                principalTable: "Posts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
