-- CreateTable
CREATE TABLE "Todo" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "content" TEXT,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);
