/*
  Warnings:

  - You are about to drop the column `newsLetter` on the `Profile` table. All the data in the column will be lost.
  - You are about to alter the column `quantity` on the `Trade` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - Added the required column `subscribed` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "newsLetter",
ADD COLUMN     "subscribed" BOOLEAN NOT NULL,
ADD COLUMN     "validated" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Trade" ALTER COLUMN "quantity" SET DATA TYPE INTEGER;
