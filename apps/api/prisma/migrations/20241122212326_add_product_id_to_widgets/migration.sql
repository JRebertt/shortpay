/*
  Warnings:

  - Added the required column `productId` to the `widgets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "widgets" ADD COLUMN     "productId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "widgets" ADD CONSTRAINT "widgets_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
