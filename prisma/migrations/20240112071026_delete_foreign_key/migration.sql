/*
  Warnings:

  - You are about to alter the column `date` on the `daily_reports` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `start_at` on the `pemagangs` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `end_at` on the `pemagangs` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - The values [Review,Revision,Approval] on the enum `weekly_reports_status` will be removed. If these variants are still used in the database, this will fail.
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
ALTER TABLE `pemagangs` DROP FOREIGN KEY `pemagangs_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `presences` DROP FOREIGN KEY `presences_pemagang_id_fkey`;

-- DropForeignKey
ALTER TABLE `weekly_reports` DROP FOREIGN KEY `weekly_reports_pemagang_id_fkey`;

-- AlterTable
ALTER TABLE `daily_reports` MODIFY `date` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `pemagangs` MODIFY `start_at` DATETIME NOT NULL,
    MODIFY `end_at` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `weekly_reports` MODIFY `status` ENUM('Submit', 'Revisi', 'Approve') NULL,
    MODIFY `start_date` DATETIME NOT NULL,
    MODIFY `end_date` DATETIME NOT NULL;

-- AddForeignKey
ALTER TABLE `pemagangs` ADD CONSTRAINT `pemagangs_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mentors` ADD CONSTRAINT `mentors_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `presences` ADD CONSTRAINT `presences_pemagang_id_fkey` FOREIGN KEY (`pemagang_id`) REFERENCES `pemagangs`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notifications` ADD CONSTRAINT `notifications_pemagang_id_fkey` FOREIGN KEY (`pemagang_id`) REFERENCES `pemagangs`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `daily_reports` ADD CONSTRAINT `daily_reports_pemagang_id_fkey` FOREIGN KEY (`pemagang_id`) REFERENCES `pemagangs`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `weekly_reports` ADD CONSTRAINT `weekly_reports_pemagang_id_fkey` FOREIGN KEY (`pemagang_id`) REFERENCES `pemagangs`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
