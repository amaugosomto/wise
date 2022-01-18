-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserAccount" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_UserAccount" ("created_at", "email", "fullName", "id", "password", "updated_at") SELECT "created_at", "email", "fullName", "id", "password", "updated_at" FROM "UserAccount";
DROP TABLE "UserAccount";
ALTER TABLE "new_UserAccount" RENAME TO "UserAccount";
CREATE UNIQUE INDEX "UserAccount_email_key" ON "UserAccount"("email");
CREATE TABLE "new_Status" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_Status" ("created_at", "id", "name", "updated_at") SELECT "created_at", "id", "name", "updated_at" FROM "Status";
DROP TABLE "Status";
ALTER TABLE "new_Status" RENAME TO "Status";
CREATE TABLE "new_Wallet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "currencyId" INTEGER NOT NULL,
    "amount" DECIMAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Wallet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserAccount" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Wallet_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Wallet" ("amount", "created_at", "currencyId", "id", "updated_at", "userId") SELECT "amount", "created_at", "currencyId", "id", "updated_at", "userId" FROM "Wallet";
DROP TABLE "Wallet";
ALTER TABLE "new_Wallet" RENAME TO "Wallet";
CREATE TABLE "new_Currency" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_Currency" ("created_at", "id", "name", "updated_at") SELECT "created_at", "id", "name", "updated_at" FROM "Currency";
DROP TABLE "Currency";
ALTER TABLE "new_Currency" RENAME TO "Currency";
CREATE TABLE "new_Transaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sentById" TEXT,
    "receivedById" TEXT,
    "statusId" INTEGER NOT NULL,
    "receivedWalletId" TEXT,
    "sentWalletId" TEXT,
    "rate" DECIMAL,
    "amount" DECIMAL NOT NULL,
    "sentCurrencyId" INTEGER NOT NULL,
    "receivedCurrencyId" INTEGER,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Transaction_sentById_fkey" FOREIGN KEY ("sentById") REFERENCES "UserAccount" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Transaction_receivedById_fkey" FOREIGN KEY ("receivedById") REFERENCES "UserAccount" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Transaction_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Transaction_receivedWalletId_fkey" FOREIGN KEY ("receivedWalletId") REFERENCES "Wallet" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Transaction_sentWalletId_fkey" FOREIGN KEY ("sentWalletId") REFERENCES "Wallet" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Transaction_sentCurrencyId_fkey" FOREIGN KEY ("sentCurrencyId") REFERENCES "Currency" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Transaction_receivedCurrencyId_fkey" FOREIGN KEY ("receivedCurrencyId") REFERENCES "Currency" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Transaction" ("amount", "created_at", "id", "rate", "receivedById", "receivedCurrencyId", "receivedWalletId", "sentById", "sentCurrencyId", "sentWalletId", "statusId", "updated_at") SELECT "amount", "created_at", "id", "rate", "receivedById", "receivedCurrencyId", "receivedWalletId", "sentById", "sentCurrencyId", "sentWalletId", "statusId", "updated_at" FROM "Transaction";
DROP TABLE "Transaction";
ALTER TABLE "new_Transaction" RENAME TO "Transaction";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
