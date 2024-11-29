﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Connectify.Server.Migrations
{
    /// <inheritdoc />
    public partial class ChatroomAvatar : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Avatar",
                table: "ChatRooms",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Avatar",
                table: "ChatRooms");
        }
    }
}
