-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "NotificationKind" ADD VALUE 'PROPOSAL_DISCUSSION_MENTION';
ALTER TYPE "NotificationKind" ADD VALUE 'PROPOSAL_DISCUSSION_REPLY';
ALTER TYPE "NotificationKind" ADD VALUE 'PROPOSAL_DISCUSSION_CREATOR';
ALTER TYPE "NotificationKind" ADD VALUE 'PROPOSAL_DISCUSSION_CONTRIBUTOR';
ALTER TYPE "NotificationKind" ADD VALUE 'PROPOSAL_DISCUSSION_ALL';
ALTER TYPE "NotificationKind" ADD VALUE 'PROPOSAL_ENTITY_DISCUSSION';
