-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Avatar" (
    "id" TEXT NOT NULL,
    "backgroundColor" TEXT NOT NULL,
    "earrings" TEXT NOT NULL,
    "earringsProbability" INTEGER NOT NULL,
    "glassesProbability" INTEGER NOT NULL,
    "featuresProbability" INTEGER NOT NULL,
    "hairProbability" INTEGER NOT NULL,
    "eyebrows" TEXT NOT NULL,
    "eyes" TEXT NOT NULL,
    "features" TEXT NOT NULL,
    "glasses" TEXT NOT NULL,
    "hair" TEXT NOT NULL,
    "hairColor" TEXT NOT NULL,
    "mouth" TEXT NOT NULL,
    "seed" TEXT NOT NULL,
    "skinColor" TEXT NOT NULL,
    "flip" BOOLEAN NOT NULL,
    "userId" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Avatar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Battle" (
    "id" TEXT NOT NULL,
    "log" JSONB[],
    "playerId" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "winner" BOOLEAN NOT NULL,
    "pokemon1" JSONB NOT NULL,
    "pokemon2" JSONB NOT NULL,
    "winnerName" TEXT NOT NULL,
    "loserName" TEXT NOT NULL,
    "isDraw" BOOLEAN NOT NULL,

    CONSTRAINT "Battle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Avatar_userId_key" ON "Avatar"("userId");
