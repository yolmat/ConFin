/*
  Warnings:

  - The values [OVERDUE] on the enum `TransactionStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `dueDate` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the `RecurringTransaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TransactionMovement` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `date` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."TransactionStatus_new" AS ENUM ('PENDING', 'PARTIALLY_PAID', 'PAID');
ALTER TABLE "public"."Transaction" ALTER COLUMN "status" TYPE "public"."TransactionStatus_new" USING ("status"::text::"public"."TransactionStatus_new");
ALTER TYPE "public"."TransactionStatus" RENAME TO "TransactionStatus_old";
ALTER TYPE "public"."TransactionStatus_new" RENAME TO "TransactionStatus";
DROP TYPE "public"."TransactionStatus_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "public"."RecurringTransaction" DROP CONSTRAINT "RecurringTransaction_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Transaction" DROP CONSTRAINT "Transaction_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."TransactionMovement" DROP CONSTRAINT "TransactionMovement_recurringTransactionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."TransactionMovement" DROP CONSTRAINT "TransactionMovement_transactionId_fkey";

-- AlterTable
ALTER TABLE "public"."Transaction" DROP COLUMN "dueDate",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "note" TEXT,
ADD COLUMN     "type" "public"."MovementType" NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'PENDING',
ALTER COLUMN "paidAmount" SET DEFAULT 0,
ALTER COLUMN "pendingAmount" SET DEFAULT 0;

-- DropTable
DROP TABLE "public"."RecurringTransaction";

-- DropTable
DROP TABLE "public"."TransactionMovement";

-- DropEnum
DROP TYPE "public"."RecurrenceFrequency";

-- AddForeignKey
ALTER TABLE "public"."Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
