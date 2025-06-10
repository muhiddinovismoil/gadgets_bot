-- CreateEnum
CREATE TYPE "RateEnum" AS ENUM ('Terrible', 'Bad', 'Okay', 'Good', 'Excellent');

-- CreateEnum
CREATE TYPE "PcEnum" AS ENUM ('LAPTOP', 'PC');

-- CreateTable
CREATE TABLE "admin" (
    "id" UUID NOT NULL DEFAULT GEN_RANDOM_UUID(),
    "tg_id" VARCHAR(30),
    "fullname" VARCHAR(24),
    "username" VARCHAR(40),
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT GEN_RANDOM_UUID(),
    "tg_id" VARCHAR(30),
    "fullname" VARCHAR(24),
    "username" VARCHAR(40),
    "phone_number" VARCHAR(25),
    "lang" VARCHAR(2),
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "phones" (
    "id" UUID NOT NULL DEFAULT GEN_RANDOM_UUID(),
    "price" INTEGER,
    "delivery" BOOLEAN,
    "exchange" BOOLEAN,
    "phone_number" VARCHAR(25),
    "region" VARCHAR(30),
    "model" VARCHAR(40),
    "memory" VARCHAR(30),
    "battery" VARCHAR(35),
    "condition" VARCHAR(35),
    "images" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "otherInfo" TEXT,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,

    CONSTRAINT "phones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pc" (
    "id" UUID NOT NULL DEFAULT GEN_RANDOM_UUID(),
    "type" "PcEnum",
    "price" INTEGER,
    "delivery" BOOLEAN,
    "phone_number" VARCHAR(40),
    "model" VARCHAR(40),
    "processor" VARCHAR(40),
    "mother_board" VARCHAR(40),
    "memory" VARCHAR(30),
    "images" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "otherInfo" TEXT,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,

    CONSTRAINT "pc_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_tg_id_key" ON "admin"("tg_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_tg_id_key" ON "users"("tg_id");
