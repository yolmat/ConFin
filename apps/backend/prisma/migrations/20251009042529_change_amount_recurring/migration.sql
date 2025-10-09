/*
  Warnings:

  - You are about to drop the column `amount` on the `RecurringTransaction` table. All the data in the column will be lost.
  - Added the required column `amountTotal` to the `RecurringTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."RecurringTransaction" DROP COLUMN "amount",
ADD COLUMN     "amountTotal" DOUBLE PRECISION NOT NULL;
