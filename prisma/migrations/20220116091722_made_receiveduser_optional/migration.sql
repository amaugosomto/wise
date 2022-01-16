-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Transaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sentById" TEXT NOT NULL,
    "receivedById" TEXT,
    "statusId" INTEGER NOT NULL,
    "walletId" TEXT,
    "rate" INTEGER,
    "amount" INTEGER NOT NULL,
    "sentCurrencyId" INTEGER NOT NULL,
    "receivedCurrencyId" INTEGER,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Transaction_sentById_fkey" FOREIGN KEY ("sentById") REFERENCES "UserAccount" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Transaction_receivedById_fkey" FOREIGN KEY ("receivedById") REFERENCES "UserAccount" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Transaction_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Transaction_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Transaction_sentCurrencyId_fkey" FOREIGN KEY ("sentCurrencyId") REFERENCES "Currency" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Transaction_receivedCurrencyId_fkey" FOREIGN KEY ("receivedCurrencyId") REFERENCES "Currency" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Transaction" ("amount", "created_at", "id", "rate", "receivedById", "receivedCurrencyId", "sentById", "sentCurrencyId", "statusId", "updated_at", "walletId") SELECT "amount", "created_at", "id", "rate", "receivedById", "receivedCurrencyId", "sentById", "sentCurrencyId", "statusId", "updated_at", "walletId" FROM "Transaction";
DROP TABLE "Transaction";
ALTER TABLE "new_Transaction" RENAME TO "Transaction";
CREATE UNIQUE INDEX "Transaction_statusId_key" ON "Transaction"("statusId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
