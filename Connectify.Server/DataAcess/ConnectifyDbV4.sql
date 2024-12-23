USE [master]
GO
/****** Object:  Database [ConnectifyDbV4]    Script Date: 12/2/2024 11:13:40 AM ******/
CREATE DATABASE [ConnectifyDbV4]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'ConnectifyDbV4', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\ConnectifyDbV4.mdf' , SIZE = 73728KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'ConnectifyDbV4_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\ConnectifyDbV4_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [ConnectifyDbV4] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [ConnectifyDbV4].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [ConnectifyDbV4] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [ConnectifyDbV4] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [ConnectifyDbV4] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [ConnectifyDbV4] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [ConnectifyDbV4] SET ARITHABORT OFF 
GO
ALTER DATABASE [ConnectifyDbV4] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [ConnectifyDbV4] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [ConnectifyDbV4] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [ConnectifyDbV4] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [ConnectifyDbV4] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [ConnectifyDbV4] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [ConnectifyDbV4] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [ConnectifyDbV4] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [ConnectifyDbV4] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [ConnectifyDbV4] SET  DISABLE_BROKER 
GO
ALTER DATABASE [ConnectifyDbV4] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [ConnectifyDbV4] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [ConnectifyDbV4] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [ConnectifyDbV4] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [ConnectifyDbV4] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [ConnectifyDbV4] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [ConnectifyDbV4] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [ConnectifyDbV4] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [ConnectifyDbV4] SET  MULTI_USER 
GO
ALTER DATABASE [ConnectifyDbV4] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [ConnectifyDbV4] SET DB_CHAINING OFF 
GO
ALTER DATABASE [ConnectifyDbV4] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [ConnectifyDbV4] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [ConnectifyDbV4] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [ConnectifyDbV4] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [ConnectifyDbV4] SET QUERY_STORE = ON
GO
ALTER DATABASE [ConnectifyDbV4] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [ConnectifyDbV4]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 12/2/2024 11:13:40 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AppGroups]    Script Date: 12/2/2024 11:13:40 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AppGroups](
	[GroupId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](max) NOT NULL,
	[Description] [nvarchar](max) NOT NULL,
	[IsPrivate] [bit] NOT NULL,
	[CreatedById] [nvarchar](450) NOT NULL,
	[SettingsId] [int] NOT NULL,
	[CreatedAt] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_AppGroups] PRIMARY KEY CLUSTERED 
(
	[GroupId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetRoleClaims]    Script Date: 12/2/2024 11:13:40 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetRoleClaims](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RoleId] [nvarchar](450) NOT NULL,
	[ClaimType] [nvarchar](max) NULL,
	[ClaimValue] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetRoleClaims] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetRoles]    Script Date: 12/2/2024 11:13:40 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetRoles](
	[Id] [nvarchar](450) NOT NULL,
	[Name] [nvarchar](256) NULL,
	[NormalizedName] [nvarchar](256) NULL,
	[ConcurrencyStamp] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetRoles] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserClaims]    Script Date: 12/2/2024 11:13:40 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserClaims](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [nvarchar](450) NOT NULL,
	[ClaimType] [nvarchar](max) NULL,
	[ClaimValue] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetUserClaims] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserLogins]    Script Date: 12/2/2024 11:13:40 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserLogins](
	[LoginProvider] [nvarchar](450) NOT NULL,
	[ProviderKey] [nvarchar](450) NOT NULL,
	[ProviderDisplayName] [nvarchar](max) NULL,
	[UserId] [nvarchar](450) NOT NULL,
 CONSTRAINT [PK_AspNetUserLogins] PRIMARY KEY CLUSTERED 
(
	[LoginProvider] ASC,
	[ProviderKey] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserRoles]    Script Date: 12/2/2024 11:13:40 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserRoles](
	[UserId] [nvarchar](450) NOT NULL,
	[RoleId] [nvarchar](450) NOT NULL,
 CONSTRAINT [PK_AspNetUserRoles] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUsers]    Script Date: 12/2/2024 11:13:40 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUsers](
	[Id] [nvarchar](450) NOT NULL,
	[PasswordResetToken] [nvarchar](max) NULL,
	[PasswordResetTokenExpires] [datetime2](7) NULL,
	[FirstName] [nvarchar](40) NOT NULL,
	[LastName] [nvarchar](100) NOT NULL,
	[DateOfBirth] [datetime2](7) NOT NULL,
	[Gender] [int] NOT NULL,
	[Bio] [nvarchar](max) NULL,
	[Location] [nvarchar](max) NULL,
	[Company] [nvarchar](max) NULL,
	[Avatar] [nvarchar](max) NULL,
	[UserName] [nvarchar](256) NULL,
	[NormalizedUserName] [nvarchar](256) NULL,
	[Email] [nvarchar](256) NULL,
	[NormalizedEmail] [nvarchar](256) NULL,
	[EmailConfirmed] [bit] NOT NULL,
	[PasswordHash] [nvarchar](max) NULL,
	[SecurityStamp] [nvarchar](max) NULL,
	[ConcurrencyStamp] [nvarchar](max) NULL,
	[PhoneNumber] [nvarchar](max) NULL,
	[PhoneNumberConfirmed] [bit] NOT NULL,
	[TwoFactorEnabled] [bit] NOT NULL,
	[LockoutEnd] [datetimeoffset](7) NULL,
	[LockoutEnabled] [bit] NOT NULL,
	[AccessFailedCount] [int] NOT NULL,
	[ProfileCover] [nvarchar](max) NULL,
	[IsOnline] [bit] NOT NULL,
	[LastOnline] [datetime2](7) NULL,
 CONSTRAINT [PK_AspNetUsers] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserTokens]    Script Date: 12/2/2024 11:13:40 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserTokens](
	[UserId] [nvarchar](450) NOT NULL,
	[LoginProvider] [nvarchar](450) NOT NULL,
	[Name] [nvarchar](450) NOT NULL,
	[Value] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetUserTokens] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[LoginProvider] ASC,
	[Name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[BlockedUsers]    Script Date: 12/2/2024 11:13:40 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BlockedUsers](
	[user_id] [nvarchar](450) NOT NULL,
	[blocked_user_idd] [nvarchar](450) NOT NULL,
	[blocked_date] [datetime2](7) NOT NULL,
 CONSTRAINT [block_user_pkey] PRIMARY KEY CLUSTERED 
(
	[user_id] ASC,
	[blocked_user_idd] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ChatRoomMembers]    Script Date: 12/2/2024 11:13:40 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ChatRoomMembers](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ChatRoomId] [int] NOT NULL,
	[UserId] [nvarchar](450) NOT NULL,
	[JoinedAt] [datetime2](7) NOT NULL,
	[Role] [int] NULL,
	[LastSeen] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_ChatRoomMembers] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ChatRooms]    Script Date: 12/2/2024 11:13:40 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ChatRooms](
	[ChatRoomId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](max) NULL,
	[CreatedAt] [datetime2](7) NOT NULL,
	[IsPrivate] [bit] NOT NULL,
	[Avatar] [nvarchar](max) NULL,
 CONSTRAINT [PK_ChatRooms] PRIMARY KEY CLUSTERED 
(
	[ChatRoomId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CommentReactions]    Script Date: 12/2/2024 11:13:40 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CommentReactions](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CommentId] [int] NOT NULL,
	[UserId] [nvarchar](450) NOT NULL,
	[IsLike] [bit] NOT NULL,
	[UpdateAt] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_CommentReactions] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Comments]    Script Date: 12/2/2024 11:13:40 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Comments](
	[CommentId] [int] IDENTITY(1,1) NOT NULL,
	[PostId] [int] NULL,
	[Content] [nvarchar](max) NOT NULL,
	[AttachmentUrl] [nvarchar](max) NULL,
	[CreatedAt] [datetime2](7) NOT NULL,
	[UpdatedAt] [datetime2](7) NULL,
	[AuthorId] [nvarchar](450) NOT NULL,
	[ParentCommentId] [int] NULL,
	[ReplyToUserId] [nvarchar](450) NULL,
 CONSTRAINT [PK_Comments] PRIMARY KEY CLUSTERED 
(
	[CommentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[FriendRequests]    Script Date: 12/2/2024 11:13:40 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FriendRequests](
	[RequestId] [int] IDENTITY(1,1) NOT NULL,
	[RequesterId] [nvarchar](450) NOT NULL,
	[ReceiverId] [nvarchar](450) NOT NULL,
	[Status] [int] NOT NULL,
	[RequestDate] [datetime2](7) NOT NULL,
	[ResponseDate] [datetime2](7) NULL,
 CONSTRAINT [PK_FriendRequests] PRIMARY KEY CLUSTERED 
(
	[RequestId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[FriendShips]    Script Date: 12/2/2024 11:13:40 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FriendShips](
	[FriendShipId] [int] IDENTITY(1,1) NOT NULL,
	[User1Id] [nvarchar](450) NOT NULL,
	[User2Id] [nvarchar](450) NOT NULL,
	[FriendsSince] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_FriendShips] PRIMARY KEY CLUSTERED 
(
	[FriendShipId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GroupInvitations]    Script Date: 12/2/2024 11:13:40 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GroupInvitations](
	[InvitationId] [int] IDENTITY(1,1) NOT NULL,
	[GroupId] [int] NOT NULL,
	[TargetUserId] [nvarchar](450) NOT NULL,
	[ReferrerId] [nvarchar](450) NOT NULL,
	[InvitedAt] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_GroupInvitations] PRIMARY KEY CLUSTERED 
(
	[InvitationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GroupJoinRequests]    Script Date: 12/2/2024 11:13:40 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GroupJoinRequests](
	[JoinRequestId] [int] IDENTITY(1,1) NOT NULL,
	[GroupId] [int] NOT NULL,
	[TargetUserId] [nvarchar](450) NOT NULL,
	[Status] [int] NOT NULL,
	[RequestedAt] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_GroupJoinRequests] PRIMARY KEY CLUSTERED 
(
	[JoinRequestId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GroupMembers]    Script Date: 12/2/2024 11:13:40 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GroupMembers](
	[GroupMemberId] [int] IDENTITY(1,1) NOT NULL,
	[GroupId] [int] NOT NULL,
	[UserId] [nvarchar](450) NOT NULL,
	[Role] [int] NOT NULL,
	[JoinedAt] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_GroupMembers] PRIMARY KEY CLUSTERED 
(
	[GroupMemberId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GroupSettings]    Script Date: 12/2/2024 11:13:40 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GroupSettings](
	[GroupSettingsId] [int] IDENTITY(1,1) NOT NULL,
	[GroupId] [int] NOT NULL,
	[IsPostApprovalRequired] [bit] NOT NULL,
	[IsMembershipApprovalRequired] [bit] NOT NULL,
 CONSTRAINT [PK_GroupSettings] PRIMARY KEY CLUSTERED 
(
	[GroupSettingsId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Media]    Script Date: 12/2/2024 11:13:40 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Media](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Url] [nvarchar](max) NOT NULL,
	[Name] [nvarchar](max) NULL,
	[MediaType] [nvarchar](100) NOT NULL,
	[MessageId] [int] NULL,
	[PostId] [int] NULL,
	[FileType] [nvarchar](50) NULL,
 CONSTRAINT [PK_Media] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MessageReactions]    Script Date: 12/2/2024 11:13:40 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MessageReactions](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[MessageId] [int] NOT NULL,
	[UserId] [nvarchar](450) NOT NULL,
	[Reaction] [int] NOT NULL,
 CONSTRAINT [PK_MessageReactions] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Messages]    Script Date: 12/2/2024 11:13:40 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Messages](
	[MessageId] [int] IDENTITY(1,1) NOT NULL,
	[ChatRoomId] [int] NOT NULL,
	[SenderId] [nvarchar](450) NOT NULL,
	[Text] [nvarchar](max) NULL,
	[Type] [int] NOT NULL,
	[SentAt] [datetime2](7) NOT NULL,
	[ReplyToId] [int] NULL,
	[Deleted] [bit] NOT NULL,
 CONSTRAINT [PK_Messages] PRIMARY KEY CLUSTERED 
(
	[MessageId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MessageVisibilities]    Script Date: 12/2/2024 11:13:40 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MessageVisibilities](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [nvarchar](450) NOT NULL,
	[MessageId] [int] NOT NULL,
	[DeletedAt] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_MessageVisibilities] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[notification]    Script Date: 12/2/2024 11:13:40 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[notification](
	[notification_id] [int] IDENTITY(1,1) NOT NULL,
	[triggered_by_user_id] [nvarchar](450) NOT NULL,
	[message] [nvarchar](255) NOT NULL,
	[Type] [int] NOT NULL,
	[action_link] [nvarchar](255) NOT NULL,
	[create_at] [datetime2](7) NOT NULL,
	[expiration_time] [datetime2](7) NULL,
 CONSTRAINT [notification_pkey] PRIMARY KEY CLUSTERED 
(
	[notification_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[notification_recipient]    Script Date: 12/2/2024 11:13:40 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[notification_recipient](
	[NotificationId] [int] NOT NULL,
	[UserId] [nvarchar](450) NOT NULL,
	[IsRead] [bit] NOT NULL,
 CONSTRAINT [PK_notification_recipient] PRIMARY KEY CLUSTERED 
(
	[NotificationId] ASC,
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PostReactions]    Script Date: 12/2/2024 11:13:40 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PostReactions](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PostId] [int] NOT NULL,
	[UserId] [nvarchar](450) NOT NULL,
	[Reaction] [int] NOT NULL,
	[UpdateAt] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_PostReactions] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PostReportReasons]    Script Date: 12/2/2024 11:13:40 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PostReportReasons](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[description] [nvarchar](max) NOT NULL,
	[created_at] [datetime2](7) NULL,
 CONSTRAINT [post_report_reason_pkey] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PostReports]    Script Date: 12/2/2024 11:13:40 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PostReports](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[post_id] [int] NOT NULL,
	[ReportedByUserId] [nvarchar](450) NOT NULL,
	[post_report_reason_id] [int] NOT NULL,
	[status] [int] NOT NULL,
	[created_at] [datetime2](7) NOT NULL,
	[updated_at] [datetime2](7) NOT NULL,
 CONSTRAINT [post_report_pkey] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Posts]    Script Date: 12/2/2024 11:13:40 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Posts](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Content] [nvarchar](max) NULL,
	[CreatedAt] [datetime2](7) NOT NULL,
	[UpdatedAt] [datetime2](7) NULL,
	[AuthorId] [nvarchar](450) NOT NULL,
	[PostType] [nvarchar](8) NOT NULL,
	[GroupId] [int] NULL,
	[IsAnonymous] [bit] NULL,
	[Visibility] [int] NULL,
	[Feeling] [nvarchar](50) NULL,
 CONSTRAINT [PK_Posts] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PostSaves]    Script Date: 12/2/2024 11:13:40 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PostSaves](
	[post_id] [int] NOT NULL,
	[user_id] [nvarchar](450) NOT NULL,
	[create_at] [datetime2](7) NOT NULL,
 CONSTRAINT [postSave_pkey] PRIMARY KEY CLUSTERED 
(
	[post_id] ASC,
	[user_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PostTags]    Script Date: 12/2/2024 11:13:40 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PostTags](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PostId] [int] NOT NULL,
	[UserId] [nvarchar](450) NOT NULL,
 CONSTRAINT [PK_PostTags] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RefreshTokens]    Script Date: 12/2/2024 11:13:40 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RefreshTokens](
	[Id] [uniqueidentifier] NOT NULL,
	[Token] [nvarchar](max) NOT NULL,
	[ExpiryDate] [datetime2](7) NOT NULL,
	[UserId] [nvarchar](450) NOT NULL,
 CONSTRAINT [PK_RefreshTokens] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20240928042254_initial', N'8.0.8')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20240930023308_UserDescription', N'8.0.8')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20240930075952_userAvatar', N'8.0.8')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20241006140051_Initial', N'8.0.8')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20241010080847_tagpost', N'8.0.8')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20241013080738_PostReaction', N'8.0.8')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20241018091831_AddFileTypeCol', N'8.0.8')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20241023023759_PostFeeling', N'8.0.8')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20241029035450_ProfileCover', N'8.0.8')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20241031081317_testMigration', N'8.0.8')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20241031082544_confirm', N'8.0.8')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20241103095245_userOnlinTracking', N'8.0.8')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20241104182118_ChatroomLastSeen', N'8.0.8')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20241113061835_CommentAddedReplyto', N'8.0.8')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20241113065757_AdjustCommentReaction', N'8.0.8')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20241113081028_NullableCommentAttachment', N'8.0.8')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20241113144430_AddNavigateCommentReactions', N'8.0.8')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20241118064459_NotificationFeature', N'8.0.8')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20241127175413_AddUniqueForChatMem', N'8.0.8')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20241128040748_ChatroomAvatar', N'8.0.8')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20241129080021_NotificationFeatureAdded', N'8.0.8')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20241201160322_FixPostForeignKey', N'8.0.8')
GO
INSERT [dbo].[AspNetRoles] ([Id], [Name], [NormalizedName], [ConcurrencyStamp]) VALUES (N'4ca75ee5-b845-4967-80a0-32b19c3e9d59', N'NormalUser', N'NORMALUSER', NULL)
INSERT [dbo].[AspNetRoles] ([Id], [Name], [NormalizedName], [ConcurrencyStamp]) VALUES (N'6f07311a-c99c-45d6-9040-a576840a72b9', N'Administrator', N'ADMINISTRATOR', NULL)
GO
INSERT [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (N'168bc346-5e1b-439a-86c4-d6ae8c1437a8', N'4ca75ee5-b845-4967-80a0-32b19c3e9d59')
INSERT [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (N'1915bf75-b54e-43b1-abe5-72130c765ac3', N'4ca75ee5-b845-4967-80a0-32b19c3e9d59')
INSERT [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (N'5b510644-d571-499c-bc46-db0b0185472e', N'4ca75ee5-b845-4967-80a0-32b19c3e9d59')
INSERT [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (N'925cec0a-0c33-4d8a-b140-1380d37e821d', N'4ca75ee5-b845-4967-80a0-32b19c3e9d59')
INSERT [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (N'93e8543a-971f-4a6c-b769-f5d79844963c', N'4ca75ee5-b845-4967-80a0-32b19c3e9d59')
INSERT [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'4ca75ee5-b845-4967-80a0-32b19c3e9d59')
INSERT [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (N'9f9ab6c5-21b9-47ed-8d07-f6ed0c45b14d', N'4ca75ee5-b845-4967-80a0-32b19c3e9d59')
INSERT [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (N'be45a8cb-9ad6-4910-a8b3-baa59efbc698', N'6f07311a-c99c-45d6-9040-a576840a72b9')
GO
INSERT [dbo].[AspNetUsers] ([Id], [PasswordResetToken], [PasswordResetTokenExpires], [FirstName], [LastName], [DateOfBirth], [Gender], [Bio], [Location], [Company], [Avatar], [UserName], [NormalizedUserName], [Email], [NormalizedEmail], [EmailConfirmed], [PasswordHash], [SecurityStamp], [ConcurrencyStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnd], [LockoutEnabled], [AccessFailedCount], [ProfileCover], [IsOnline], [LastOnline]) VALUES (N'168bc346-5e1b-439a-86c4-d6ae8c1437a8', NULL, NULL, N'Loan', N'Hong', CAST(N'2024-10-02T07:32:35.2610000' AS DateTime2), 1, NULL, NULL, NULL, N'https://i.ibb.co/7YNHLvV/Avatar-Default.png', N'Loan@gmail.com', N'LOAN@GMAIL.COM', N'Loan@gmail.com', N'LOAN@GMAIL.COM', 1, N'AQAAAAIAAYagAAAAEI0Xf9FjWuLUZ/STi3BE4xTMP10RFGUjf5Ep0jMGFgM8Re2HE7kColGdLMvUlQb+TQ==', N'4PNVBT3BQS57GIHD3FLUHEP2R6QFEA3V', N'7f6d7a3e-275a-4e0d-ab6d-c8553477c431', NULL, 0, 0, NULL, 1, 0, N'https://i.ibb.co/M1C50yW/Cover-Default.png', 0, CAST(N'0001-01-01T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[AspNetUsers] ([Id], [PasswordResetToken], [PasswordResetTokenExpires], [FirstName], [LastName], [DateOfBirth], [Gender], [Bio], [Location], [Company], [Avatar], [UserName], [NormalizedUserName], [Email], [NormalizedEmail], [EmailConfirmed], [PasswordHash], [SecurityStamp], [ConcurrencyStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnd], [LockoutEnabled], [AccessFailedCount], [ProfileCover], [IsOnline], [LastOnline]) VALUES (N'1915bf75-b54e-43b1-abe5-72130c765ac3', NULL, NULL, N'My', N'Tran', CAST(N'2024-10-02T07:32:35.2610000' AS DateTime2), 1, NULL, NULL, NULL, N'https://i.ibb.co/7YNHLvV/Avatar-Default.png', N'My@gmail.com', N'MY@GMAIL.COM', N'My@gmail.com', N'MY@GMAIL.COM', 1, N'AQAAAAIAAYagAAAAEPEemGdxHNpHbkfw91cvdzXQPOpXAsu26ADML2FJMHz42F+aavw6N3Kj4YHsysYvTQ==', N'CQK6MD4XPPTIUEVACOF7ICOQOFQILXFQ', N'c4bd08f3-1d30-4112-b154-70c4ac7c6fc6', NULL, 0, 0, NULL, 1, 0, N'https://i.ibb.co/M1C50yW/Cover-Default.png', 0, CAST(N'0001-01-01T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[AspNetUsers] ([Id], [PasswordResetToken], [PasswordResetTokenExpires], [FirstName], [LastName], [DateOfBirth], [Gender], [Bio], [Location], [Company], [Avatar], [UserName], [NormalizedUserName], [Email], [NormalizedEmail], [EmailConfirmed], [PasswordHash], [SecurityStamp], [ConcurrencyStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnd], [LockoutEnabled], [AccessFailedCount], [ProfileCover], [IsOnline], [LastOnline]) VALUES (N'5b510644-d571-499c-bc46-db0b0185472e', NULL, NULL, N'Minh', N'Tuan', CAST(N'2024-10-02T07:32:35.2610000' AS DateTime2), 0, NULL, NULL, NULL, N'https://i.ibb.co/7YNHLvV/Avatar-Default.png', N'tuan@gmail.com', N'TUAN@GMAIL.COM', N'tuan@gmail.com', N'TUAN@GMAIL.COM', 1, N'AQAAAAIAAYagAAAAEAZeMd2g4aQA72TnLt4ZaBMhn9GxFKQzQCfdnLCWQKsM+ryyuUi8qzwebMUN1NP/QA==', N'5KLD3IKW2F2MLZZ6UOG3IEMDDZH53FC4', N'dba61c0d-dde9-4ce5-83b4-6ad911eea150', NULL, 0, 0, NULL, 1, 0, N'https://i.ibb.co/M1C50yW/Cover-Default.png', 0, CAST(N'2024-12-02T03:48:15.6199616' AS DateTime2))
INSERT [dbo].[AspNetUsers] ([Id], [PasswordResetToken], [PasswordResetTokenExpires], [FirstName], [LastName], [DateOfBirth], [Gender], [Bio], [Location], [Company], [Avatar], [UserName], [NormalizedUserName], [Email], [NormalizedEmail], [EmailConfirmed], [PasswordHash], [SecurityStamp], [ConcurrencyStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnd], [LockoutEnabled], [AccessFailedCount], [ProfileCover], [IsOnline], [LastOnline]) VALUES (N'925cec0a-0c33-4d8a-b140-1380d37e821d', NULL, NULL, N'Uyen', N'Tran', CAST(N'2024-10-02T07:32:35.2610000' AS DateTime2), 0, NULL, NULL, NULL, N'https://i.ibb.co/7YNHLvV/Avatar-Default.png', N'uyen@gmail.com', N'UYEN@GMAIL.COM', N'uyen@gmail.com', N'UYEN@GMAIL.COM', 1, N'AQAAAAIAAYagAAAAEMoBh7tR4dTg6rISlNxqVDcOpIVl1K706K7cCVRvBst2VKIcC+8gjC0rs4r6lvNC2w==', N'KGYMULMDAIFSZ2CJ3NTCHYC7RCFIVBCK', N'3b04d606-d7a3-4545-b1f0-f28dad7253b9', NULL, 0, 0, NULL, 1, 0, N'https://i.ibb.co/M1C50yW/Cover-Default.png', 0, CAST(N'0001-01-01T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[AspNetUsers] ([Id], [PasswordResetToken], [PasswordResetTokenExpires], [FirstName], [LastName], [DateOfBirth], [Gender], [Bio], [Location], [Company], [Avatar], [UserName], [NormalizedUserName], [Email], [NormalizedEmail], [EmailConfirmed], [PasswordHash], [SecurityStamp], [ConcurrencyStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnd], [LockoutEnabled], [AccessFailedCount], [ProfileCover], [IsOnline], [LastOnline]) VALUES (N'93e8543a-971f-4a6c-b769-f5d79844963c', NULL, NULL, N'Thuy', N'Dung', CAST(N'2024-10-02T07:32:35.2610000' AS DateTime2), 1, NULL, NULL, NULL, N'https://i.ibb.co/7YNHLvV/Avatar-Default.png', N'dung@gmail.com', N'DUNG@GMAIL.COM', N'dung@gmail.com', N'DUNG@GMAIL.COM', 1, N'AQAAAAIAAYagAAAAECTvpgdjEhwZw2+mviM29VX7Ny2LaRqrTnfM6m+1Ol6NwwEuiPad20Nirjo3vwkKaQ==', N'RYX5UVYB7QWJPCTP6BPD72A6DH2EKFD3', N'c63a8242-cd56-431d-a03e-23098df3ebe6', NULL, 0, 0, NULL, 1, 0, N'https://i.ibb.co/M1C50yW/Cover-Default.png', 0, CAST(N'0001-01-01T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[AspNetUsers] ([Id], [PasswordResetToken], [PasswordResetTokenExpires], [FirstName], [LastName], [DateOfBirth], [Gender], [Bio], [Location], [Company], [Avatar], [UserName], [NormalizedUserName], [Email], [NormalizedEmail], [EmailConfirmed], [PasswordHash], [SecurityStamp], [ConcurrencyStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnd], [LockoutEnabled], [AccessFailedCount], [ProfileCover], [IsOnline], [LastOnline]) VALUES (N'956197f1-53be-4ec6-9caf-a35a8ba70c75', NULL, NULL, N'Khoi', N'Vuong', CAST(N'2004-09-30T00:00:00.0000000' AS DateTime2), 1, N'software developer', N'North Sea', N'Google', N'http://res.cloudinary.com/dj7lju0cn/image/upload/v1732770234/Connectify/vnoetpaeewenvaan2cat.png', N'khoitop1zata@gmail.com', N'KHOITOP1ZATA@GMAIL.COM', N'khoitop1zata@gmail.com', N'KHOITOP1ZATA@GMAIL.COM', 1, N'AQAAAAIAAYagAAAAEDjbyutzuayti7rzbyV7TQq5dvwmCNW8ly9Sow2xVc36W3fx3/XGfculr0xVDF/WNg==', N'PRXZE4WAAA2AVID6R4D6T4UW56BFEATN', N'70837aa9-e531-4944-baab-b9e2ab638b50', NULL, 0, 0, NULL, 1, 0, N'https://i.ibb.co/M1C50yW/Cover-Default.png', 0, CAST(N'2024-12-02T04:09:59.2577960' AS DateTime2))
INSERT [dbo].[AspNetUsers] ([Id], [PasswordResetToken], [PasswordResetTokenExpires], [FirstName], [LastName], [DateOfBirth], [Gender], [Bio], [Location], [Company], [Avatar], [UserName], [NormalizedUserName], [Email], [NormalizedEmail], [EmailConfirmed], [PasswordHash], [SecurityStamp], [ConcurrencyStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnd], [LockoutEnabled], [AccessFailedCount], [ProfileCover], [IsOnline], [LastOnline]) VALUES (N'9f9ab6c5-21b9-47ed-8d07-f6ed0c45b14d', NULL, NULL, N'Quan', N'Vuong', CAST(N'2012-06-21T04:23:41.6240000' AS DateTime2), 0, NULL, NULL, NULL, N'https://i.ibb.co/7YNHLvV/Avatar-Default.png', N'quanvm@gmail.com', N'QUANVM@GMAIL.COM', N'quanvm@gmail.com', N'QUANVM@GMAIL.COM', 1, N'AQAAAAIAAYagAAAAELQGoRm9iVONI2WdRaDD+60qrFgNr6J4l2SUyUQj/Vw15RqDIgQ1CqEZ5pBojfV8HA==', N'CH4HOQ7AVCEUXSU2AWRXC5BVBSX6F5UJ', N'ed99418d-6349-42ce-8b26-a60954971ad8', NULL, 0, 0, NULL, 1, 0, N'https://i.ibb.co/M1C50yW/Cover-Default.png', 0, CAST(N'0001-01-01T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[AspNetUsers] ([Id], [PasswordResetToken], [PasswordResetTokenExpires], [FirstName], [LastName], [DateOfBirth], [Gender], [Bio], [Location], [Company], [Avatar], [UserName], [NormalizedUserName], [Email], [NormalizedEmail], [EmailConfirmed], [PasswordHash], [SecurityStamp], [ConcurrencyStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnd], [LockoutEnabled], [AccessFailedCount], [ProfileCover], [IsOnline], [LastOnline]) VALUES (N'be45a8cb-9ad6-4910-a8b3-baa59efbc698', N'', NULL, N'Admin', N'System', CAST(N'2024-12-01T02:59:40.9000000' AS DateTime2), 0, NULL, NULL, NULL, N'https://i.ibb.co/7YNHLvV/Avatar-Default.png', N'admin@gmail.com', N'ADMIN@GMAIL.COM', N'admin@gmail.com', N'ADMIN@GMAIL.COM', 0, N'AQAAAAIAAYagAAAAEOOom+MPXolhhiB4ARQWr8dM9FeD4sjqJ1Psu6gEhe/NQw4GY5GsSQi0kN31ighDnA==', N'OZC62HKSFLJQKKRFSV73DJH45ZWM2DWR', N'bcbe647b-a7cb-4373-89a4-268581f5ba58', NULL, 0, 0, NULL, 1, 0, N'https://i.ibb.co/M1C50yW/Cover-Default.png', 0, NULL)
GO
SET IDENTITY_INSERT [dbo].[ChatRoomMembers] ON 

INSERT [dbo].[ChatRoomMembers] ([Id], [ChatRoomId], [UserId], [JoinedAt], [Role], [LastSeen]) VALUES (2, 1, N'9f9ab6c5-21b9-47ed-8d07-f6ed0c45b14d', CAST(N'2024-09-28T04:27:40.4987819' AS DateTime2), 3, CAST(N'0001-01-01T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[ChatRoomMembers] ([Id], [ChatRoomId], [UserId], [JoinedAt], [Role], [LastSeen]) VALUES (3, 2, N'5b510644-d571-499c-bc46-db0b0185472e', CAST(N'2024-10-03T06:29:23.3128190' AS DateTime2), 3, CAST(N'2024-11-29T17:32:01.4446194' AS DateTime2))
INSERT [dbo].[ChatRoomMembers] ([Id], [ChatRoomId], [UserId], [JoinedAt], [Role], [LastSeen]) VALUES (4, 2, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', CAST(N'2024-10-03T06:29:23.3510205' AS DateTime2), 3, CAST(N'2024-11-30T14:19:44.9358008' AS DateTime2))
INSERT [dbo].[ChatRoomMembers] ([Id], [ChatRoomId], [UserId], [JoinedAt], [Role], [LastSeen]) VALUES (5, 3, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', CAST(N'2024-10-04T07:28:46.3418641' AS DateTime2), 3, CAST(N'2024-11-28T07:14:27.4197653' AS DateTime2))
INSERT [dbo].[ChatRoomMembers] ([Id], [ChatRoomId], [UserId], [JoinedAt], [Role], [LastSeen]) VALUES (6, 3, N'93e8543a-971f-4a6c-b769-f5d79844963c', CAST(N'2024-10-04T07:28:46.3617411' AS DateTime2), 3, CAST(N'0001-01-01T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[ChatRoomMembers] ([Id], [ChatRoomId], [UserId], [JoinedAt], [Role], [LastSeen]) VALUES (7, 4, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', CAST(N'2024-10-04T07:39:28.6649429' AS DateTime2), 3, CAST(N'2024-11-28T07:51:23.0519701' AS DateTime2))
INSERT [dbo].[ChatRoomMembers] ([Id], [ChatRoomId], [UserId], [JoinedAt], [Role], [LastSeen]) VALUES (8, 4, N'1915bf75-b54e-43b1-abe5-72130c765ac3', CAST(N'2024-10-04T07:39:28.6650910' AS DateTime2), 3, CAST(N'0001-01-01T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[ChatRoomMembers] ([Id], [ChatRoomId], [UserId], [JoinedAt], [Role], [LastSeen]) VALUES (9, 5, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', CAST(N'2024-11-23T04:50:10.4908111' AS DateTime2), 3, CAST(N'2024-11-28T07:45:02.8332803' AS DateTime2))
INSERT [dbo].[ChatRoomMembers] ([Id], [ChatRoomId], [UserId], [JoinedAt], [Role], [LastSeen]) VALUES (10, 5, N'168bc346-5e1b-439a-86c4-d6ae8c1437a8', CAST(N'2024-11-23T04:50:10.5006216' AS DateTime2), 3, CAST(N'0001-01-01T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[ChatRoomMembers] ([Id], [ChatRoomId], [UserId], [JoinedAt], [Role], [LastSeen]) VALUES (32, 11, N'9f9ab6c5-21b9-47ed-8d07-f6ed0c45b14d', CAST(N'2024-11-28T14:53:57.9883112' AS DateTime2), 3, CAST(N'0001-01-01T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[ChatRoomMembers] ([Id], [ChatRoomId], [UserId], [JoinedAt], [Role], [LastSeen]) VALUES (33, 11, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', CAST(N'2024-11-28T14:53:57.9883115' AS DateTime2), 0, CAST(N'2024-12-02T03:05:22.7374067' AS DateTime2))
SET IDENTITY_INSERT [dbo].[ChatRoomMembers] OFF
GO
SET IDENTITY_INSERT [dbo].[ChatRooms] ON 

INSERT [dbo].[ChatRooms] ([ChatRoomId], [Name], [CreatedAt], [IsPrivate], [Avatar]) VALUES (1, NULL, CAST(N'2024-09-28T04:27:40.4415425' AS DateTime2), 1, NULL)
INSERT [dbo].[ChatRooms] ([ChatRoomId], [Name], [CreatedAt], [IsPrivate], [Avatar]) VALUES (2, NULL, CAST(N'2024-10-03T06:29:23.1807032' AS DateTime2), 1, NULL)
INSERT [dbo].[ChatRooms] ([ChatRoomId], [Name], [CreatedAt], [IsPrivate], [Avatar]) VALUES (3, NULL, CAST(N'2024-10-04T07:28:46.2873496' AS DateTime2), 1, NULL)
INSERT [dbo].[ChatRooms] ([ChatRoomId], [Name], [CreatedAt], [IsPrivate], [Avatar]) VALUES (4, NULL, CAST(N'2024-10-04T07:39:28.6566721' AS DateTime2), 1, NULL)
INSERT [dbo].[ChatRooms] ([ChatRoomId], [Name], [CreatedAt], [IsPrivate], [Avatar]) VALUES (5, NULL, CAST(N'2024-11-23T04:50:10.4446325' AS DateTime2), 1, NULL)
INSERT [dbo].[ChatRooms] ([ChatRoomId], [Name], [CreatedAt], [IsPrivate], [Avatar]) VALUES (9, N'My Group 2', CAST(N'2024-11-28T02:31:26.2376984' AS DateTime2), 0, N'http://res.cloudinary.com/dj7lju0cn/image/upload/v1732776090/Connectify/kzjyqcabwzc5bz856fpr.png')
INSERT [dbo].[ChatRooms] ([ChatRoomId], [Name], [CreatedAt], [IsPrivate], [Avatar]) VALUES (10, N'My group New', CAST(N'2024-11-28T14:21:53.8312056' AS DateTime2), 0, N'https://i.ibb.co/VSSXtXC/Group-Avatar-Default.webp')
INSERT [dbo].[ChatRooms] ([ChatRoomId], [Name], [CreatedAt], [IsPrivate], [Avatar]) VALUES (11, N'Group Renamed', CAST(N'2024-11-28T14:53:57.9883045' AS DateTime2), 0, N'http://res.cloudinary.com/dj7lju0cn/image/upload/v1732806622/Connectify/jofvgw0r5a2bzrv8aury.png')
SET IDENTITY_INSERT [dbo].[ChatRooms] OFF
GO
SET IDENTITY_INSERT [dbo].[CommentReactions] ON 

INSERT [dbo].[CommentReactions] ([Id], [CommentId], [UserId], [IsLike], [UpdateAt]) VALUES (7, 55, N'5b510644-d571-499c-bc46-db0b0185472e', 1, CAST(N'0001-01-01T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[CommentReactions] ([Id], [CommentId], [UserId], [IsLike], [UpdateAt]) VALUES (8, 55, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', 0, CAST(N'0001-01-01T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[CommentReactions] ([Id], [CommentId], [UserId], [IsLike], [UpdateAt]) VALUES (9, 56, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', 1, CAST(N'0001-01-01T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[CommentReactions] ([Id], [CommentId], [UserId], [IsLike], [UpdateAt]) VALUES (10, 56, N'5b510644-d571-499c-bc46-db0b0185472e', 1, CAST(N'0001-01-01T00:00:00.0000000' AS DateTime2))
SET IDENTITY_INSERT [dbo].[CommentReactions] OFF
GO
SET IDENTITY_INSERT [dbo].[Comments] ON 

INSERT [dbo].[Comments] ([CommentId], [PostId], [Content], [AttachmentUrl], [CreatedAt], [UpdatedAt], [AuthorId], [ParentCommentId], [ReplyToUserId]) VALUES (29, 8, N'hello', NULL, CAST(N'2024-11-14T08:28:11.6267013' AS DateTime2), NULL, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', NULL, NULL)
INSERT [dbo].[Comments] ([CommentId], [PostId], [Content], [AttachmentUrl], [CreatedAt], [UpdatedAt], [AuthorId], [ParentCommentId], [ReplyToUserId]) VALUES (55, 20, N'qua dep trai', NULL, CAST(N'2024-11-23T13:47:21.3715106' AS DateTime2), NULL, N'5b510644-d571-499c-bc46-db0b0185472e', NULL, NULL)
INSERT [dbo].[Comments] ([CommentId], [PostId], [Content], [AttachmentUrl], [CreatedAt], [UpdatedAt], [AuthorId], [ParentCommentId], [ReplyToUserId]) VALUES (56, 20, N'sao dep trai bang minh duoc', NULL, CAST(N'2024-11-23T13:47:51.7729533' AS DateTime2), NULL, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', 55, NULL)
INSERT [dbo].[Comments] ([CommentId], [PostId], [Content], [AttachmentUrl], [CreatedAt], [UpdatedAt], [AuthorId], [ParentCommentId], [ReplyToUserId]) VALUES (57, 20, N'dung roi', NULL, CAST(N'2024-11-25T06:11:36.5924464' AS DateTime2), NULL, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', 55, N'956197f1-53be-4ec6-9caf-a35a8ba70c75')
SET IDENTITY_INSERT [dbo].[Comments] OFF
GO
SET IDENTITY_INSERT [dbo].[FriendShips] ON 

INSERT [dbo].[FriendShips] ([FriendShipId], [User1Id], [User2Id], [FriendsSince]) VALUES (5, N'168bc346-5e1b-439a-86c4-d6ae8c1437a8', N'1915bf75-b54e-43b1-abe5-72130c765ac3', CAST(N'2024-08-18T10:51:59.3233333' AS DateTime2))
INSERT [dbo].[FriendShips] ([FriendShipId], [User1Id], [User2Id], [FriendsSince]) VALUES (6, N'168bc346-5e1b-439a-86c4-d6ae8c1437a8', N'5b510644-d571-499c-bc46-db0b0185472e', CAST(N'2024-08-25T10:51:59.3233333' AS DateTime2))
INSERT [dbo].[FriendShips] ([FriendShipId], [User1Id], [User2Id], [FriendsSince]) VALUES (7, N'168bc346-5e1b-439a-86c4-d6ae8c1437a8', N'925cec0a-0c33-4d8a-b140-1380d37e821d', CAST(N'2024-07-05T10:51:59.3233333' AS DateTime2))
INSERT [dbo].[FriendShips] ([FriendShipId], [User1Id], [User2Id], [FriendsSince]) VALUES (8, N'168bc346-5e1b-439a-86c4-d6ae8c1437a8', N'93e8543a-971f-4a6c-b769-f5d79844963c', CAST(N'2024-10-12T10:51:59.3233333' AS DateTime2))
INSERT [dbo].[FriendShips] ([FriendShipId], [User1Id], [User2Id], [FriendsSince]) VALUES (9, N'168bc346-5e1b-439a-86c4-d6ae8c1437a8', N'956197f1-53be-4ec6-9caf-a35a8ba70c75', CAST(N'2023-12-13T10:51:59.3233333' AS DateTime2))
INSERT [dbo].[FriendShips] ([FriendShipId], [User1Id], [User2Id], [FriendsSince]) VALUES (10, N'168bc346-5e1b-439a-86c4-d6ae8c1437a8', N'9f9ab6c5-21b9-47ed-8d07-f6ed0c45b14d', CAST(N'2024-03-26T10:51:59.3233333' AS DateTime2))
INSERT [dbo].[FriendShips] ([FriendShipId], [User1Id], [User2Id], [FriendsSince]) VALUES (11, N'1915bf75-b54e-43b1-abe5-72130c765ac3', N'5b510644-d571-499c-bc46-db0b0185472e', CAST(N'2024-10-07T10:51:59.3233333' AS DateTime2))
INSERT [dbo].[FriendShips] ([FriendShipId], [User1Id], [User2Id], [FriendsSince]) VALUES (12, N'1915bf75-b54e-43b1-abe5-72130c765ac3', N'925cec0a-0c33-4d8a-b140-1380d37e821d', CAST(N'2024-02-14T10:51:59.3233333' AS DateTime2))
INSERT [dbo].[FriendShips] ([FriendShipId], [User1Id], [User2Id], [FriendsSince]) VALUES (13, N'1915bf75-b54e-43b1-abe5-72130c765ac3', N'93e8543a-971f-4a6c-b769-f5d79844963c', CAST(N'2024-02-08T10:51:59.3233333' AS DateTime2))
INSERT [dbo].[FriendShips] ([FriendShipId], [User1Id], [User2Id], [FriendsSince]) VALUES (14, N'1915bf75-b54e-43b1-abe5-72130c765ac3', N'956197f1-53be-4ec6-9caf-a35a8ba70c75', CAST(N'2024-04-07T10:51:59.3233333' AS DateTime2))
INSERT [dbo].[FriendShips] ([FriendShipId], [User1Id], [User2Id], [FriendsSince]) VALUES (15, N'1915bf75-b54e-43b1-abe5-72130c765ac3', N'9f9ab6c5-21b9-47ed-8d07-f6ed0c45b14d', CAST(N'2024-08-21T10:51:59.3233333' AS DateTime2))
INSERT [dbo].[FriendShips] ([FriendShipId], [User1Id], [User2Id], [FriendsSince]) VALUES (16, N'5b510644-d571-499c-bc46-db0b0185472e', N'925cec0a-0c33-4d8a-b140-1380d37e821d', CAST(N'2024-06-08T10:51:59.3233333' AS DateTime2))
INSERT [dbo].[FriendShips] ([FriendShipId], [User1Id], [User2Id], [FriendsSince]) VALUES (17, N'5b510644-d571-499c-bc46-db0b0185472e', N'93e8543a-971f-4a6c-b769-f5d79844963c', CAST(N'2024-11-05T10:51:59.3233333' AS DateTime2))
INSERT [dbo].[FriendShips] ([FriendShipId], [User1Id], [User2Id], [FriendsSince]) VALUES (18, N'5b510644-d571-499c-bc46-db0b0185472e', N'956197f1-53be-4ec6-9caf-a35a8ba70c75', CAST(N'2024-07-31T10:51:59.3233333' AS DateTime2))
INSERT [dbo].[FriendShips] ([FriendShipId], [User1Id], [User2Id], [FriendsSince]) VALUES (19, N'5b510644-d571-499c-bc46-db0b0185472e', N'9f9ab6c5-21b9-47ed-8d07-f6ed0c45b14d', CAST(N'2024-05-25T10:51:59.3233333' AS DateTime2))
INSERT [dbo].[FriendShips] ([FriendShipId], [User1Id], [User2Id], [FriendsSince]) VALUES (20, N'925cec0a-0c33-4d8a-b140-1380d37e821d', N'93e8543a-971f-4a6c-b769-f5d79844963c', CAST(N'2024-10-17T10:51:59.3233333' AS DateTime2))
INSERT [dbo].[FriendShips] ([FriendShipId], [User1Id], [User2Id], [FriendsSince]) VALUES (22, N'925cec0a-0c33-4d8a-b140-1380d37e821d', N'9f9ab6c5-21b9-47ed-8d07-f6ed0c45b14d', CAST(N'2023-12-18T10:51:59.3233333' AS DateTime2))
INSERT [dbo].[FriendShips] ([FriendShipId], [User1Id], [User2Id], [FriendsSince]) VALUES (23, N'93e8543a-971f-4a6c-b769-f5d79844963c', N'956197f1-53be-4ec6-9caf-a35a8ba70c75', CAST(N'2023-11-22T10:51:59.3233333' AS DateTime2))
INSERT [dbo].[FriendShips] ([FriendShipId], [User1Id], [User2Id], [FriendsSince]) VALUES (24, N'93e8543a-971f-4a6c-b769-f5d79844963c', N'9f9ab6c5-21b9-47ed-8d07-f6ed0c45b14d', CAST(N'2024-09-28T10:51:59.3233333' AS DateTime2))
INSERT [dbo].[FriendShips] ([FriendShipId], [User1Id], [User2Id], [FriendsSince]) VALUES (25, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'9f9ab6c5-21b9-47ed-8d07-f6ed0c45b14d', CAST(N'2024-07-31T10:51:59.3233333' AS DateTime2))
SET IDENTITY_INSERT [dbo].[FriendShips] OFF
GO
SET IDENTITY_INSERT [dbo].[Media] ON 

INSERT [dbo].[Media] ([Id], [Url], [Name], [MediaType], [MessageId], [PostId], [FileType]) VALUES (12, N'http://res.cloudinary.com/dj7lju0cn/image/upload/v1727849467/Connectify/zx0v8vn8g6ybll8bsfe9.jpg', N'DSCF7002 (1).jpg', N'Message', 32, NULL, N'image/jpg')
INSERT [dbo].[Media] ([Id], [Url], [Name], [MediaType], [MessageId], [PostId], [FileType]) VALUES (13, N'http://res.cloudinary.com/dj7lju0cn/image/upload/v1727849528/Connectify/qn5ru17qzraayysehxic.jpg', N'DSCF5480.jpg', N'Message', 33, NULL, N'image/jpg')
INSERT [dbo].[Media] ([Id], [Url], [Name], [MediaType], [MessageId], [PostId], [FileType]) VALUES (14, N'http://res.cloudinary.com/dj7lju0cn/image/upload/v1727849546/Connectify/mzaeexiapg7gmfrno0kk.jpg', N'DSCF6166.jpg', N'Message', 33, NULL, N'image/jpg')
INSERT [dbo].[Media] ([Id], [Url], [Name], [MediaType], [MessageId], [PostId], [FileType]) VALUES (15, N'http://res.cloudinary.com/dj7lju0cn/image/upload/v1727849552/Connectify/dm8jjywos4t65b3qurvn.jpg', N'DSCF6168.jpg', N'Message', 33, NULL, N'image/jpg')
INSERT [dbo].[Media] ([Id], [Url], [Name], [MediaType], [MessageId], [PostId], [FileType]) VALUES (16, N'http://res.cloudinary.com/dj7lju0cn/image/upload/v1728124018/Connectify/dodc5gmpoi6ll1nygmrp.jpg', N'DSCF5465.jpg', N'Message', 34, NULL, N'image/jpg')
INSERT [dbo].[Media] ([Id], [Url], [Name], [MediaType], [MessageId], [PostId], [FileType]) VALUES (17, N'http://res.cloudinary.com/dj7lju0cn/image/upload/v1728124018/Connectify/rezhgngidhzujooywhj7.jpg', N'DSCF5466.jpg', N'Message', 34, NULL, N'image/jpg')
INSERT [dbo].[Media] ([Id], [Url], [Name], [MediaType], [MessageId], [PostId], [FileType]) VALUES (18, N'http://res.cloudinary.com/dj7lju0cn/image/upload/v1728124015/Connectify/q5hzvijguxiakjvy2dnh.jpg', N'DSCF5480.jpg', N'Message', 34, NULL, N'image/jpg')
INSERT [dbo].[Media] ([Id], [Url], [Name], [MediaType], [MessageId], [PostId], [FileType]) VALUES (21, N'http://res.cloudinary.com/dj7lju0cn/image/upload/v1728712573/Connectify/xzs8yyhwvyy0wrlawtvw.jpg', N'DSCF5465.jpg', N'Post', NULL, 8, N'image/jpg')
INSERT [dbo].[Media] ([Id], [Url], [Name], [MediaType], [MessageId], [PostId], [FileType]) VALUES (22, N'http://res.cloudinary.com/dj7lju0cn/image/upload/v1728712573/Connectify/y2anspnnzqbtl8pqhjsx.jpg', N'DSCF5466.jpg', N'Post', NULL, 8, N'image/jpg')
INSERT [dbo].[Media] ([Id], [Url], [Name], [MediaType], [MessageId], [PostId], [FileType]) VALUES (23, N'http://res.cloudinary.com/dj7lju0cn/image/upload/v1729243458/Connectify/wmizgujkfvxh8oko0mnz.jpg', N'DSCF6705.jpg', N'Post', NULL, 10, N'image/jpg')
INSERT [dbo].[Media] ([Id], [Url], [Name], [MediaType], [MessageId], [PostId], [FileType]) VALUES (24, N'http://res.cloudinary.com/dj7lju0cn/video/upload/v1729320619/Connectify/n7airupbh6ybd3v7xlvh.mp4', N'DemoVid1.mp4', N'Post', NULL, 11, N'video/mp4')
INSERT [dbo].[Media] ([Id], [Url], [Name], [MediaType], [MessageId], [PostId], [FileType]) VALUES (27, N'http://res.cloudinary.com/dj7lju0cn/image/upload/v1729481531/Connectify/t6dwxsc4a8qfaopoq4w3.jpg', N'DSCF5465.jpg', N'Post', NULL, 12, N'image/jpg')
INSERT [dbo].[Media] ([Id], [Url], [Name], [MediaType], [MessageId], [PostId], [FileType]) VALUES (28, N'http://res.cloudinary.com/dj7lju0cn/image/upload/v1729481532/Connectify/fthzem4gb2oycq74syxe.jpg', N'DSCF5466.jpg', N'Post', NULL, 12, N'image/jpg')
INSERT [dbo].[Media] ([Id], [Url], [Name], [MediaType], [MessageId], [PostId], [FileType]) VALUES (30, N'http://res.cloudinary.com/dj7lju0cn/image/upload/v1729481617/Connectify/uwzxc7yexcx9nhekbzk2.jpg', N'DSCF6705.jpg', N'Post', NULL, 13, N'image/jpg')
INSERT [dbo].[Media] ([Id], [Url], [Name], [MediaType], [MessageId], [PostId], [FileType]) VALUES (31, N'http://res.cloudinary.com/dj7lju0cn/image/upload/v1729481614/Connectify/wo7sdd93vghjpuenoldd.jpg', N'DSCF5465.jpg', N'Post', NULL, 13, N'image/jpg')
INSERT [dbo].[Media] ([Id], [Url], [Name], [MediaType], [MessageId], [PostId], [FileType]) VALUES (32, N'http://res.cloudinary.com/dj7lju0cn/image/upload/v1729481614/Connectify/pfomadh00nu9i2l3burk.jpg', N'DSCF5466.jpg', N'Post', NULL, 13, N'image/jpg')
INSERT [dbo].[Media] ([Id], [Url], [Name], [MediaType], [MessageId], [PostId], [FileType]) VALUES (33, N'http://res.cloudinary.com/dj7lju0cn/image/upload/v1729491071/Connectify/eb5nooc8pm7kxhesafbo.jpg', N'DSCF5480.jpg', N'Post', NULL, 14, N'image/jpg')
INSERT [dbo].[Media] ([Id], [Url], [Name], [MediaType], [MessageId], [PostId], [FileType]) VALUES (34, N'http://res.cloudinary.com/dj7lju0cn/image/upload/v1729652218/Connectify/ziep8pyyvqykksw0jnof.png', N'Screenshot (9).png', N'Post', NULL, 15, N'image/png')
INSERT [dbo].[Media] ([Id], [Url], [Name], [MediaType], [MessageId], [PostId], [FileType]) VALUES (36, N'http://res.cloudinary.com/dj7lju0cn/image/upload/v1729842499/Connectify/bfvshjzu9glab1pufyla.png', N'Screenshot (9).png', N'Post', NULL, 13, N'image/png')
INSERT [dbo].[Media] ([Id], [Url], [Name], [MediaType], [MessageId], [PostId], [FileType]) VALUES (37, N'http://res.cloudinary.com/dj7lju0cn/image/upload/v1729843003/Connectify/ztotsjft04qetgxdkuvf.png', N'Screenshot (9).png', N'Post', NULL, 12, N'image/png')
INSERT [dbo].[Media] ([Id], [Url], [Name], [MediaType], [MessageId], [PostId], [FileType]) VALUES (41, N'http://res.cloudinary.com/dj7lju0cn/image/upload/v1729926927/Connectify/v7k0bydzkj6i3kln0qtp.png', N'Screenshot (3).png', N'Post', NULL, 16, N'image/png')
INSERT [dbo].[Media] ([Id], [Url], [Name], [MediaType], [MessageId], [PostId], [FileType]) VALUES (42, N'http://res.cloudinary.com/dj7lju0cn/image/upload/v1729926928/Connectify/fiu40s9eoklaejrfnar7.png', N'Screenshot (4).png', N'Post', NULL, 16, N'image/png')
INSERT [dbo].[Media] ([Id], [Url], [Name], [MediaType], [MessageId], [PostId], [FileType]) VALUES (44, N'http://res.cloudinary.com/dj7lju0cn/image/upload/v1729956276/Connectify/dqxo6xzwnaum9luchklv.png', N'Screenshot (28).png', N'Post', NULL, 16, N'image/png')
INSERT [dbo].[Media] ([Id], [Url], [Name], [MediaType], [MessageId], [PostId], [FileType]) VALUES (63, N'http://res.cloudinary.com/dj7lju0cn/image/upload/v1731007148/Connectify/kguwhoxennn8lndajcz4.png', N'Screenshot (9).png', N'Message', 149, NULL, NULL)
INSERT [dbo].[Media] ([Id], [Url], [Name], [MediaType], [MessageId], [PostId], [FileType]) VALUES (64, N'http://res.cloudinary.com/dj7lju0cn/image/upload/v1731007149/Connectify/sg82smmfvblm4wsdfjve.png', N'Screenshot (9).png', N'Message', 150, NULL, NULL)
INSERT [dbo].[Media] ([Id], [Url], [Name], [MediaType], [MessageId], [PostId], [FileType]) VALUES (68, N'http://res.cloudinary.com/dj7lju0cn/image/upload/v1732003748/Connectify/aafaqcbqtzhtxqfryxeb.png', N'Ảnh chụp màn hình_20230205_090339.png', N'Post', NULL, 20, N'image/png')
SET IDENTITY_INSERT [dbo].[Media] OFF
GO
SET IDENTITY_INSERT [dbo].[Messages] ON 

INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (31, 1, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'hello quan vuong', 0, CAST(N'2024-10-02T06:10:40.8044136' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (32, 1, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', NULL, 2, CAST(N'2024-10-02T06:10:59.1036147' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (33, 1, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', NULL, 2, CAST(N'2024-10-02T06:12:07.7215028' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (34, 2, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', NULL, 2, CAST(N'2024-10-05T10:26:54.4264424' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (35, 2, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'Hello', 0, CAST(N'2024-10-05T10:27:29.9283558' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (36, 1, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'm có sợ tao không', 0, CAST(N'2024-11-03T08:50:14.0460021' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (37, 1, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'1', 0, CAST(N'2024-11-04T07:26:12.4588488' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (38, 1, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'2', 0, CAST(N'2024-11-04T07:26:13.4569256' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (39, 1, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'3', 0, CAST(N'2024-11-04T07:26:14.1490123' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (40, 1, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'4', 0, CAST(N'2024-11-04T07:26:14.8055101' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (41, 1, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'5', 0, CAST(N'2024-11-04T07:26:15.3499646' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (42, 1, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'6', 0, CAST(N'2024-11-04T07:26:15.8007401' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (43, 1, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'7', 0, CAST(N'2024-11-04T07:26:16.3105822' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (44, 1, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'8', 0, CAST(N'2024-11-04T07:26:16.8145446' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (45, 1, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'9', 0, CAST(N'2024-11-04T07:26:17.3276817' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (46, 1, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'0', 0, CAST(N'2024-11-04T07:26:17.8171989' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (47, 1, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'1', 0, CAST(N'2024-11-04T07:26:20.9001039' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (48, 1, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'2', 0, CAST(N'2024-11-04T07:26:21.3335426' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (49, 1, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'3', 0, CAST(N'2024-11-04T07:26:21.7589820' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (50, 1, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'4', 0, CAST(N'2024-11-04T07:26:22.0824584' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (51, 1, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'5', 0, CAST(N'2024-11-04T07:26:22.7511971' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (52, 1, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'6', 0, CAST(N'2024-11-04T07:26:23.8086964' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (53, 1, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'7', 0, CAST(N'2024-11-06T08:11:00.6759635' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (54, 1, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'8', 0, CAST(N'2024-11-06T09:33:58.5791594' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (55, 1, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'9', 0, CAST(N'2024-11-06T09:38:50.3893517' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (56, 1, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'10', 0, CAST(N'2024-11-06T09:39:56.6190647' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (57, 1, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'11', 0, CAST(N'2024-11-06T09:41:37.9977636' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (58, 1, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'12', 0, CAST(N'2024-11-06T09:42:02.4155099' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (59, 1, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'13', 0, CAST(N'2024-11-06T09:42:16.4442386' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (60, 1, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'14', 0, CAST(N'2024-11-06T09:42:39.4876387' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (61, 1, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'15', 0, CAST(N'2024-11-06T09:42:54.4869108' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (62, 1, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'16', 0, CAST(N'2024-11-06T09:44:10.6477848' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (63, 1, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'17', 0, CAST(N'2024-11-06T09:44:53.5291652' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (64, 1, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'18', 0, CAST(N'2024-11-06T09:48:08.8332014' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (65, 1, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'19', 0, CAST(N'2024-11-06T09:48:23.6606459' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (66, 1, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'20', 0, CAST(N'2024-11-06T09:49:22.1163018' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (67, 1, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'1', 0, CAST(N'2024-11-06T09:50:09.8838871' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (68, 3, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'hello', 0, CAST(N'2024-11-06T15:03:23.8564329' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (69, 1, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'3', 0, CAST(N'2024-11-06T18:49:12.7669641' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (70, 1, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'4', 0, CAST(N'2024-11-06T18:49:19.0501806' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (71, 3, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'hi', 0, CAST(N'2024-11-06T18:57:17.0244146' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (72, 1, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'5', 0, CAST(N'2024-11-06T19:10:13.9966019' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (73, 2, N'5b510644-d571-499c-bc46-db0b0185472e', N'vi chang ai doi mai yeu mai 1 nguoi', 0, CAST(N'2024-11-06T19:40:54.1277811' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (74, 2, N'5b510644-d571-499c-bc46-db0b0185472e', N'dung khong', 0, CAST(N'2024-11-07T02:29:22.7322661' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (75, 2, N'5b510644-d571-499c-bc46-db0b0185472e', N'dung khong ban', 0, CAST(N'2024-11-07T02:33:48.5454509' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (76, 2, N'5b510644-d571-499c-bc46-db0b0185472e', N'tra loi di ban', 0, CAST(N'2024-11-07T03:02:47.2395122' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (77, 2, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'sao ban', 0, CAST(N'2024-11-07T03:07:01.5393264' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (78, 2, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'noi j di', 0, CAST(N'2024-11-07T03:10:57.7244575' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (79, 2, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'sao k noi j vay', 0, CAST(N'2024-11-07T03:11:34.4711707' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (80, 2, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'alo', 0, CAST(N'2024-11-07T03:11:50.9354165' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (81, 2, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'answer me', 0, CAST(N'2024-11-07T03:14:39.7470676' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (82, 2, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'alo', 0, CAST(N'2024-11-07T03:14:53.4855055' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (83, 2, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'answer', 0, CAST(N'2024-11-07T03:14:55.8529468' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (84, 2, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'why not answer', 0, CAST(N'2024-11-07T03:15:23.7785098' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (85, 1, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'alo', 0, CAST(N'2024-11-07T03:15:35.7539204' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (86, 2, N'5b510644-d571-499c-bc46-db0b0185472e', N'cai j', 0, CAST(N'2024-11-07T03:16:03.6781931' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (87, 2, N'5b510644-d571-499c-bc46-db0b0185472e', N'sao m on the', 0, CAST(N'2024-11-07T03:17:09.8289670' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (88, 2, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'say sth', 0, CAST(N'2024-11-07T03:18:15.2179602' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (89, 2, N'5b510644-d571-499c-bc46-db0b0185472e', N'alo', 0, CAST(N'2024-11-07T03:18:36.0306383' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (90, 2, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'gioi', 0, CAST(N'2024-11-07T03:19:44.3023164' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (91, 2, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'tot', 0, CAST(N'2024-11-07T03:22:40.7398275' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (92, 2, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'hay', 0, CAST(N'2024-11-07T03:23:43.8123444' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (93, 2, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'to', 0, CAST(N'2024-11-07T03:32:11.5401290' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (94, 2, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'hello', 0, CAST(N'2024-11-07T03:32:45.3082841' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (95, 2, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'hi', 0, CAST(N'2024-11-07T03:39:54.2720221' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (96, 2, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'hello', 0, CAST(N'2024-11-07T03:42:38.5461465' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (97, 2, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'got it', 0, CAST(N'2024-11-07T03:43:59.0003976' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (98, 2, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'right', 0, CAST(N'2024-11-07T03:52:26.7745784' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (99, 2, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'ok', 0, CAST(N'2024-11-07T03:54:17.9577521' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (100, 2, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'chap nhan', 0, CAST(N'2024-11-07T04:00:11.9042545' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (101, 2, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N's', 0, CAST(N'2024-11-07T04:00:33.8024951' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (102, 2, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'j', 0, CAST(N'2024-11-07T04:04:29.0951906' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (103, 2, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'l', 0, CAST(N'2024-11-07T04:04:33.9060607' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (104, 2, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'n', 0, CAST(N'2024-11-07T04:04:35.4352660' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (105, 2, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'hi', 0, CAST(N'2024-11-07T04:05:36.8295152' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (106, 2, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'hi', 0, CAST(N'2024-11-07T04:06:18.7225408' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (107, 2, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'hi', 0, CAST(N'2024-11-07T04:07:43.8739500' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (108, 2, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'hi', 0, CAST(N'2024-11-07T04:08:41.9286599' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (109, 2, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'hellp', 0, CAST(N'2024-11-07T04:08:48.8526898' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (110, 3, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'hello', 0, CAST(N'2024-11-07T04:08:57.1457456' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (111, 2, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'help', 0, CAST(N'2024-11-07T04:09:50.8374704' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (112, 3, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'help', 0, CAST(N'2024-11-07T04:10:06.4568811' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (113, 2, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'help', 0, CAST(N'2024-11-07T04:11:07.5774791' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (114, 2, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'hi', 0, CAST(N'2024-11-07T04:12:24.9170723' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (115, 3, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'i''m upset', 0, CAST(N'2024-11-07T04:12:51.6834651' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (116, 2, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'hi there', 0, CAST(N'2024-11-07T04:13:24.1841510' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (117, 1, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'hello', 0, CAST(N'2024-11-07T04:13:47.4113768' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (118, 1, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'how', 0, CAST(N'2024-11-07T04:13:53.6885873' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (119, 1, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'fine', 0, CAST(N'2024-11-07T04:14:29.4693026' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (120, 1, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'fine', 0, CAST(N'2024-11-07T04:17:09.0540126' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (121, 2, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'hi there', 0, CAST(N'2024-11-07T04:17:16.5946481' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (122, 2, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'fine', 0, CAST(N'2024-11-07T04:17:27.1677287' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (123, 2, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'fine', 0, CAST(N'2024-11-07T04:17:33.0142216' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (124, 2, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'fine', 0, CAST(N'2024-11-07T04:17:47.7619625' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (125, 1, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'fine', 0, CAST(N'2024-11-07T04:17:55.6779377' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (126, 3, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'thank', 0, CAST(N'2024-11-07T04:18:04.5252100' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (127, 2, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'fine', 0, CAST(N'2024-11-07T04:18:08.9282310' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (128, 2, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'fine', 0, CAST(N'2024-11-07T04:18:15.7858610' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (129, 2, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'fine', 0, CAST(N'2024-11-07T04:18:16.8590701' AS DateTime2), NULL, 0)
GO
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (130, 2, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'fine', 0, CAST(N'2024-11-07T04:18:18.8786498' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (131, 3, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'alo', 0, CAST(N'2024-11-07T04:18:37.4205967' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (132, 3, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'alo', 0, CAST(N'2024-11-07T04:18:42.0835952' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (133, 3, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'alo', 0, CAST(N'2024-11-07T04:18:49.7862522' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (134, 2, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'fine', 0, CAST(N'2024-11-07T04:19:08.3636322' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (135, 2, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'hi', 0, CAST(N'2024-11-07T05:28:23.6131103' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (136, 3, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'hello', 0, CAST(N'2024-11-07T06:12:37.7144684' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (137, 2, N'5b510644-d571-499c-bc46-db0b0185472e', N'what are you doing', 0, CAST(N'2024-11-07T06:13:58.5223979' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (138, 2, N'5b510644-d571-499c-bc46-db0b0185472e', N'alo', 0, CAST(N'2024-11-07T06:17:23.7656620' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (139, 2, N'5b510644-d571-499c-bc46-db0b0185472e', N'co nghe j k', 0, CAST(N'2024-11-07T06:19:05.2672010' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (140, 2, N'5b510644-d571-499c-bc46-db0b0185472e', N'alo', 0, CAST(N'2024-11-07T06:20:01.8347031' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (141, 2, N'5b510644-d571-499c-bc46-db0b0185472e', N'alo', 0, CAST(N'2024-11-07T06:22:42.6058817' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (142, 3, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'hello', 0, CAST(N'2024-11-07T06:23:06.3042492' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (143, 3, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'hello', 0, CAST(N'2024-11-07T06:23:35.0136018' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (144, 2, N'5b510644-d571-499c-bc46-db0b0185472e', N'co nghe k', 0, CAST(N'2024-11-07T06:23:46.1463807' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (145, 3, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'alo', 0, CAST(N'2024-11-07T06:27:19.7505648' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (146, 2, N'5b510644-d571-499c-bc46-db0b0185472e', N'k nghe a', 0, CAST(N'2024-11-07T06:27:28.8371783' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (147, 2, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'ssssssssssssssssssssssssssss', 0, CAST(N'2024-11-07T07:15:15.6050490' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (148, 3, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'sao k tra loi', 0, CAST(N'2024-11-07T19:18:45.5112920' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (149, 3, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', NULL, 2, CAST(N'2024-11-07T19:19:05.5089842' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (150, 3, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', NULL, 2, CAST(N'2024-11-07T19:19:07.6117820' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (151, 2, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'k rep t a', 0, CAST(N'2024-11-08T06:27:43.1876612' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (152, 2, N'5b510644-d571-499c-bc46-db0b0185472e', N'del thich lam j nhau', 0, CAST(N'2024-11-08T06:28:24.7885444' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (153, 2, N'5b510644-d571-499c-bc46-db0b0185472e', N'sao', 0, CAST(N'2024-11-08T06:28:47.5817300' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (154, 1, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'n', 0, CAST(N'2024-11-08T07:21:11.6293964' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (155, 1, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'i', 0, CAST(N'2024-11-09T08:45:11.5543457' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (156, 1, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'k', 0, CAST(N'2024-11-09T08:48:21.0208558' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (157, 2, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'k co chi', 0, CAST(N'2024-11-09T09:43:20.3240567' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (158, 2, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'sao k rep', 0, CAST(N'2024-11-09T09:45:22.5709266' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (159, 2, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'ha', 0, CAST(N'2024-11-09T09:50:47.1463928' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (160, 2, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'cai j', 0, CAST(N'2024-11-09T10:13:34.8012603' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (161, 2, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'alo', 0, CAST(N'2024-11-09T10:15:01.6128928' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (162, 2, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'alo', 0, CAST(N'2024-11-09T10:15:35.9187698' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (163, 2, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'hi', 0, CAST(N'2024-11-09T10:15:59.4448268' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (164, 2, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'sao k rep', 0, CAST(N'2024-11-09T10:16:12.2671983' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (165, 2, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'alo', 0, CAST(N'2024-11-09T10:22:34.9894335' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (166, 2, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'lo', 0, CAST(N'2024-11-09T10:24:40.5059038' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (167, 2, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'alo', 0, CAST(N'2024-11-09T10:25:41.5222342' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (168, 1, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'hieu k', 0, CAST(N'2024-11-09T10:26:16.8256725' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (169, 2, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'sao k rep', 0, CAST(N'2024-11-09T10:26:46.3395508' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (170, 1, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'alo', 0, CAST(N'2024-11-09T13:03:45.7072561' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (171, 2, N'5b510644-d571-499c-bc46-db0b0185472e', N'tai k thich', 0, CAST(N'2024-11-09T13:04:37.5609810' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (172, 2, N'5b510644-d571-499c-bc46-db0b0185472e', N'the thoi', 0, CAST(N'2024-11-09T13:35:38.3786323' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (173, 2, N'5b510644-d571-499c-bc46-db0b0185472e', N'alo', 0, CAST(N'2024-11-09T14:53:22.8763355' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (174, 2, N'5b510644-d571-499c-bc46-db0b0185472e', N'nhe', 0, CAST(N'2024-11-09T15:07:13.5420778' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (175, 2, N'5b510644-d571-499c-bc46-db0b0185472e', N'the nhe', 0, CAST(N'2024-11-09T19:14:30.9051776' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (176, 1, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'sao k rep', 0, CAST(N'2024-11-09T19:14:43.3036164' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (177, 2, N'5b510644-d571-499c-bc46-db0b0185472e', N'hihi', 0, CAST(N'2024-11-09T19:14:49.6310699' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (178, 1, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'hu', 0, CAST(N'2024-11-09T19:15:29.6168424' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (179, 2, N'5b510644-d571-499c-bc46-db0b0185472e', N'haha', 0, CAST(N'2024-11-09T19:15:36.9889570' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (180, 1, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', NULL, 0, CAST(N'2024-11-10T15:07:21.2355514' AS DateTime2), NULL, 1)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (181, 2, N'5b510644-d571-499c-bc46-db0b0185472e', N'hello', 0, CAST(N'2024-11-10T15:11:24.0176362' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (182, 2, N'5b510644-d571-499c-bc46-db0b0185472e', N'e cho a hoi cai ni chut', 0, CAST(N'2024-11-11T03:05:31.3028738' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (183, 2, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'sao e', 0, CAST(N'2024-11-12T04:15:24.5546134' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (184, 2, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'1', 0, CAST(N'2024-11-15T08:42:13.4095876' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (185, 2, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'2', 0, CAST(N'2024-11-15T08:42:18.1915838' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (186, 2, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'1
!
!
@', 0, CAST(N'2024-11-15T08:50:45.8461821' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (187, 1, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', NULL, 0, CAST(N'2024-11-15T08:53:42.7366431' AS DateTime2), NULL, 1)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (188, 1, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'hi
anh la khoi', 0, CAST(N'2024-11-15T08:54:31.1764745' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (191, 11, N'5b510644-d571-499c-bc46-db0b0185472e', N'hello', 0, CAST(N'2024-11-28T15:30:19.6436840' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (192, 11, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'hi', 0, CAST(N'2024-11-28T15:30:28.1789929' AS DateTime2), NULL, 0)
INSERT [dbo].[Messages] ([MessageId], [ChatRoomId], [SenderId], [Text], [Type], [SentAt], [ReplyToId], [Deleted]) VALUES (193, 11, N'5b510644-d571-499c-bc46-db0b0185472e', N'dang lam j the ae', 0, CAST(N'2024-11-28T15:30:40.4051482' AS DateTime2), NULL, 0)
SET IDENTITY_INSERT [dbo].[Messages] OFF
GO
SET IDENTITY_INSERT [dbo].[MessageVisibilities] ON 

INSERT [dbo].[MessageVisibilities] ([Id], [UserId], [MessageId], [DeletedAt]) VALUES (1, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', 181, CAST(N'2024-11-11T03:06:12.6994543' AS DateTime2))
INSERT [dbo].[MessageVisibilities] ([Id], [UserId], [MessageId], [DeletedAt]) VALUES (2, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', 179, CAST(N'2024-11-11T03:15:32.7431036' AS DateTime2))
INSERT [dbo].[MessageVisibilities] ([Id], [UserId], [MessageId], [DeletedAt]) VALUES (3, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', 177, CAST(N'2024-11-11T03:32:37.0364825' AS DateTime2))
INSERT [dbo].[MessageVisibilities] ([Id], [UserId], [MessageId], [DeletedAt]) VALUES (4, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', 175, CAST(N'2024-11-11T03:34:55.8430243' AS DateTime2))
INSERT [dbo].[MessageVisibilities] ([Id], [UserId], [MessageId], [DeletedAt]) VALUES (5, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', 174, CAST(N'2024-11-11T03:36:22.4875183' AS DateTime2))
INSERT [dbo].[MessageVisibilities] ([Id], [UserId], [MessageId], [DeletedAt]) VALUES (6, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', 174, CAST(N'2024-11-11T03:36:59.4063092' AS DateTime2))
INSERT [dbo].[MessageVisibilities] ([Id], [UserId], [MessageId], [DeletedAt]) VALUES (7, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', 174, CAST(N'2024-11-11T03:37:07.4407206' AS DateTime2))
INSERT [dbo].[MessageVisibilities] ([Id], [UserId], [MessageId], [DeletedAt]) VALUES (8, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', 173, CAST(N'2024-11-11T03:40:41.4813056' AS DateTime2))
INSERT [dbo].[MessageVisibilities] ([Id], [UserId], [MessageId], [DeletedAt]) VALUES (9, N'5b510644-d571-499c-bc46-db0b0185472e', 183, CAST(N'2024-11-20T09:45:48.0155882' AS DateTime2))
SET IDENTITY_INSERT [dbo].[MessageVisibilities] OFF
GO
SET IDENTITY_INSERT [dbo].[notification] ON 

INSERT [dbo].[notification] ([notification_id], [triggered_by_user_id], [message], [Type], [action_link], [create_at], [expiration_time]) VALUES (1, N'5b510644-d571-499c-bc46-db0b0185472e', N'reacted to your post.', 1, N'/post-view/29/0', CAST(N'2024-11-29T21:11:25.6168486' AS DateTime2), NULL)
INSERT [dbo].[notification] ([notification_id], [triggered_by_user_id], [message], [Type], [action_link], [create_at], [expiration_time]) VALUES (2, N'5b510644-d571-499c-bc46-db0b0185472e', N'reacted to your comment.', 4, N'/post-view/29/58', CAST(N'2024-11-29T21:14:04.0310060' AS DateTime2), NULL)
INSERT [dbo].[notification] ([notification_id], [triggered_by_user_id], [message], [Type], [action_link], [create_at], [expiration_time]) VALUES (3, N'5b510644-d571-499c-bc46-db0b0185472e', N'replied to your comment.', 3, N'/post-view/29/59', CAST(N'2024-11-29T21:18:16.0487021' AS DateTime2), NULL)
INSERT [dbo].[notification] ([notification_id], [triggered_by_user_id], [message], [Type], [action_link], [create_at], [expiration_time]) VALUES (4, N'5b510644-d571-499c-bc46-db0b0185472e', N'commented on your post.', 2, N'/post-view/29/59', CAST(N'2024-11-29T21:18:16.0746367' AS DateTime2), NULL)
INSERT [dbo].[notification] ([notification_id], [triggered_by_user_id], [message], [Type], [action_link], [create_at], [expiration_time]) VALUES (5, N'5b510644-d571-499c-bc46-db0b0185472e', N'commented on your post.', 2, N'/post-view/29/61', CAST(N'2024-11-29T21:20:19.0831480' AS DateTime2), NULL)
INSERT [dbo].[notification] ([notification_id], [triggered_by_user_id], [message], [Type], [action_link], [create_at], [expiration_time]) VALUES (6, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'replied to your comment.', 3, N'/post-view/29/62', CAST(N'2024-11-29T21:20:48.5118797' AS DateTime2), NULL)
INSERT [dbo].[notification] ([notification_id], [triggered_by_user_id], [message], [Type], [action_link], [create_at], [expiration_time]) VALUES (7, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'reacted to your comment.', 4, N'/post-view/29/61', CAST(N'2024-11-29T21:20:52.3180133' AS DateTime2), NULL)
INSERT [dbo].[notification] ([notification_id], [triggered_by_user_id], [message], [Type], [action_link], [create_at], [expiration_time]) VALUES (8, N'5b510644-d571-499c-bc46-db0b0185472e', N'reacted to your comment.', 4, N'/post-view/29/62', CAST(N'2024-11-29T21:21:20.3501584' AS DateTime2), NULL)
INSERT [dbo].[notification] ([notification_id], [triggered_by_user_id], [message], [Type], [action_link], [create_at], [expiration_time]) VALUES (9, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'reacted to your comment.', 4, N'/post-view/29/59', CAST(N'2024-11-29T23:56:31.1516330' AS DateTime2), NULL)
INSERT [dbo].[notification] ([notification_id], [triggered_by_user_id], [message], [Type], [action_link], [create_at], [expiration_time]) VALUES (10, N'5b510644-d571-499c-bc46-db0b0185472e', N'replied to your comment.', 3, N'/post-view/29/63', CAST(N'2024-11-30T00:05:04.3354018' AS DateTime2), NULL)
INSERT [dbo].[notification] ([notification_id], [triggered_by_user_id], [message], [Type], [action_link], [create_at], [expiration_time]) VALUES (11, N'5b510644-d571-499c-bc46-db0b0185472e', N'commented on your post.', 2, N'/post-view/29/63', CAST(N'2024-11-30T00:05:04.4015371' AS DateTime2), NULL)
INSERT [dbo].[notification] ([notification_id], [triggered_by_user_id], [message], [Type], [action_link], [create_at], [expiration_time]) VALUES (12, N'5b510644-d571-499c-bc46-db0b0185472e', N'replied to your comment.', 3, N'/post-view/29/64', CAST(N'2024-11-30T00:26:46.4827063' AS DateTime2), NULL)
INSERT [dbo].[notification] ([notification_id], [triggered_by_user_id], [message], [Type], [action_link], [create_at], [expiration_time]) VALUES (13, N'5b510644-d571-499c-bc46-db0b0185472e', N'commented on your post.', 2, N'/post-view/29/64', CAST(N'2024-11-30T00:31:55.5976788' AS DateTime2), NULL)
INSERT [dbo].[notification] ([notification_id], [triggered_by_user_id], [message], [Type], [action_link], [create_at], [expiration_time]) VALUES (14, N'5b510644-d571-499c-bc46-db0b0185472e', N'commented on your post.', 2, N'/post-view/29/65', CAST(N'2024-11-30T00:36:02.2683130' AS DateTime2), NULL)
INSERT [dbo].[notification] ([notification_id], [triggered_by_user_id], [message], [Type], [action_link], [create_at], [expiration_time]) VALUES (15, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'replied to your comment.', 3, N'/post-view/29/66', CAST(N'2024-11-30T00:36:44.2148708' AS DateTime2), NULL)
INSERT [dbo].[notification] ([notification_id], [triggered_by_user_id], [message], [Type], [action_link], [create_at], [expiration_time]) VALUES (16, N'5b510644-d571-499c-bc46-db0b0185472e', N'commented on your post.', 2, N'/post-view/29/67', CAST(N'2024-11-30T00:46:15.3531307' AS DateTime2), NULL)
SET IDENTITY_INSERT [dbo].[notification] OFF
GO
INSERT [dbo].[notification_recipient] ([NotificationId], [UserId], [IsRead]) VALUES (1, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', 1)
INSERT [dbo].[notification_recipient] ([NotificationId], [UserId], [IsRead]) VALUES (2, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', 1)
INSERT [dbo].[notification_recipient] ([NotificationId], [UserId], [IsRead]) VALUES (3, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', 1)
INSERT [dbo].[notification_recipient] ([NotificationId], [UserId], [IsRead]) VALUES (4, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', 1)
INSERT [dbo].[notification_recipient] ([NotificationId], [UserId], [IsRead]) VALUES (5, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', 1)
INSERT [dbo].[notification_recipient] ([NotificationId], [UserId], [IsRead]) VALUES (6, N'5b510644-d571-499c-bc46-db0b0185472e', 0)
INSERT [dbo].[notification_recipient] ([NotificationId], [UserId], [IsRead]) VALUES (7, N'5b510644-d571-499c-bc46-db0b0185472e', 1)
INSERT [dbo].[notification_recipient] ([NotificationId], [UserId], [IsRead]) VALUES (8, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', 0)
INSERT [dbo].[notification_recipient] ([NotificationId], [UserId], [IsRead]) VALUES (9, N'5b510644-d571-499c-bc46-db0b0185472e', 0)
INSERT [dbo].[notification_recipient] ([NotificationId], [UserId], [IsRead]) VALUES (10, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', 0)
INSERT [dbo].[notification_recipient] ([NotificationId], [UserId], [IsRead]) VALUES (11, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', 0)
INSERT [dbo].[notification_recipient] ([NotificationId], [UserId], [IsRead]) VALUES (12, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', 0)
INSERT [dbo].[notification_recipient] ([NotificationId], [UserId], [IsRead]) VALUES (13, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', 0)
INSERT [dbo].[notification_recipient] ([NotificationId], [UserId], [IsRead]) VALUES (14, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', 0)
INSERT [dbo].[notification_recipient] ([NotificationId], [UserId], [IsRead]) VALUES (15, N'5b510644-d571-499c-bc46-db0b0185472e', 0)
INSERT [dbo].[notification_recipient] ([NotificationId], [UserId], [IsRead]) VALUES (16, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', 1)
GO
SET IDENTITY_INSERT [dbo].[PostReactions] ON 

INSERT [dbo].[PostReactions] ([Id], [PostId], [UserId], [Reaction], [UpdateAt]) VALUES (1, 8, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', 0, CAST(N'0001-01-01T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[PostReactions] ([Id], [PostId], [UserId], [Reaction], [UpdateAt]) VALUES (16, 11, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', 0, CAST(N'0001-01-01T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[PostReactions] ([Id], [PostId], [UserId], [Reaction], [UpdateAt]) VALUES (17, 13, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', 0, CAST(N'0001-01-01T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[PostReactions] ([Id], [PostId], [UserId], [Reaction], [UpdateAt]) VALUES (18, 12, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', 3, CAST(N'0001-01-01T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[PostReactions] ([Id], [PostId], [UserId], [Reaction], [UpdateAt]) VALUES (24, 16, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', 0, CAST(N'0001-01-01T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[PostReactions] ([Id], [PostId], [UserId], [Reaction], [UpdateAt]) VALUES (27, 15, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', 1, CAST(N'0001-01-01T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[PostReactions] ([Id], [PostId], [UserId], [Reaction], [UpdateAt]) VALUES (28, 20, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', 3, CAST(N'0001-01-01T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[PostReactions] ([Id], [PostId], [UserId], [Reaction], [UpdateAt]) VALUES (35, 20, N'5b510644-d571-499c-bc46-db0b0185472e', 2, CAST(N'0001-01-01T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[PostReactions] ([Id], [PostId], [UserId], [Reaction], [UpdateAt]) VALUES (38, 14, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', 0, CAST(N'0001-01-01T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[PostReactions] ([Id], [PostId], [UserId], [Reaction], [UpdateAt]) VALUES (39, 16, N'5b510644-d571-499c-bc46-db0b0185472e', 2, CAST(N'0001-01-01T00:00:00.0000000' AS DateTime2))
SET IDENTITY_INSERT [dbo].[PostReactions] OFF
GO
SET IDENTITY_INSERT [dbo].[PostReportReasons] ON 

INSERT [dbo].[PostReportReasons] ([id], [description], [created_at]) VALUES (1, N'Spam or misleading', CAST(N'2024-11-29T21:48:32.9300000' AS DateTime2))
INSERT [dbo].[PostReportReasons] ([id], [description], [created_at]) VALUES (2, N'Hate speech or abusive content', CAST(N'2024-11-29T21:48:32.9300000' AS DateTime2))
INSERT [dbo].[PostReportReasons] ([id], [description], [created_at]) VALUES (3, N'Violence or harmful content', CAST(N'2024-11-29T21:48:32.9300000' AS DateTime2))
INSERT [dbo].[PostReportReasons] ([id], [description], [created_at]) VALUES (4, N'Nudity or sexual content', CAST(N'2024-11-29T21:48:32.9300000' AS DateTime2))
INSERT [dbo].[PostReportReasons] ([id], [description], [created_at]) VALUES (5, N'False information', CAST(N'2024-11-29T21:48:32.9300000' AS DateTime2))
INSERT [dbo].[PostReportReasons] ([id], [description], [created_at]) VALUES (6, N'Intellectual property violation', CAST(N'2024-11-29T21:48:32.9300000' AS DateTime2))
INSERT [dbo].[PostReportReasons] ([id], [description], [created_at]) VALUES (7, N'Promotes self-harm', CAST(N'2024-11-29T21:48:32.9300000' AS DateTime2))
SET IDENTITY_INSERT [dbo].[PostReportReasons] OFF
GO
SET IDENTITY_INSERT [dbo].[Posts] ON 

INSERT [dbo].[Posts] ([Id], [Content], [CreatedAt], [UpdatedAt], [AuthorId], [PostType], [GroupId], [IsAnonymous], [Visibility], [Feeling]) VALUES (8, N'post id 23', CAST(N'2024-10-12T05:56:10.8699733' AS DateTime2), NULL, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'Normal', NULL, NULL, 0, NULL)
INSERT [dbo].[Posts] ([Id], [Content], [CreatedAt], [UpdatedAt], [AuthorId], [PostType], [GroupId], [IsAnonymous], [Visibility], [Feeling]) VALUES (10, N'post id 23', CAST(N'2024-10-18T09:24:19.8629345' AS DateTime2), NULL, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'Normal', NULL, NULL, 0, NULL)
INSERT [dbo].[Posts] ([Id], [Content], [CreatedAt], [UpdatedAt], [AuthorId], [PostType], [GroupId], [IsAnonymous], [Visibility], [Feeling]) VALUES (11, N'post id 23', CAST(N'2024-10-19T06:49:54.1322704' AS DateTime2), NULL, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'Normal', NULL, NULL, 0, NULL)
INSERT [dbo].[Posts] ([Id], [Content], [CreatedAt], [UpdatedAt], [AuthorId], [PostType], [GroupId], [IsAnonymous], [Visibility], [Feeling]) VALUES (12, N'post id 23', CAST(N'2024-10-21T03:32:04.3592565' AS DateTime2), CAST(N'2024-10-25T07:56:41.1126612' AS DateTime2), N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'Normal', NULL, NULL, 1, N'Excited')
INSERT [dbo].[Posts] ([Id], [Content], [CreatedAt], [UpdatedAt], [AuthorId], [PostType], [GroupId], [IsAnonymous], [Visibility], [Feeling]) VALUES (13, N'post id 23', CAST(N'2024-10-21T03:33:29.0259527' AS DateTime2), CAST(N'2024-10-25T07:48:17.8790351' AS DateTime2), N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'Normal', NULL, NULL, 1, N'Sad')
INSERT [dbo].[Posts] ([Id], [Content], [CreatedAt], [UpdatedAt], [AuthorId], [PostType], [GroupId], [IsAnonymous], [Visibility], [Feeling]) VALUES (14, N'post id 23', CAST(N'2024-10-21T06:11:09.7167585' AS DateTime2), NULL, N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'Normal', NULL, NULL, 0, NULL)
INSERT [dbo].[Posts] ([Id], [Content], [CreatedAt], [UpdatedAt], [AuthorId], [PostType], [GroupId], [IsAnonymous], [Visibility], [Feeling]) VALUES (15, N'post id 23', CAST(N'2024-10-23T02:56:57.2576619' AS DateTime2), CAST(N'2024-10-25T07:54:44.2588128' AS DateTime2), N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'Normal', NULL, NULL, 0, N'Happy')
INSERT [dbo].[Posts] ([Id], [Content], [CreatedAt], [UpdatedAt], [AuthorId], [PostType], [GroupId], [IsAnonymous], [Visibility], [Feeling]) VALUES (16, N'post id 24', CAST(N'2024-10-23T03:10:55.0657632' AS DateTime2), CAST(N'2024-11-21T13:11:15.9175604' AS DateTime2), N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'Normal', NULL, NULL, 1, N'Angry')
INSERT [dbo].[Posts] ([Id], [Content], [CreatedAt], [UpdatedAt], [AuthorId], [PostType], [GroupId], [IsAnonymous], [Visibility], [Feeling]) VALUES (20, N'nak ve than', CAST(N'2024-11-15T08:39:35.7830108' AS DateTime2), CAST(N'2024-11-21T12:26:07.3967437' AS DateTime2), N'956197f1-53be-4ec6-9caf-a35a8ba70c75', N'Normal', NULL, NULL, 1, N'Excited')
SET IDENTITY_INSERT [dbo].[Posts] OFF
GO
INSERT [dbo].[PostSaves] ([post_id], [user_id], [create_at]) VALUES (16, N'5b510644-d571-499c-bc46-db0b0185472e', CAST(N'2024-12-02T10:15:48.5592019' AS DateTime2))
INSERT [dbo].[PostSaves] ([post_id], [user_id], [create_at]) VALUES (20, N'5b510644-d571-499c-bc46-db0b0185472e', CAST(N'2024-12-02T10:08:26.2880365' AS DateTime2))
GO
SET IDENTITY_INSERT [dbo].[PostTags] ON 

INSERT [dbo].[PostTags] ([Id], [PostId], [UserId]) VALUES (2, 8, N'93e8543a-971f-4a6c-b769-f5d79844963c')
INSERT [dbo].[PostTags] ([Id], [PostId], [UserId]) VALUES (3, 8, N'5b510644-d571-499c-bc46-db0b0185472e')
INSERT [dbo].[PostTags] ([Id], [PostId], [UserId]) VALUES (8, 13, N'93e8543a-971f-4a6c-b769-f5d79844963c')
INSERT [dbo].[PostTags] ([Id], [PostId], [UserId]) VALUES (9, 13, N'1915bf75-b54e-43b1-abe5-72130c765ac3')
INSERT [dbo].[PostTags] ([Id], [PostId], [UserId]) VALUES (16, 12, N'1915bf75-b54e-43b1-abe5-72130c765ac3')
INSERT [dbo].[PostTags] ([Id], [PostId], [UserId]) VALUES (17, 12, N'5b510644-d571-499c-bc46-db0b0185472e')
INSERT [dbo].[PostTags] ([Id], [PostId], [UserId]) VALUES (87, 20, N'93e8543a-971f-4a6c-b769-f5d79844963c')
INSERT [dbo].[PostTags] ([Id], [PostId], [UserId]) VALUES (88, 20, N'1915bf75-b54e-43b1-abe5-72130c765ac3')
INSERT [dbo].[PostTags] ([Id], [PostId], [UserId]) VALUES (89, 16, N'93e8543a-971f-4a6c-b769-f5d79844963c')
INSERT [dbo].[PostTags] ([Id], [PostId], [UserId]) VALUES (90, 16, N'5b510644-d571-499c-bc46-db0b0185472e')
SET IDENTITY_INSERT [dbo].[PostTags] OFF
GO
INSERT [dbo].[RefreshTokens] ([Id], [Token], [ExpiryDate], [UserId]) VALUES (N'58f8159d-186f-4434-2f3c-08dcdf75b7e5', N'l1Jy+QHOE9fH07yzIs4vpmWkQeVLMaC8j7V64OrX+bE=', CAST(N'2024-09-28T11:31:26.9056610' AS DateTime2), N'956197f1-53be-4ec6-9caf-a35a8ba70c75')
INSERT [dbo].[RefreshTokens] ([Id], [Token], [ExpiryDate], [UserId]) VALUES (N'b8041c98-ac01-4d5e-2f3d-08dcdf75b7e5', N'7vpfmCt9q0a5GQ+Dk+47/pFgS9Ua2+961zFvxNLhRTE=', CAST(N'2024-09-28T11:37:02.9098212' AS DateTime2), N'956197f1-53be-4ec6-9caf-a35a8ba70c75')
INSERT [dbo].[RefreshTokens] ([Id], [Token], [ExpiryDate], [UserId]) VALUES (N'2aac923e-c47a-455f-9584-08dcdf860ac8', N'yB9CiTQ2FjNbmg5Y0tS16ExpaG6OjIw4uz4MKwPFHzk=', CAST(N'2024-09-28T13:28:17.9012412' AS DateTime2), N'9f9ab6c5-21b9-47ed-8d07-f6ed0c45b14d')
INSERT [dbo].[RefreshTokens] ([Id], [Token], [ExpiryDate], [UserId]) VALUES (N'4ec14e5c-9721-4b39-9585-08dcdf860ac8', N'c0fN1MWFA2LbGRKBsqBlJQYt/lN1/Yfw98tIzn1jPRE=', CAST(N'2024-09-28T13:31:41.4124548' AS DateTime2), N'9f9ab6c5-21b9-47ed-8d07-f6ed0c45b14d')
INSERT [dbo].[RefreshTokens] ([Id], [Token], [ExpiryDate], [UserId]) VALUES (N'35c52904-b0fe-49b4-1776-08dcdfcff2e5', N'mfasrht2GAncy167cdetJnjNFB5gZL7jT69d7e4jbfY=', CAST(N'2024-09-28T22:17:20.5763675' AS DateTime2), N'9f9ab6c5-21b9-47ed-8d07-f6ed0c45b14d')
INSERT [dbo].[RefreshTokens] ([Id], [Token], [ExpiryDate], [UserId]) VALUES (N'75eaa57f-560e-43b9-b132-08dce37458ed', N'wLwE9T2PZzU4Sc3vjRLmrKawd5O8XDsDJ15g6Gno3G4=', CAST(N'2024-10-03T13:31:42.7123559' AS DateTime2), N'5b510644-d571-499c-bc46-db0b0185472e')
INSERT [dbo].[RefreshTokens] ([Id], [Token], [ExpiryDate], [UserId]) VALUES (N'b8cb92eb-40bb-4477-b133-08dce37458ed', N'9JUtDdvJ31hxI+kBnajOjoYFfrivHu3t1hwo5OlFCzw=', CAST(N'2024-10-03T13:37:25.2151848' AS DateTime2), N'93e8543a-971f-4a6c-b769-f5d79844963c')
INSERT [dbo].[RefreshTokens] ([Id], [Token], [ExpiryDate], [UserId]) VALUES (N'49d87f2b-cc90-4ebc-4e35-08dce4466f98', N'tg3DP//TJGcg9USrSJe722xZcmkb4s6xBmq3SA+p87M=', CAST(N'2024-10-04T14:35:35.0758725' AS DateTime2), N'1915bf75-b54e-43b1-abe5-72130c765ac3')
INSERT [dbo].[RefreshTokens] ([Id], [Token], [ExpiryDate], [UserId]) VALUES (N'ad2e4dfb-b545-487c-b96e-08dce5eb9923', N'OLUvrevfSLGhafQGP+emZflxCpsukNqQjCsB+sRGyuw=', CAST(N'2024-10-06T16:50:22.8756157' AS DateTime2), N'956197f1-53be-4ec6-9caf-a35a8ba70c75')
INSERT [dbo].[RefreshTokens] ([Id], [Token], [ExpiryDate], [UserId]) VALUES (N'db46de75-4bcd-47ac-b96f-08dce5eb9923', N'XpE+tdFSDORpllRb9Nox4i1N7gUJ42W4J1Od3nax168=', CAST(N'2024-10-06T16:50:43.6424382' AS DateTime2), N'956197f1-53be-4ec6-9caf-a35a8ba70c75')
INSERT [dbo].[RefreshTokens] ([Id], [Token], [ExpiryDate], [UserId]) VALUES (N'ac7ec140-ab6f-4b0e-b970-08dce5eb9923', N'0nMfOaI68i/tmNrVsbK6ppsb5AJ6Y9VwO0n/MHVHKaQ=', CAST(N'2024-10-06T16:59:26.0788285' AS DateTime2), N'956197f1-53be-4ec6-9caf-a35a8ba70c75')
INSERT [dbo].[RefreshTokens] ([Id], [Token], [ExpiryDate], [UserId]) VALUES (N'e9c88601-0cc1-4167-b971-08dce5eb9923', N'IHspgn0HU9MKcvI/Nq4EXlMdaJWsnNcxAHiWSBVfH9A=', CAST(N'2024-10-06T16:59:57.1584944' AS DateTime2), N'956197f1-53be-4ec6-9caf-a35a8ba70c75')
INSERT [dbo].[RefreshTokens] ([Id], [Token], [ExpiryDate], [UserId]) VALUES (N'ea33e6ae-5588-46d6-8373-08dce695943a', N'VjKWv3vD31rRJTM6PaMPw6ZihLch4Crg2kcAq2rWkTM=', CAST(N'2024-10-07T13:07:09.0961727' AS DateTime2), N'956197f1-53be-4ec6-9caf-a35a8ba70c75')
INSERT [dbo].[RefreshTokens] ([Id], [Token], [ExpiryDate], [UserId]) VALUES (N'd4b13df9-70d8-47ee-8374-08dce695943a', N'XcK7nuq82ux31rmyApR2v3mFGA7f1sQkAL9WnTqhdYc=', CAST(N'2024-10-07T13:07:46.1048349' AS DateTime2), N'956197f1-53be-4ec6-9caf-a35a8ba70c75')
INSERT [dbo].[RefreshTokens] ([Id], [Token], [ExpiryDate], [UserId]) VALUES (N'3ee0517c-927c-4afa-8375-08dce695943a', N'u7QLbSE1RPGGAFkaij6bSYh73YRG0THpWzdrsaTt8zk=', CAST(N'2024-10-07T13:09:53.1163093' AS DateTime2), N'956197f1-53be-4ec6-9caf-a35a8ba70c75')
INSERT [dbo].[RefreshTokens] ([Id], [Token], [ExpiryDate], [UserId]) VALUES (N'890f2c02-8352-4a4f-8376-08dce695943a', N'g5qlom//MPNiEt+sqevt7mSdAsbOPigThwiwp5fGLKE=', CAST(N'2024-10-07T13:10:24.3786559' AS DateTime2), N'956197f1-53be-4ec6-9caf-a35a8ba70c75')
INSERT [dbo].[RefreshTokens] ([Id], [Token], [ExpiryDate], [UserId]) VALUES (N'4a747298-2885-4fbd-2d30-08dce69d7bcd', N'v0eaibWq9y7cP2pd1OYT1wQljlCVfO6RTMyBwfVpelA=', CAST(N'2024-10-07T14:03:44.0872388' AS DateTime2), N'956197f1-53be-4ec6-9caf-a35a8ba70c75')
INSERT [dbo].[RefreshTokens] ([Id], [Token], [ExpiryDate], [UserId]) VALUES (N'fd424c00-68d3-408d-5ccb-08dcfb206eb3', N'F0rugANgWj5IwdsTQiuL5fia1zu2CWONXL8jKwFldbE=', CAST(N'2024-11-02T16:31:29.4431356' AS DateTime2), N'5b510644-d571-499c-bc46-db0b0185472e')
INSERT [dbo].[RefreshTokens] ([Id], [Token], [ExpiryDate], [UserId]) VALUES (N'05c8d6f0-ef3c-4c07-7397-08dcfbe21bfb', N'imdlNVdw2dXbMINVsYDwuPgcjb7Ed6ZkpUR68OA3EC0=', CAST(N'2024-11-03T15:37:53.0144874' AS DateTime2), N'5b510644-d571-499c-bc46-db0b0185472e')
INSERT [dbo].[RefreshTokens] ([Id], [Token], [ExpiryDate], [UserId]) VALUES (N'609f857b-5d8b-49b0-7398-08dcfbe21bfb', N'da/QNv2gom1+8VHNt/S77PT4PfZXfWr+38B6AYfF0zU=', CAST(N'2024-11-03T16:01:30.7875768' AS DateTime2), N'5b510644-d571-499c-bc46-db0b0185472e')
INSERT [dbo].[RefreshTokens] ([Id], [Token], [ExpiryDate], [UserId]) VALUES (N'9d77dc95-09ba-4606-a541-08dd09303dfa', N'3Ip5oKC64Zs8br9zyYETLvyRRQD6R8sokf2kprRsjTc=', CAST(N'2024-11-20T13:59:55.9266175' AS DateTime2), N'5b510644-d571-499c-bc46-db0b0185472e')
INSERT [dbo].[RefreshTokens] ([Id], [Token], [ExpiryDate], [UserId]) VALUES (N'e9d9f2b7-3f0d-40f1-f17d-08dd09669845', N'RKC18Q+FoeKa9siYYov8o/aC57nb5GDLiA15REUKlgI=', CAST(N'2024-11-20T20:29:00.2291580' AS DateTime2), N'5b510644-d571-499c-bc46-db0b0185472e')
INSERT [dbo].[RefreshTokens] ([Id], [Token], [ExpiryDate], [UserId]) VALUES (N'a48e5afe-6fa4-49b2-73b3-08dd09d3339b', N'qab8QXaOn2MYbJhpKMIcP480Jvf+ugzHlu9AV3bKcDQ=', CAST(N'2024-11-21T09:26:26.4857714' AS DateTime2), N'956197f1-53be-4ec6-9caf-a35a8ba70c75')
INSERT [dbo].[RefreshTokens] ([Id], [Token], [ExpiryDate], [UserId]) VALUES (N'72a0521f-a1c6-4fb0-5284-08dd0ab5cf04', N'LG2l6NDIyO9KkSG/ITluVrlPZlQkW0TYnfvISsUbomo=', CAST(N'2024-11-22T12:28:33.4812506' AS DateTime2), N'925cec0a-0c33-4d8a-b140-1380d37e821d')
INSERT [dbo].[RefreshTokens] ([Id], [Token], [ExpiryDate], [UserId]) VALUES (N'99794abb-ecf6-40b3-5ee3-08dd0b8dcb07', N'A36zoXJriGTdXNZPM5Pza8FiHclNy7oFr5RraxWEfdA=', CAST(N'2024-11-23T14:14:38.0831807' AS DateTime2), N'5b510644-d571-499c-bc46-db0b0185472e')
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_AppGroups_CreatedById]    Script Date: 12/2/2024 11:13:41 AM ******/
CREATE NONCLUSTERED INDEX [IX_AppGroups_CreatedById] ON [dbo].[AppGroups]
(
	[CreatedById] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_AspNetRoleClaims_RoleId]    Script Date: 12/2/2024 11:13:41 AM ******/
CREATE NONCLUSTERED INDEX [IX_AspNetRoleClaims_RoleId] ON [dbo].[AspNetRoleClaims]
(
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [RoleNameIndex]    Script Date: 12/2/2024 11:13:41 AM ******/
CREATE UNIQUE NONCLUSTERED INDEX [RoleNameIndex] ON [dbo].[AspNetRoles]
(
	[NormalizedName] ASC
)
WHERE ([NormalizedName] IS NOT NULL)
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_AspNetUserClaims_UserId]    Script Date: 12/2/2024 11:13:41 AM ******/
CREATE NONCLUSTERED INDEX [IX_AspNetUserClaims_UserId] ON [dbo].[AspNetUserClaims]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_AspNetUserLogins_UserId]    Script Date: 12/2/2024 11:13:41 AM ******/
CREATE NONCLUSTERED INDEX [IX_AspNetUserLogins_UserId] ON [dbo].[AspNetUserLogins]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_AspNetUserRoles_RoleId]    Script Date: 12/2/2024 11:13:41 AM ******/
CREATE NONCLUSTERED INDEX [IX_AspNetUserRoles_RoleId] ON [dbo].[AspNetUserRoles]
(
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [EmailIndex]    Script Date: 12/2/2024 11:13:41 AM ******/
CREATE NONCLUSTERED INDEX [EmailIndex] ON [dbo].[AspNetUsers]
(
	[NormalizedEmail] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UserNameIndex]    Script Date: 12/2/2024 11:13:41 AM ******/
CREATE UNIQUE NONCLUSTERED INDEX [UserNameIndex] ON [dbo].[AspNetUsers]
(
	[NormalizedUserName] ASC
)
WHERE ([NormalizedUserName] IS NOT NULL)
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_BlockedUsers_blocked_user_idd]    Script Date: 12/2/2024 11:13:41 AM ******/
CREATE NONCLUSTERED INDEX [IX_BlockedUsers_blocked_user_idd] ON [dbo].[BlockedUsers]
(
	[blocked_user_idd] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_ChatRoomMembers_ChatRoomId_UserId]    Script Date: 12/2/2024 11:13:41 AM ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_ChatRoomMembers_ChatRoomId_UserId] ON [dbo].[ChatRoomMembers]
(
	[ChatRoomId] ASC,
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_ChatRoomMembers_UserId]    Script Date: 12/2/2024 11:13:41 AM ******/
CREATE NONCLUSTERED INDEX [IX_ChatRoomMembers_UserId] ON [dbo].[ChatRoomMembers]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_CommentReactions_CommentId]    Script Date: 12/2/2024 11:13:41 AM ******/
CREATE NONCLUSTERED INDEX [IX_CommentReactions_CommentId] ON [dbo].[CommentReactions]
(
	[CommentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_CommentReactions_UserId]    Script Date: 12/2/2024 11:13:41 AM ******/
CREATE NONCLUSTERED INDEX [IX_CommentReactions_UserId] ON [dbo].[CommentReactions]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_Comments_AuthorId]    Script Date: 12/2/2024 11:13:41 AM ******/
CREATE NONCLUSTERED INDEX [IX_Comments_AuthorId] ON [dbo].[Comments]
(
	[AuthorId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Comments_ParentCommentId]    Script Date: 12/2/2024 11:13:41 AM ******/
CREATE NONCLUSTERED INDEX [IX_Comments_ParentCommentId] ON [dbo].[Comments]
(
	[ParentCommentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Comments_PostId]    Script Date: 12/2/2024 11:13:41 AM ******/
CREATE NONCLUSTERED INDEX [IX_Comments_PostId] ON [dbo].[Comments]
(
	[PostId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_Comments_ReplyToUserId]    Script Date: 12/2/2024 11:13:41 AM ******/
CREATE NONCLUSTERED INDEX [IX_Comments_ReplyToUserId] ON [dbo].[Comments]
(
	[ReplyToUserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_FriendRequests_ReceiverId]    Script Date: 12/2/2024 11:13:41 AM ******/
CREATE NONCLUSTERED INDEX [IX_FriendRequests_ReceiverId] ON [dbo].[FriendRequests]
(
	[ReceiverId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_FriendRequests_RequesterId]    Script Date: 12/2/2024 11:13:41 AM ******/
CREATE NONCLUSTERED INDEX [IX_FriendRequests_RequesterId] ON [dbo].[FriendRequests]
(
	[RequesterId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_FriendShips_User1Id]    Script Date: 12/2/2024 11:13:41 AM ******/
CREATE NONCLUSTERED INDEX [IX_FriendShips_User1Id] ON [dbo].[FriendShips]
(
	[User1Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_FriendShips_User2Id]    Script Date: 12/2/2024 11:13:41 AM ******/
CREATE NONCLUSTERED INDEX [IX_FriendShips_User2Id] ON [dbo].[FriendShips]
(
	[User2Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_GroupInvitations_GroupId]    Script Date: 12/2/2024 11:13:41 AM ******/
CREATE NONCLUSTERED INDEX [IX_GroupInvitations_GroupId] ON [dbo].[GroupInvitations]
(
	[GroupId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_GroupInvitations_ReferrerId]    Script Date: 12/2/2024 11:13:41 AM ******/
CREATE NONCLUSTERED INDEX [IX_GroupInvitations_ReferrerId] ON [dbo].[GroupInvitations]
(
	[ReferrerId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_GroupInvitations_TargetUserId]    Script Date: 12/2/2024 11:13:41 AM ******/
CREATE NONCLUSTERED INDEX [IX_GroupInvitations_TargetUserId] ON [dbo].[GroupInvitations]
(
	[TargetUserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_GroupJoinRequests_GroupId]    Script Date: 12/2/2024 11:13:41 AM ******/
CREATE NONCLUSTERED INDEX [IX_GroupJoinRequests_GroupId] ON [dbo].[GroupJoinRequests]
(
	[GroupId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_GroupJoinRequests_TargetUserId]    Script Date: 12/2/2024 11:13:41 AM ******/
CREATE NONCLUSTERED INDEX [IX_GroupJoinRequests_TargetUserId] ON [dbo].[GroupJoinRequests]
(
	[TargetUserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_GroupMembers_GroupId]    Script Date: 12/2/2024 11:13:41 AM ******/
CREATE NONCLUSTERED INDEX [IX_GroupMembers_GroupId] ON [dbo].[GroupMembers]
(
	[GroupId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_GroupMembers_UserId]    Script Date: 12/2/2024 11:13:41 AM ******/
CREATE NONCLUSTERED INDEX [IX_GroupMembers_UserId] ON [dbo].[GroupMembers]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_GroupSettings_GroupId]    Script Date: 12/2/2024 11:13:41 AM ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_GroupSettings_GroupId] ON [dbo].[GroupSettings]
(
	[GroupId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Media_MessageId]    Script Date: 12/2/2024 11:13:41 AM ******/
CREATE NONCLUSTERED INDEX [IX_Media_MessageId] ON [dbo].[Media]
(
	[MessageId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Media_PostId]    Script Date: 12/2/2024 11:13:41 AM ******/
CREATE NONCLUSTERED INDEX [IX_Media_PostId] ON [dbo].[Media]
(
	[PostId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_MessageReactions_MessageId]    Script Date: 12/2/2024 11:13:41 AM ******/
CREATE NONCLUSTERED INDEX [IX_MessageReactions_MessageId] ON [dbo].[MessageReactions]
(
	[MessageId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_MessageReactions_UserId]    Script Date: 12/2/2024 11:13:41 AM ******/
CREATE NONCLUSTERED INDEX [IX_MessageReactions_UserId] ON [dbo].[MessageReactions]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Messages_ChatRoomId]    Script Date: 12/2/2024 11:13:41 AM ******/
CREATE NONCLUSTERED INDEX [IX_Messages_ChatRoomId] ON [dbo].[Messages]
(
	[ChatRoomId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Messages_ReplyToId]    Script Date: 12/2/2024 11:13:41 AM ******/
CREATE NONCLUSTERED INDEX [IX_Messages_ReplyToId] ON [dbo].[Messages]
(
	[ReplyToId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_Messages_SenderId]    Script Date: 12/2/2024 11:13:41 AM ******/
CREATE NONCLUSTERED INDEX [IX_Messages_SenderId] ON [dbo].[Messages]
(
	[SenderId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_MessageVisibilities_MessageId]    Script Date: 12/2/2024 11:13:41 AM ******/
CREATE NONCLUSTERED INDEX [IX_MessageVisibilities_MessageId] ON [dbo].[MessageVisibilities]
(
	[MessageId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_MessageVisibilities_UserId]    Script Date: 12/2/2024 11:13:41 AM ******/
CREATE NONCLUSTERED INDEX [IX_MessageVisibilities_UserId] ON [dbo].[MessageVisibilities]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_notification_triggered_by_user_id]    Script Date: 12/2/2024 11:13:41 AM ******/
CREATE NONCLUSTERED INDEX [IX_notification_triggered_by_user_id] ON [dbo].[notification]
(
	[triggered_by_user_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_notification_recipient_UserId]    Script Date: 12/2/2024 11:13:41 AM ******/
CREATE NONCLUSTERED INDEX [IX_notification_recipient_UserId] ON [dbo].[notification_recipient]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_PostReactions_PostId]    Script Date: 12/2/2024 11:13:41 AM ******/
CREATE NONCLUSTERED INDEX [IX_PostReactions_PostId] ON [dbo].[PostReactions]
(
	[PostId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_PostReactions_UserId]    Script Date: 12/2/2024 11:13:41 AM ******/
CREATE NONCLUSTERED INDEX [IX_PostReactions_UserId] ON [dbo].[PostReactions]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_PostReports_post_id]    Script Date: 12/2/2024 11:13:41 AM ******/
CREATE NONCLUSTERED INDEX [IX_PostReports_post_id] ON [dbo].[PostReports]
(
	[post_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_PostReports_post_report_reason_id]    Script Date: 12/2/2024 11:13:41 AM ******/
CREATE NONCLUSTERED INDEX [IX_PostReports_post_report_reason_id] ON [dbo].[PostReports]
(
	[post_report_reason_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_PostReports_ReportedByUserId]    Script Date: 12/2/2024 11:13:41 AM ******/
CREATE NONCLUSTERED INDEX [IX_PostReports_ReportedByUserId] ON [dbo].[PostReports]
(
	[ReportedByUserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_Posts_AuthorId]    Script Date: 12/2/2024 11:13:41 AM ******/
CREATE NONCLUSTERED INDEX [IX_Posts_AuthorId] ON [dbo].[Posts]
(
	[AuthorId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Posts_GroupId]    Script Date: 12/2/2024 11:13:41 AM ******/
CREATE NONCLUSTERED INDEX [IX_Posts_GroupId] ON [dbo].[Posts]
(
	[GroupId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_PostSaves_user_id]    Script Date: 12/2/2024 11:13:41 AM ******/
CREATE NONCLUSTERED INDEX [IX_PostSaves_user_id] ON [dbo].[PostSaves]
(
	[user_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_PostTags_PostId]    Script Date: 12/2/2024 11:13:41 AM ******/
CREATE NONCLUSTERED INDEX [IX_PostTags_PostId] ON [dbo].[PostTags]
(
	[PostId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_PostTags_UserId]    Script Date: 12/2/2024 11:13:41 AM ******/
CREATE NONCLUSTERED INDEX [IX_PostTags_UserId] ON [dbo].[PostTags]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_RefreshTokens_UserId]    Script Date: 12/2/2024 11:13:41 AM ******/
CREATE NONCLUSTERED INDEX [IX_RefreshTokens_UserId] ON [dbo].[RefreshTokens]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[AspNetUsers] ADD  DEFAULT (CONVERT([bit],(0))) FOR [IsOnline]
GO
ALTER TABLE [dbo].[ChatRoomMembers] ADD  DEFAULT ('0001-01-01T00:00:00.0000000') FOR [LastSeen]
GO
ALTER TABLE [dbo].[CommentReactions] ADD  DEFAULT (CONVERT([bit],(0))) FOR [IsLike]
GO
ALTER TABLE [dbo].[CommentReactions] ADD  DEFAULT ('0001-01-01T00:00:00.0000000') FOR [UpdateAt]
GO
ALTER TABLE [dbo].[notification] ADD  DEFAULT (getdate()) FOR [create_at]
GO
ALTER TABLE [dbo].[PostReactions] ADD  DEFAULT ('0001-01-01T00:00:00.0000000') FOR [UpdateAt]
GO
ALTER TABLE [dbo].[AppGroups]  WITH CHECK ADD  CONSTRAINT [FK_AppGroups_AspNetUsers_CreatedById] FOREIGN KEY([CreatedById])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AppGroups] CHECK CONSTRAINT [FK_AppGroups_AspNetUsers_CreatedById]
GO
ALTER TABLE [dbo].[AspNetRoleClaims]  WITH CHECK ADD  CONSTRAINT [FK_AspNetRoleClaims_AspNetRoles_RoleId] FOREIGN KEY([RoleId])
REFERENCES [dbo].[AspNetRoles] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetRoleClaims] CHECK CONSTRAINT [FK_AspNetRoleClaims_AspNetRoles_RoleId]
GO
ALTER TABLE [dbo].[AspNetUserClaims]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserClaims_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserClaims] CHECK CONSTRAINT [FK_AspNetUserClaims_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUserLogins]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserLogins_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserLogins] CHECK CONSTRAINT [FK_AspNetUserLogins_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUserRoles]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserRoles_AspNetRoles_RoleId] FOREIGN KEY([RoleId])
REFERENCES [dbo].[AspNetRoles] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserRoles] CHECK CONSTRAINT [FK_AspNetUserRoles_AspNetRoles_RoleId]
GO
ALTER TABLE [dbo].[AspNetUserRoles]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserRoles_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserRoles] CHECK CONSTRAINT [FK_AspNetUserRoles_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUserTokens]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserTokens_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserTokens] CHECK CONSTRAINT [FK_AspNetUserTokens_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[BlockedUsers]  WITH CHECK ADD  CONSTRAINT [FK_BlockedUsers_AspNetUsers_blocked_user_idd] FOREIGN KEY([blocked_user_idd])
REFERENCES [dbo].[AspNetUsers] ([Id])
GO
ALTER TABLE [dbo].[BlockedUsers] CHECK CONSTRAINT [FK_BlockedUsers_AspNetUsers_blocked_user_idd]
GO
ALTER TABLE [dbo].[BlockedUsers]  WITH CHECK ADD  CONSTRAINT [FK_BlockedUsers_AspNetUsers_user_id] FOREIGN KEY([user_id])
REFERENCES [dbo].[AspNetUsers] ([Id])
GO
ALTER TABLE [dbo].[BlockedUsers] CHECK CONSTRAINT [FK_BlockedUsers_AspNetUsers_user_id]
GO
ALTER TABLE [dbo].[ChatRoomMembers]  WITH CHECK ADD  CONSTRAINT [FK_ChatRoomMembers_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[ChatRoomMembers] CHECK CONSTRAINT [FK_ChatRoomMembers_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[ChatRoomMembers]  WITH CHECK ADD  CONSTRAINT [FK_ChatRoomMembers_ChatRooms_ChatRoomId] FOREIGN KEY([ChatRoomId])
REFERENCES [dbo].[ChatRooms] ([ChatRoomId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[ChatRoomMembers] CHECK CONSTRAINT [FK_ChatRoomMembers_ChatRooms_ChatRoomId]
GO
ALTER TABLE [dbo].[CommentReactions]  WITH CHECK ADD  CONSTRAINT [FK_CommentReactions_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
GO
ALTER TABLE [dbo].[CommentReactions] CHECK CONSTRAINT [FK_CommentReactions_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[CommentReactions]  WITH CHECK ADD  CONSTRAINT [FK_CommentReactions_Comments_CommentId] FOREIGN KEY([CommentId])
REFERENCES [dbo].[Comments] ([CommentId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[CommentReactions] CHECK CONSTRAINT [FK_CommentReactions_Comments_CommentId]
GO
ALTER TABLE [dbo].[Comments]  WITH CHECK ADD  CONSTRAINT [FK_Comments_AspNetUsers_AuthorId] FOREIGN KEY([AuthorId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Comments] CHECK CONSTRAINT [FK_Comments_AspNetUsers_AuthorId]
GO
ALTER TABLE [dbo].[Comments]  WITH CHECK ADD  CONSTRAINT [FK_Comments_AspNetUsers_ReplyToUserId] FOREIGN KEY([ReplyToUserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
GO
ALTER TABLE [dbo].[Comments] CHECK CONSTRAINT [FK_Comments_AspNetUsers_ReplyToUserId]
GO
ALTER TABLE [dbo].[Comments]  WITH CHECK ADD  CONSTRAINT [FK_Comments_Comments_ParentCommentId] FOREIGN KEY([ParentCommentId])
REFERENCES [dbo].[Comments] ([CommentId])
GO
ALTER TABLE [dbo].[Comments] CHECK CONSTRAINT [FK_Comments_Comments_ParentCommentId]
GO
ALTER TABLE [dbo].[Comments]  WITH CHECK ADD  CONSTRAINT [FK_Comments_Posts_PostId] FOREIGN KEY([PostId])
REFERENCES [dbo].[Posts] ([Id])
GO
ALTER TABLE [dbo].[Comments] CHECK CONSTRAINT [FK_Comments_Posts_PostId]
GO
ALTER TABLE [dbo].[FriendRequests]  WITH CHECK ADD  CONSTRAINT [FK_FriendRequests_AspNetUsers_ReceiverId] FOREIGN KEY([ReceiverId])
REFERENCES [dbo].[AspNetUsers] ([Id])
GO
ALTER TABLE [dbo].[FriendRequests] CHECK CONSTRAINT [FK_FriendRequests_AspNetUsers_ReceiverId]
GO
ALTER TABLE [dbo].[FriendRequests]  WITH CHECK ADD  CONSTRAINT [FK_FriendRequests_AspNetUsers_RequesterId] FOREIGN KEY([RequesterId])
REFERENCES [dbo].[AspNetUsers] ([Id])
GO
ALTER TABLE [dbo].[FriendRequests] CHECK CONSTRAINT [FK_FriendRequests_AspNetUsers_RequesterId]
GO
ALTER TABLE [dbo].[FriendShips]  WITH CHECK ADD  CONSTRAINT [FK_FriendShips_AspNetUsers_User1Id] FOREIGN KEY([User1Id])
REFERENCES [dbo].[AspNetUsers] ([Id])
GO
ALTER TABLE [dbo].[FriendShips] CHECK CONSTRAINT [FK_FriendShips_AspNetUsers_User1Id]
GO
ALTER TABLE [dbo].[FriendShips]  WITH CHECK ADD  CONSTRAINT [FK_FriendShips_AspNetUsers_User2Id] FOREIGN KEY([User2Id])
REFERENCES [dbo].[AspNetUsers] ([Id])
GO
ALTER TABLE [dbo].[FriendShips] CHECK CONSTRAINT [FK_FriendShips_AspNetUsers_User2Id]
GO
ALTER TABLE [dbo].[GroupInvitations]  WITH CHECK ADD  CONSTRAINT [FK_GroupInvitations_AppGroups_GroupId] FOREIGN KEY([GroupId])
REFERENCES [dbo].[AppGroups] ([GroupId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[GroupInvitations] CHECK CONSTRAINT [FK_GroupInvitations_AppGroups_GroupId]
GO
ALTER TABLE [dbo].[GroupInvitations]  WITH CHECK ADD  CONSTRAINT [FK_GroupInvitations_AspNetUsers_ReferrerId] FOREIGN KEY([ReferrerId])
REFERENCES [dbo].[AspNetUsers] ([Id])
GO
ALTER TABLE [dbo].[GroupInvitations] CHECK CONSTRAINT [FK_GroupInvitations_AspNetUsers_ReferrerId]
GO
ALTER TABLE [dbo].[GroupInvitations]  WITH CHECK ADD  CONSTRAINT [FK_GroupInvitations_AspNetUsers_TargetUserId] FOREIGN KEY([TargetUserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
GO
ALTER TABLE [dbo].[GroupInvitations] CHECK CONSTRAINT [FK_GroupInvitations_AspNetUsers_TargetUserId]
GO
ALTER TABLE [dbo].[GroupJoinRequests]  WITH CHECK ADD  CONSTRAINT [FK_GroupJoinRequests_AppGroups_GroupId] FOREIGN KEY([GroupId])
REFERENCES [dbo].[AppGroups] ([GroupId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[GroupJoinRequests] CHECK CONSTRAINT [FK_GroupJoinRequests_AppGroups_GroupId]
GO
ALTER TABLE [dbo].[GroupJoinRequests]  WITH CHECK ADD  CONSTRAINT [FK_GroupJoinRequests_AspNetUsers_TargetUserId] FOREIGN KEY([TargetUserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
GO
ALTER TABLE [dbo].[GroupJoinRequests] CHECK CONSTRAINT [FK_GroupJoinRequests_AspNetUsers_TargetUserId]
GO
ALTER TABLE [dbo].[GroupMembers]  WITH CHECK ADD  CONSTRAINT [FK_GroupMembers_AppGroups_GroupId] FOREIGN KEY([GroupId])
REFERENCES [dbo].[AppGroups] ([GroupId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[GroupMembers] CHECK CONSTRAINT [FK_GroupMembers_AppGroups_GroupId]
GO
ALTER TABLE [dbo].[GroupMembers]  WITH CHECK ADD  CONSTRAINT [FK_GroupMembers_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
GO
ALTER TABLE [dbo].[GroupMembers] CHECK CONSTRAINT [FK_GroupMembers_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[GroupSettings]  WITH CHECK ADD  CONSTRAINT [FK_GroupSettings_AppGroups_GroupId] FOREIGN KEY([GroupId])
REFERENCES [dbo].[AppGroups] ([GroupId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[GroupSettings] CHECK CONSTRAINT [FK_GroupSettings_AppGroups_GroupId]
GO
ALTER TABLE [dbo].[Media]  WITH CHECK ADD  CONSTRAINT [FK_Media_Messages_MessageId] FOREIGN KEY([MessageId])
REFERENCES [dbo].[Messages] ([MessageId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Media] CHECK CONSTRAINT [FK_Media_Messages_MessageId]
GO
ALTER TABLE [dbo].[Media]  WITH CHECK ADD  CONSTRAINT [FK_Media_Posts_PostId] FOREIGN KEY([PostId])
REFERENCES [dbo].[Posts] ([Id])
GO
ALTER TABLE [dbo].[Media] CHECK CONSTRAINT [FK_Media_Posts_PostId]
GO
ALTER TABLE [dbo].[MessageReactions]  WITH CHECK ADD  CONSTRAINT [FK_MessageReactions_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
GO
ALTER TABLE [dbo].[MessageReactions] CHECK CONSTRAINT [FK_MessageReactions_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[MessageReactions]  WITH CHECK ADD  CONSTRAINT [FK_MessageReactions_Messages_MessageId] FOREIGN KEY([MessageId])
REFERENCES [dbo].[Messages] ([MessageId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[MessageReactions] CHECK CONSTRAINT [FK_MessageReactions_Messages_MessageId]
GO
ALTER TABLE [dbo].[Messages]  WITH CHECK ADD  CONSTRAINT [FK_Messages_AspNetUsers_SenderId] FOREIGN KEY([SenderId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Messages] CHECK CONSTRAINT [FK_Messages_AspNetUsers_SenderId]
GO
ALTER TABLE [dbo].[Messages]  WITH CHECK ADD  CONSTRAINT [FK_Messages_ChatRooms_ChatRoomId] FOREIGN KEY([ChatRoomId])
REFERENCES [dbo].[ChatRooms] ([ChatRoomId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Messages] CHECK CONSTRAINT [FK_Messages_ChatRooms_ChatRoomId]
GO
ALTER TABLE [dbo].[Messages]  WITH CHECK ADD  CONSTRAINT [FK_Messages_Messages_ReplyToId] FOREIGN KEY([ReplyToId])
REFERENCES [dbo].[Messages] ([MessageId])
GO
ALTER TABLE [dbo].[Messages] CHECK CONSTRAINT [FK_Messages_Messages_ReplyToId]
GO
ALTER TABLE [dbo].[MessageVisibilities]  WITH CHECK ADD  CONSTRAINT [FK_MessageVisibilities_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
GO
ALTER TABLE [dbo].[MessageVisibilities] CHECK CONSTRAINT [FK_MessageVisibilities_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[MessageVisibilities]  WITH CHECK ADD  CONSTRAINT [FK_MessageVisibilities_Messages_MessageId] FOREIGN KEY([MessageId])
REFERENCES [dbo].[Messages] ([MessageId])
GO
ALTER TABLE [dbo].[MessageVisibilities] CHECK CONSTRAINT [FK_MessageVisibilities_Messages_MessageId]
GO
ALTER TABLE [dbo].[notification]  WITH CHECK ADD  CONSTRAINT [FK_notification_AspNetUsers_triggered_by_user_id] FOREIGN KEY([triggered_by_user_id])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[notification] CHECK CONSTRAINT [FK_notification_AspNetUsers_triggered_by_user_id]
GO
ALTER TABLE [dbo].[notification_recipient]  WITH CHECK ADD  CONSTRAINT [FK_notification_recipient_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
GO
ALTER TABLE [dbo].[notification_recipient] CHECK CONSTRAINT [FK_notification_recipient_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[notification_recipient]  WITH CHECK ADD  CONSTRAINT [FK_notification_recipient_notification_NotificationId] FOREIGN KEY([NotificationId])
REFERENCES [dbo].[notification] ([notification_id])
GO
ALTER TABLE [dbo].[notification_recipient] CHECK CONSTRAINT [FK_notification_recipient_notification_NotificationId]
GO
ALTER TABLE [dbo].[PostReactions]  WITH CHECK ADD  CONSTRAINT [FK_PostReactions_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
GO
ALTER TABLE [dbo].[PostReactions] CHECK CONSTRAINT [FK_PostReactions_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[PostReactions]  WITH CHECK ADD  CONSTRAINT [FK_PostReactions_Posts_PostId] FOREIGN KEY([PostId])
REFERENCES [dbo].[Posts] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[PostReactions] CHECK CONSTRAINT [FK_PostReactions_Posts_PostId]
GO
ALTER TABLE [dbo].[PostReports]  WITH CHECK ADD  CONSTRAINT [FK_PostReports_AspNetUsers_ReportedByUserId] FOREIGN KEY([ReportedByUserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
GO
ALTER TABLE [dbo].[PostReports] CHECK CONSTRAINT [FK_PostReports_AspNetUsers_ReportedByUserId]
GO
ALTER TABLE [dbo].[PostReports]  WITH CHECK ADD  CONSTRAINT [FK_PostReports_PostReportReasons_post_report_reason_id] FOREIGN KEY([post_report_reason_id])
REFERENCES [dbo].[PostReportReasons] ([id])
GO
ALTER TABLE [dbo].[PostReports] CHECK CONSTRAINT [FK_PostReports_PostReportReasons_post_report_reason_id]
GO
ALTER TABLE [dbo].[PostReports]  WITH CHECK ADD  CONSTRAINT [FK_PostReports_Posts_post_id] FOREIGN KEY([post_id])
REFERENCES [dbo].[Posts] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[PostReports] CHECK CONSTRAINT [FK_PostReports_Posts_post_id]
GO
ALTER TABLE [dbo].[Posts]  WITH CHECK ADD  CONSTRAINT [FK_Posts_AppGroups_GroupId] FOREIGN KEY([GroupId])
REFERENCES [dbo].[AppGroups] ([GroupId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Posts] CHECK CONSTRAINT [FK_Posts_AppGroups_GroupId]
GO
ALTER TABLE [dbo].[Posts]  WITH CHECK ADD  CONSTRAINT [FK_Posts_AspNetUsers_AuthorId] FOREIGN KEY([AuthorId])
REFERENCES [dbo].[AspNetUsers] ([Id])
GO
ALTER TABLE [dbo].[Posts] CHECK CONSTRAINT [FK_Posts_AspNetUsers_AuthorId]
GO
ALTER TABLE [dbo].[PostSaves]  WITH CHECK ADD  CONSTRAINT [FK_PostSaves_AspNetUsers_user_id] FOREIGN KEY([user_id])
REFERENCES [dbo].[AspNetUsers] ([Id])
GO
ALTER TABLE [dbo].[PostSaves] CHECK CONSTRAINT [FK_PostSaves_AspNetUsers_user_id]
GO
ALTER TABLE [dbo].[PostSaves]  WITH CHECK ADD  CONSTRAINT [FK_PostSaves_Posts_post_id] FOREIGN KEY([post_id])
REFERENCES [dbo].[Posts] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[PostSaves] CHECK CONSTRAINT [FK_PostSaves_Posts_post_id]
GO
ALTER TABLE [dbo].[PostTags]  WITH CHECK ADD  CONSTRAINT [FK_PostTags_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
GO
ALTER TABLE [dbo].[PostTags] CHECK CONSTRAINT [FK_PostTags_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[PostTags]  WITH CHECK ADD  CONSTRAINT [FK_PostTags_Posts_PostId] FOREIGN KEY([PostId])
REFERENCES [dbo].[Posts] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[PostTags] CHECK CONSTRAINT [FK_PostTags_Posts_PostId]
GO
ALTER TABLE [dbo].[RefreshTokens]  WITH CHECK ADD  CONSTRAINT [FK_RefreshTokens_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[RefreshTokens] CHECK CONSTRAINT [FK_RefreshTokens_AspNetUsers_UserId]
GO
USE [master]
GO
ALTER DATABASE [ConnectifyDbV4] SET  READ_WRITE 
GO
