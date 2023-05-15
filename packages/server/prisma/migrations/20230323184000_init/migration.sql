-- CreateEnum
CREATE TYPE "NotificationKind" AS ENUM ('FORUM_POST_ALL', 'FORUM_POST_MENTION', 'FORUM_POST_REPLY', 'FORUM_THREAD_CREATOR', 'FORUM_THREAD_CONTRIBUTOR', 'FORUM_THREAD_ALL', 'FORUM_THREAD_MENTION', 'FORUM_WATCHED_THREAD', 'FORUM_WATCHED_CATEGORY_POST', 'FORUM_WATCHED_CATEGORY_THREAD');

-- CreateTable
CREATE TABLE "Member" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" SERIAL NOT NULL,
    "memberId" INTEGER NOT NULL,
    "kind" "NotificationKind" NOT NULL,
    "entityId" TEXT,
    "shouldNotify" BOOLEAN NOT NULL DEFAULT true,
    "shouldNotifyByEmail" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "memberId" INTEGER NOT NULL,
    "kind" "NotificationKind" NOT NULL,
    "eventId" TEXT NOT NULL,
    "entityId" TEXT,
    "isSent" BOOLEAN NOT NULL DEFAULT false,
    "isRead" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Store" (
    "key" TEXT NOT NULL,
    "value" JSONB NOT NULL,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("key")
);

-- CreateIndex
CREATE INDEX "Subscription_memberId_idx" ON "Subscription"("memberId");

-- CreateIndex
CREATE INDEX "Subscription_kind_idx" ON "Subscription"("kind");

-- CreateIndex
CREATE INDEX "Subscription_entityId_idx" ON "Subscription"("entityId");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_memberId_kind_entityId_key" ON "Subscription"("memberId", "kind", "entityId");

-- CreateIndex
CREATE INDEX "Notification_memberId_idx" ON "Notification"("memberId");

-- CreateIndex
CREATE UNIQUE INDEX "Notification_memberId_eventId_key" ON "Notification"("memberId", "eventId");

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
