/*
  Warnings:

  - Added the required column `paidAmount` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pendingAmount` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Transaction" ADD COLUMN     "paidAmount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "pendingAmount" DOUBLE PRECISION NOT NULL;
