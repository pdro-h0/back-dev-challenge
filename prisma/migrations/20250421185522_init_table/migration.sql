-- CreateEnum
CREATE TYPE "Status" AS ENUM ('NOT_STARTED', 'STARTED', 'IN_PROGRESS', 'FINISHED');

-- CreateTable
CREATE TABLE "polls" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_date" TIMESTAMP(3) NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'NOT_STARTED',

    CONSTRAINT "polls_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "options" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "votes" INTEGER NOT NULL DEFAULT 0,
    "poll_id" TEXT NOT NULL,

    CONSTRAINT "options_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "options" ADD CONSTRAINT "options_poll_id_fkey" FOREIGN KEY ("poll_id") REFERENCES "polls"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
