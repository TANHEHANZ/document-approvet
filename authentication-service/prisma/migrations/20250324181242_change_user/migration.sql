/*
  Warnings:

  - A unique constraint covering the columns `[ci]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ci` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "auth"."User" ADD COLUMN     "ci" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_ci_key" ON "auth"."User"("ci");
