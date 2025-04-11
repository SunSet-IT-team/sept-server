/*
  Warnings:

  - Added the required column `workFormat` to the `ExecutorProfile` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "WorkFormat" AS ENUM ('INDIVIDUAL', 'LEGAL_ENTITY', 'SOLE_PROPRIETOR');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "FileType" ADD VALUE 'PROFILE_PHOTO';
ALTER TYPE "FileType" ADD VALUE 'REGISTRATION_CERTIFICATE';
ALTER TYPE "FileType" ADD VALUE 'LICENSE';

-- AlterTable
ALTER TABLE "ExecutorProfile" ADD COLUMN     "about" TEXT,
ADD COLUMN     "experience" INTEGER,
ADD COLUMN     "workFormat" "WorkFormat" NOT NULL;
