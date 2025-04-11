/*
  Warnings:

  - You are about to drop the column `orderId` on the `Service` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[serviceId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_orderId_fkey";

-- DropIndex
DROP INDEX "Service_orderId_key";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "serviceId" TEXT;

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "orderId";

-- CreateIndex
CREATE UNIQUE INDEX "Order_serviceId_key" ON "Order"("serviceId");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;
