using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Connectify.Server.Migrations
{
    /// <inheritdoc />
    public partial class AdjustCommentReaction : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Reaction",
                table: "CommentReactions");

            migrationBuilder.AddColumn<bool>(
                name: "IsLike",
                table: "CommentReactions",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsLike",
                table: "CommentReactions");

            migrationBuilder.AddColumn<int>(
                name: "Reaction",
                table: "CommentReactions",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
