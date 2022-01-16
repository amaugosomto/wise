/*
  Warnings:

  - You are about to drop the column `currencyId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `receivedById` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sentById` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sentCurrencyId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Transaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sentById" TEXT NOT NULL,
    "receivedById" TEXT NOT NULL,
    "statusId" INTEGER NOT NULL,
    "walletId" TEXT,
    "rate" INTEGER,
    "amount" INTEGER NOT NULL,
    "sentCurrencyId" INTEGER NOT NULL,
    "receivedCurrencyId" INTEGER,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Transaction_sentById_fkey" FOREIGN KEY ("sentById") REFERENCES "UserAccount" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Transaction_receivedById_fkey" FOREIGN KEY ("receivedById") REFERENCES "UserAccount" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Transaction_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Transaction_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Transaction_sentCurrencyId_fkey" FOREIGN KEY ("sentCurrencyId") REFERENCES "Currency" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Transaction_receivedCurrencyId_fkey" FOREIGN KEY ("receivedCurrencyId") REFERENCES "Currency" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Transaction" ("amount", "created_at", "id", "rate", "statusId", "updated_at", "walletId") SELECT "amount", "created_at", "id", "rate", "statusId", "updated_at", "walletId" FROM "Transaction";
DROP TABLE "Transaction";
ALTER TABLE "new_Transaction" RENAME TO "Transaction";
CREATE UNIQUE INDEX "Transaction_statusId_key" ON "Transaction"("statusId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
