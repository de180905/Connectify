using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Connectify.Server.Migrations
{
    /// <inheritdoc />
    public partial class NotificationFeature : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "notification",
                columns: table => new
                {
                    notification_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    triggered_by_user_id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    message = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Type = table.Column<int>(type: "int", nullable: false),
                    action_link = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    create_at = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETDATE()"),
                    expiration_time = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("notification_pkey", x => x.notification_id);
                    table.ForeignKey(
                        name: "FK_notification_AspNetUsers_triggered_by_user_id",
                        column: x => x.triggered_by_user_id,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "notification_recipient",
                columns: table => new
                {
                    NotificationId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    IsRead = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_notification_recipient", x => new { x.NotificationId, x.UserId });
                    table.ForeignKey(
                        name: "FK_notification_recipient_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_notification_recipient_notification_NotificationId",
                        column: x => x.NotificationId,
                        principalTable: "notification",
                        principalColumn: "notification_id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_notification_triggered_by_user_id",
                table: "notification",
                column: "triggered_by_user_id");

            migrationBuilder.CreateIndex(
                name: "IX_notification_recipient_UserId",
                table: "notification_recipient",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "notification_recipient");

            migrationBuilder.DropTable(
                name: "notification");
        }
    }
}
