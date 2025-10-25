/*
  Warnings:

  - You are about to drop the `RoutineAt` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `dayAssignmentId` on the `Routine` table. All the data in the column will be lost.
  - Added the required column `routineId` to the `DayAssignment` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "RoutineAt";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DayAssignment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER,
    "dayIndex" INTEGER NOT NULL,
    "routineId" INTEGER NOT NULL,
    CONSTRAINT "DayAssignment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "DayAssignment_routineId_fkey" FOREIGN KEY ("routineId") REFERENCES "Routine" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_DayAssignment" ("dayIndex", "id", "userId") SELECT "dayIndex", "id", "userId" FROM "DayAssignment";
DROP TABLE "DayAssignment";
ALTER TABLE "new_DayAssignment" RENAME TO "DayAssignment";
CREATE TABLE "new_Routine" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Routine_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Routine" ("createdAt", "id", "nombre", "userId") SELECT "createdAt", "id", "nombre", "userId" FROM "Routine";
DROP TABLE "Routine";
ALTER TABLE "new_Routine" RENAME TO "Routine";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
