/*
  Warnings:

  - A unique constraint covering the columns `[previewFileId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
ALTER TYPE "FileType" ADD VALUE 'ORDER_PREVIEW';

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "previewFileId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Order_previewFileId_key" ON "Order"("previewFileId");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_previewFileId_fkey" FOREIGN KEY ("previewFileId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;
