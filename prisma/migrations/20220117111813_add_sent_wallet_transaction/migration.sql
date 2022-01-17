/*
  Warnings:

  - You are about to drop the column `walletId` on the `Transaction` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Transaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sentById" TEXT,
    "receivedById" TEXT,
    "statusId" INTEGER NOT NULL,
    "receivedWalletId" TEXT,
    "sentWalletId" TEXT,
    "rate" INTEGER,
    "amount" INTEGER NOT NULL,
    "sentCurrencyId" INTEGER NOT NULL,
    "receivedCurrencyId" INTEGER,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Transaction_sentById_fkey" FOREIGN KEY ("sentById") REFERENCES "UserAccount" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Transaction_receivedById_fkey" FOREIGN KEY ("receivedById") REFERENCES "UserAccount" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Transaction_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Transaction_receivedWalletId_fkey" FOREIGN KEY ("receivedWalletId") REFERENCES "Wallet" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Transaction_sentWalletId_fkey" FOREIGN KEY ("sentWalletId") REFERENCES "Wallet" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Transaction_sentCurrencyId_fkey" FOREIGN KEY ("sentCurrencyId") REFERENCES "Currency" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Transaction_receivedCurrencyId_fkey" FOREIGN KEY ("receivedCurrencyId") REFERENCES "Currency" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Transaction" ("amount", "created_at", "id", "rate", "receivedById", "receivedCurrencyId", "sentById", "sentCurrencyId", "statusId", "updated_at") SELECT "amount", "created_at", "id", "rate", "receivedById", "receivedCurrencyId", "sentById", "sentCurrencyId", "statusId", "updated_at" FROM "Transaction";
DROP TABLE "Transaction";
ALTER TABLE "new_Transaction" RENAME TO "Transaction";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
