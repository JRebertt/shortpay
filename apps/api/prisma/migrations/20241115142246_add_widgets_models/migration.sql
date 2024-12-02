/*
  Warnings:

  - You are about to drop the column `created_at` on the `gateway_transactions` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `gateway_transactions` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `gateway_transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "gateway_transactions" DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "widget_id" TEXT;

-- CreateTable
CREATE TABLE "Widget" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Widget_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "gateway_transactions" ADD CONSTRAINT "gateway_transactions_widget_id_fkey" FOREIGN KEY ("widget_id") REFERENCES "Widget"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Widget" ADD CONSTRAINT "Widget_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
