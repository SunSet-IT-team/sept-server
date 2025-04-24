/*
  Warnings:

  - A unique constraint covering the columns `[previewFileId]` on the table `Service` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
ALTER TYPE "FileType" ADD VALUE 'SERVICE_PREVIEW';

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "previewFileId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Service_previewFileId_key" ON "Service"("previewFileId");

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_previewFileId_fkey" FOREIGN KEY ("previewFileId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;
