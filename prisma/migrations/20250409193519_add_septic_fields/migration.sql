/*
  Warnings:

  - You are about to drop the column `city` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Order` table. All the data in the column will be lost.
  - Added the required column `distanceToSeptic` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `objectType` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentMethod` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `septicConstructionType` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `septicDepth` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `septicVolume` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workDate` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "city",
DROP COLUMN "description",
ADD COLUMN     "comment" TEXT,
ADD COLUMN     "distanceToSeptic" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "objectType" TEXT NOT NULL,
ADD COLUMN     "paymentMethod" TEXT NOT NULL,
ADD COLUMN     "septicConstructionType" TEXT NOT NULL,
ADD COLUMN     "septicDepth" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "septicVolume" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "workDate" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "Order_workDate_idx" ON "Order"("workDate");
