-- CreateTable
CREATE TABLE "DayAssignment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER,
    "dayIndex" INTEGER NOT NULL,
    CONSTRAINT "DayAssignment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Routine" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dayAssignmentId" INTEGER,
    CONSTRAINT "Routine_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Routine_dayAssignmentId_fkey" FOREIGN KEY ("dayAssignmentId") REFERENCES "DayAssignment" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Routine" ("createdAt", "id", "nombre", "userId") SELECT "createdAt", "id", "nombre", "userId" FROM "Routine";
DROP TABLE "Routine";
ALTER TABLE "new_Routine" RENAME TO "Routine";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
