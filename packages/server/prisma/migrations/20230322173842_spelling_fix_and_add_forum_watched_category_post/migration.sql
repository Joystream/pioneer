/*
  Warnings:

  - The values [FORUM_THREAD_CONTIBUTOR] on the enum `NotificationKind` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "NotificationKind_new" AS ENUM ('FORUM_POST_ALL', 'FORUM_POST_MENTION', 'FORUM_POST_REPLY', 'FORUM_THREAD_CREATOR', 'FORUM_THREAD_CONTRIBUTOR', 'FORUM_WATCHED_THREAD', 'FORUM_WATCHED_CATEGORY_POST');
ALTER TABLE "Subscription" ALTER COLUMN "kind" TYPE "NotificationKind_new" USING ("kind"::text::"NotificationKind_new");
ALTER TABLE "Notification" ALTER COLUMN "kind" TYPE "NotificationKind_new" USING ("kind"::text::"NotificationKind_new");
ALTER TYPE "NotificationKind" RENAME TO "NotificationKind_old";
ALTER TYPE "NotificationKind_new" RENAME TO "NotificationKind";
DROP TYPE "NotificationKind_old";
COMMIT;
