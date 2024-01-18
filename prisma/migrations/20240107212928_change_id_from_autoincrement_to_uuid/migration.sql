/*
  Warnings:

  - The primary key for the `daily_reports` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `date` on the `daily_reports` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - The primary key for the `divisions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `mentors` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `menu` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `notifications` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `pemagangs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `start_at` on the `pemagangs` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `end_at` on the `pemagangs` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - The primary key for the `presences` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `weekly_reports` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `start_date` on the `weekly_reports` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `end_date` on the `weekly_reports` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- DropForeignKey
ALTER TABLE `daily_reports` DROP FOREIGN KEY `daily_reports_pemagang_id_fkey`;

-- DropForeignKey
ALTER TABLE `mentors` DROP FOREIGN KEY `mentors_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `notifications` DROP FOREIGN KEY `notifications_pemagang_id_fkey`;

-- DropForeignKey
ALTER TABLE `pemagangs` DROP FOREIGN KEY `pemagangs_divisi_id_fkey`;

-- DropForeignKey
ALTER TABLE `pemagangs` DROP FOREIGN KEY `pemagangs_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `presences` DROP FOREIGN KEY `presences_pemagang_id_fkey`;

-- DropForeignKey
ALTER TABLE `weekly_reports` DROP FOREIGN KEY `weekly_reports_pemagang_id_fkey`;

-- AlterTable
ALTER TABLE `daily_reports` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `pemagang_id` VARCHAR(191) NOT NULL,
    MODIFY `date` DATETIME NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `divisions` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `mentors` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `user_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `menu` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `notifications` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `pemagang_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `pemagangs` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `user_id` VARCHAR(191) NOT NULL,
    MODIFY `divisi_id` VARCHAR(191) NOT NULL,
    MODIFY `start_at` DATETIME NOT NULL,
    MODIFY `end_at` DATETIME NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `presences` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `pemagang_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `users` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `weekly_reports` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `pemagang_id` VARCHAR(191) NOT NULL,
    MODIFY `start_date` DATETIME NOT NULL,
    MODIFY `end_date` DATETIME NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `pemagangs` ADD CONSTRAINT `pemagangs_divisi_id_fkey` FOREIGN KEY (`divisi_id`) REFERENCES `divisions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pemagangs` ADD CONSTRAINT `pemagangs_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mentors` ADD CONSTRAINT `mentors_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `presences` ADD CONSTRAINT `presences_pemagang_id_fkey` FOREIGN KEY (`pemagang_id`) REFERENCES `pemagangs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notifications` ADD CONSTRAINT `notifications_pemagang_id_fkey` FOREIGN KEY (`pemagang_id`) REFERENCES `pemagangs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `daily_reports` ADD CONSTRAINT `daily_reports_pemagang_id_fkey` FOREIGN KEY (`pemagang_id`) REFERENCES `pemagangs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `weekly_reports` ADD CONSTRAINT `weekly_reports_pemagang_id_fkey` FOREIGN KEY (`pemagang_id`) REFERENCES `pemagangs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
