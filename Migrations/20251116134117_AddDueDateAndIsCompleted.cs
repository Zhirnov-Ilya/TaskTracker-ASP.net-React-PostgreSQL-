using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TaskTracker.Migrations
{
    /// <inheritdoc />
    public partial class AddDueDateAndIsCompleted : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DueDate",
                table: "Notes",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsCompleted",
                table: "Notes",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DueDate",
                table: "Notes");

            migrationBuilder.DropColumn(
                name: "IsCompleted",
                table: "Notes");
        }
    }
}
