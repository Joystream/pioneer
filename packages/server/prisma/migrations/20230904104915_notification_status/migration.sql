/*
  Warnings:

  - You are about to drop the column `isSent` on the `Notification` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "NotificationStatus" AS ENUM ('PENDING', 'SENT', 'FAILED');

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "isSent",
ADD COLUMN     "retryCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "status" "NotificationStatus" NOT NULL DEFAULT 'PENDING';
