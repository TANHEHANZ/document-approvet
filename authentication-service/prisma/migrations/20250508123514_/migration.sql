/*
  Warnings:

  - You are about to drop the `Permission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RolePermission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Status` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserRole` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserType` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "auth"."Provider" AS ENUM ('CREDENTIALS', 'GOOGLE', 'CI');

-- CreateEnum
CREATE TYPE "auth"."StatusEnum" AS ENUM ('ACTIVE', 'INACTIVE', 'BLOCKED', 'SUSPENDED', 'DEACTIVATED', 'PENDING_VERIFICATION', 'PASSWORD_EXPIRED', 'LOCKED', 'DELETED', 'EXTERNAL', 'ARCHIVED');

-- DropForeignKey
ALTER TABLE "auth"."Role" DROP CONSTRAINT "Role_statusId_fkey";

-- DropForeignKey
ALTER TABLE "auth"."RolePermission" DROP CONSTRAINT "RolePermission_permissionId_fkey";

-- DropForeignKey
ALTER TABLE "auth"."RolePermission" DROP CONSTRAINT "RolePermission_roleId_fkey";

-- DropForeignKey
ALTER TABLE "auth"."Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropForeignKey
ALTER TABLE "auth"."User" DROP CONSTRAINT "User_statusId_fkey";

-- DropForeignKey
ALTER TABLE "auth"."User" DROP CONSTRAINT "User_userTypeId_fkey";

-- DropForeignKey
ALTER TABLE "auth"."UserRole" DROP CONSTRAINT "UserRole_roleId_fkey";

-- DropForeignKey
ALTER TABLE "auth"."UserRole" DROP CONSTRAINT "UserRole_userId_fkey";

-- DropTable
DROP TABLE "auth"."Permission";

-- DropTable
DROP TABLE "auth"."Role";

-- DropTable
DROP TABLE "auth"."RolePermission";

-- DropTable
DROP TABLE "auth"."Session";

-- DropTable
DROP TABLE "auth"."Status";

-- DropTable
DROP TABLE "auth"."User";

-- DropTable
DROP TABLE "auth"."UserRole";

-- DropTable
DROP TABLE "auth"."UserType";

-- CreateTable
CREATE TABLE "auth"."users" (
    "id" TEXT NOT NULL,
    "lastIp" TEXT,
    "statusId" TEXT,
    "Status" "auth"."StatusEnum" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "roleId" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth"."AuthMethods" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "provider" "auth"."Provider" NOT NULL,
    "password" TEXT,
    "google_id" TEXT,
    "ci_number" TEXT,
    "phone" TEXT,
    "photo" TEXT,
    "email" TEXT,
    "Status" "auth"."StatusEnum" NOT NULL DEFAULT 'DEACTIVATED',
    "extra_data" JSONB,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuthMethods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth"."roles" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth"."permissons" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL,

    CONSTRAINT "permissons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth"."role_permissions" (
    "roleId" TEXT NOT NULL,
    "permissionId" TEXT NOT NULL,

    CONSTRAINT "role_permissions_pkey" PRIMARY KEY ("roleId","permissionId")
);

-- CreateTable
CREATE TABLE "auth"."oauth_clients" (
    "id" TEXT NOT NULL,
    "client_id" TEXT,
    "client_secret" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "redirect_uris" TEXT[],
    "webhook_url" TEXT,
    "domain" TEXT,
    "Status" "auth"."StatusEnum" NOT NULL DEFAULT 'DEACTIVATED',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "oauth_clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth"."Scope" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "Status" "auth"."StatusEnum" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "Scope_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth"."oauth_client_scope_permissions" (
    "clientId" TEXT NOT NULL,
    "scopeId" TEXT NOT NULL,

    CONSTRAINT "oauth_client_scope_permissions_pkey" PRIMARY KEY ("clientId","scopeId")
);

-- CreateTable
CREATE TABLE "auth"."ScopePermission" (
    "id" TEXT NOT NULL,
    "scopeId" TEXT NOT NULL,
    "permissionId" TEXT NOT NULL,

    CONSTRAINT "ScopePermission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth"."Nav" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "color" TEXT,
    "Status" "auth"."StatusEnum" NOT NULL DEFAULT 'ACTIVE',
    "parentId" TEXT,

    CONSTRAINT "Nav_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth"."NavRole" (
    "id" TEXT NOT NULL,
    "navId" TEXT NOT NULL,
    "Status" "auth"."StatusEnum" NOT NULL DEFAULT 'ACTIVE',
    "roleId" TEXT NOT NULL,

    CONSTRAINT "NavRole_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "users_Status_idx" ON "auth"."users"("Status");

-- CreateIndex
CREATE INDEX "users_lastIp_idx" ON "auth"."users"("lastIp");

-- CreateIndex
CREATE INDEX "users_roleId_idx" ON "auth"."users"("roleId");

-- CreateIndex
CREATE UNIQUE INDEX "AuthMethods_userId_key" ON "auth"."AuthMethods"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "AuthMethods_google_id_key" ON "auth"."AuthMethods"("google_id");

-- CreateIndex
CREATE UNIQUE INDEX "AuthMethods_ci_number_key" ON "auth"."AuthMethods"("ci_number");

-- CreateIndex
CREATE INDEX "AuthMethods_email_idx" ON "auth"."AuthMethods"("email");

-- CreateIndex
CREATE INDEX "AuthMethods_provider_idx" ON "auth"."AuthMethods"("provider");

-- CreateIndex
CREATE INDEX "AuthMethods_google_id_idx" ON "auth"."AuthMethods"("google_id");

-- CreateIndex
CREATE INDEX "AuthMethods_ci_number_idx" ON "auth"."AuthMethods"("ci_number");

-- CreateIndex
CREATE INDEX "AuthMethods_email_provider_idx" ON "auth"."AuthMethods"("email", "provider");

-- CreateIndex
CREATE UNIQUE INDEX "AuthMethods_userId_provider_key" ON "auth"."AuthMethods"("userId", "provider");

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_key" ON "auth"."roles"("name");

-- CreateIndex
CREATE INDEX "idx_roles_name" ON "auth"."roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "permissons_name_key" ON "auth"."permissons"("name");

-- CreateIndex
CREATE INDEX "idx_permissons_name" ON "auth"."permissons"("name");

-- CreateIndex
CREATE UNIQUE INDEX "oauth_clients_client_id_key" ON "auth"."oauth_clients"("client_id");

-- CreateIndex
CREATE UNIQUE INDEX "Scope_name_key" ON "auth"."Scope"("name");

-- AddForeignKey
ALTER TABLE "auth"."users" ADD CONSTRAINT "users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "auth"."roles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth"."AuthMethods" ADD CONSTRAINT "AuthMethods_userId_fkey" FOREIGN KEY ("userId") REFERENCES "auth"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth"."role_permissions" ADD CONSTRAINT "role_permissions_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "auth"."roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth"."role_permissions" ADD CONSTRAINT "role_permissions_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "auth"."permissons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth"."oauth_client_scope_permissions" ADD CONSTRAINT "oauth_client_scope_permissions_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "auth"."oauth_clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth"."oauth_client_scope_permissions" ADD CONSTRAINT "oauth_client_scope_permissions_scopeId_fkey" FOREIGN KEY ("scopeId") REFERENCES "auth"."Scope"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth"."ScopePermission" ADD CONSTRAINT "ScopePermission_scopeId_fkey" FOREIGN KEY ("scopeId") REFERENCES "auth"."Scope"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth"."ScopePermission" ADD CONSTRAINT "ScopePermission_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "auth"."permissons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth"."Nav" ADD CONSTRAINT "Nav_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "auth"."Nav"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth"."NavRole" ADD CONSTRAINT "NavRole_navId_fkey" FOREIGN KEY ("navId") REFERENCES "auth"."Nav"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth"."NavRole" ADD CONSTRAINT "NavRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "auth"."roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
