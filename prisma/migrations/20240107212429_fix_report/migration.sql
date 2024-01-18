/*
  Warnings:

  - You are about to alter the column `start_at` on the `pemagangs` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `end_at` on the `pemagangs` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - The values [Alpa] on the enum `presences_status` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `logbook_category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `logbook_detail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `logbooks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `logbooks` DROP FOREIGN KEY `logbooks_logbook_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `logbooks` DROP FOREIGN KEY `logbooks_logbook_detail_id_fkey`;

-- DropForeignKey
ALTER TABLE `logbooks` DROP FOREIGN KEY `logbooks_pemagang_id_fkey`;

-- AlterTable
ALTER TABLE `pemagangs` MODIFY `start_at` DATETIME NOT NULL,
    MODIFY `end_at` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `presences` MODIFY `status` ENUM('Hadir', 'Sakit', 'Ijin') NULL;

-- DropTable
DROP TABLE `logbook_category`;

-- DropTable
DROP TABLE `logbook_detail`;

-- DropTable
DROP TABLE `logbooks`;

-- CreateTable
CREATE TABLE `daily_reports` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pemagang_id` INTEGER NOT NULL,
    `date` DATETIME NOT NULL,
    `activity` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `weekly_reports` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pemagang_id` INTEGER NOT NULL,
    `status` ENUM('Review', 'Revision', 'Approval') NULL,
    `start_date` DATETIME NOT NULL,
    `end_date` DATETIME NOT NULL,
    `week` VARCHAR(100) NOT NULL,
    `activity` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `daily_reports` ADD CONSTRAINT `daily_reports_pemagang_id_fkey` FOREIGN KEY (`pemagang_id`) REFERENCES `pemagangs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `weekly_reports` ADD CONSTRAINT `weekly_reports_pemagang_id_fkey` FOREIGN KEY (`pemagang_id`) REFERENCES `pemagangs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
