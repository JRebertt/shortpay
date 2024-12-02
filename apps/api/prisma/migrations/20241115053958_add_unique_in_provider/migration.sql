/*
  Warnings:

  - A unique constraint covering the columns `[provider]` on the table `AvailableGateway` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "AvailableGateway_provider_key" ON "AvailableGateway"("provider");
