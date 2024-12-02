/*
  Warnings:

  - You are about to drop the column `slug` on the `widgets` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[widgetSlug]` on the table `widgets` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "widgets_slug_key";

-- AlterTable
ALTER TABLE "widgets" DROP COLUMN "slug",
ADD COLUMN     "widgetSlug" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "widgets_widgetSlug_key" ON "widgets"("widgetSlug");
