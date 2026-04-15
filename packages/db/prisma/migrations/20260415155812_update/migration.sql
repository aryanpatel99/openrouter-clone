/*
  Warnings:

  - You are about to alter the column `cost` on the `Conversation` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `BigInt`.
  - You are about to alter the column `inputCost` on the `ModelProviderMapping` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `BigInt`.
  - You are about to alter the column `outputCost` on the `ModelProviderMapping` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `BigInt`.
  - You are about to alter the column `budgetLimit` on the `PlatformUserApiKey` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `BigInt`.
  - You are about to alter the column `creditsUsed` on the `PlatformUserApiKey` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `BigInt`.
  - You are about to alter the column `amount` on the `Transaction` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `BigInt`.
  - You are about to alter the column `totalCost` on the `UsageAnalytics` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `BigInt`.
  - You are about to alter the column `credits` on the `User` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `BigInt`.

*/
-- AlterTable
ALTER TABLE "Conversation" ALTER COLUMN "cost" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "ModelProviderMapping" ALTER COLUMN "inputCost" SET DATA TYPE BIGINT,
ALTER COLUMN "outputCost" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "PlatformUserApiKey" ALTER COLUMN "budgetLimit" SET DATA TYPE BIGINT,
ALTER COLUMN "creditsUsed" SET DEFAULT 0,
ALTER COLUMN "creditsUsed" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "amount" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "UsageAnalytics" ALTER COLUMN "totalCost" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "credits" SET DEFAULT 1000000000,
ALTER COLUMN "credits" SET DATA TYPE BIGINT;
