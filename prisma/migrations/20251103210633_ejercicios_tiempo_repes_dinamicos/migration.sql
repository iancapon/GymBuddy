-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Exercise" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "media" TEXT NOT NULL,
    "info1" TEXT NOT NULL DEFAULT '',
    "info2" TEXT NOT NULL DEFAULT '',
    "series" INTEGER NOT NULL DEFAULT 0,
    "repesXserie" INTEGER NOT NULL DEFAULT 0,
    "tiempoXserie" INTEGER NOT NULL DEFAULT 10,
    "descansoXserie" INTEGER NOT NULL DEFAULT 0,
    "routineId" INTEGER NOT NULL,
    "orden" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Exercise_routineId_fkey" FOREIGN KEY ("routineId") REFERENCES "Routine" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Exercise" ("createdAt", "id", "info1", "info2", "media", "orden", "routineId", "titulo") SELECT "createdAt", "id", "info1", "info2", "media", "orden", "routineId", "titulo" FROM "Exercise";
DROP TABLE "Exercise";
ALTER TABLE "new_Exercise" RENAME TO "Exercise";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
