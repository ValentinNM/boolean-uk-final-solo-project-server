/*
  Warnings:

  - You are about to drop the column `validated` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "subscribed" SET DEFAULT false;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "validated";
