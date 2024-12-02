/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `widgets` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "WidgetType" AS ENUM ('EMBED', 'SHAREABLE');

-- AlterTable
ALTER TABLE "widgets" ADD COLUMN     "slug" TEXT,
ADD COLUMN     "type" "WidgetType" NOT NULL DEFAULT 'EMBED';

-- CreateIndex
CREATE UNIQUE INDEX "widgets_slug_key" ON "widgets"("slug");
