/*
  Warnings:

  - You are about to drop the `Widget` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Widget" DROP CONSTRAINT "Widget_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "gateway_transactions" DROP CONSTRAINT "gateway_transactions_widget_id_fkey";

-- DropTable
DROP TABLE "Widget";

-- CreateTable
CREATE TABLE "widgets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "integrationId" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,

    CONSTRAINT "widgets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "gateway_transactions" ADD CONSTRAINT "gateway_transactions_widget_id_fkey" FOREIGN KEY ("widget_id") REFERENCES "widgets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "widgets" ADD CONSTRAINT "widgets_integrationId_fkey" FOREIGN KEY ("integrationId") REFERENCES "integrations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "widgets" ADD CONSTRAINT "widgets_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
