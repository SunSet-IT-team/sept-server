/*
  Warnings:

  - Changed the type of `workFormat` on the `ExecutorProfile` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "ExecutorProfile" DROP COLUMN "workFormat",
ADD COLUMN     "workFormat" TEXT NOT NULL;
