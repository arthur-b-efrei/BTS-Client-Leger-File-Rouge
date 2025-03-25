/*
  Warnings:

  - Added the required column `sales_price` to the `sale` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sale" ADD COLUMN "sales_price" DECIMAL(10, 2) NOT NULL DEFAULT 0.00;


