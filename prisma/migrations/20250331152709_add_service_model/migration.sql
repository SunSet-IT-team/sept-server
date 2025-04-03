-- CreateTable
CREATE TABLE "Service" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "priority" INTEGER NOT NULL DEFAULT 100,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);
