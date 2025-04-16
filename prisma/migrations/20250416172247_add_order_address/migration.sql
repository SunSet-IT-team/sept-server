-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "address" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "firstName" DROP NOT NULL;
