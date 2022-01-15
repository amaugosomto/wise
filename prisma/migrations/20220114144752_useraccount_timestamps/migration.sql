-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserAccount" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_UserAccount" ("email", "fullName", "id", "password") SELECT "email", "fullName", "id", "password" FROM "UserAccount";
DROP TABLE "UserAccount";
ALTER TABLE "new_UserAccount" RENAME TO "UserAccount";
CREATE UNIQUE INDEX "UserAccount_email_key" ON "UserAccount"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
