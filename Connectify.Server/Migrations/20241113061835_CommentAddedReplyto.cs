using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Connectify.Server.Migrations
{
    /// <inheritdoc />
    public partial class CommentAddedReplyto : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ReplyToUserId",
                table: "Comments",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Comments_ReplyToUserId",
                table: "Comments",
                column: "ReplyToUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_AspNetUsers_ReplyToUserId",
                table: "Comments",
                column: "ReplyToUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comments_AspNetUsers_ReplyToUserId",
                table: "Comments");

            migrationBuilder.DropIndex(
                name: "IX_Comments_ReplyToUserId",
                table: "Comments");

            migrationBuilder.DropColumn(
                name: "ReplyToUserId",
                table: "Comments");
        }
    }
}
