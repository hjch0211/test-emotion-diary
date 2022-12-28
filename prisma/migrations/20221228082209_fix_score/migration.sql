/*
  Warnings:

  - You are about to drop the column `authorId` on the `score` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `score` table. All the data in the column will be lost.
  - Added the required column `emotion` to the `Score` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Score` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `score` DROP FOREIGN KEY `Score_authorId_fkey`;

-- AlterTable
ALTER TABLE `score` DROP COLUMN `authorId`,
    DROP COLUMN `content`,
    ADD COLUMN `emotion` VARCHAR(30) NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Score` ADD CONSTRAINT `Score_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
