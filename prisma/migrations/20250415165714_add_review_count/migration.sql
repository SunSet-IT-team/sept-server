/*
  Warnings:

  - Made the column `recoveryCode` on table `AdminProfile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `rating` on table `ExecutorProfile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `experience` on table `ExecutorProfile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `city` on table `ExecutorProfile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `firstName` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "AdminProfile" ALTER COLUMN "recoveryCode" SET NOT NULL;

-- AlterTable
ALTER TABLE "CustomerProfile" ADD COLUMN     "reviewCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "ExecutorProfile" ALTER COLUMN "rating" SET NOT NULL,
ALTER COLUMN "experience" SET NOT NULL,
ALTER COLUMN "city" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "firstName" SET NOT NULL;
