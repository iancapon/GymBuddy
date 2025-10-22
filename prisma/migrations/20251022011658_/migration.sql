-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_RoutineAt" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER,
    "routineId" INTEGER NOT NULL,
    "orden" INTEGER NOT NULL DEFAULT 0,
    "fecha" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cumplida" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "RoutineAt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "RoutineAt_routineId_fkey" FOREIGN KEY ("routineId") REFERENCES "Routine" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_RoutineAt" ("fecha", "id", "orden", "routineId", "userId") SELECT "fecha", "id", "orden", "routineId", "userId" FROM "RoutineAt";
DROP TABLE "RoutineAt";
ALTER TABLE "new_RoutineAt" RENAME TO "RoutineAt";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
