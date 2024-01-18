/*
  Warnings:

  - You are about to alter the column `date` on the `daily_reports` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `pemagang_id` on the `notifications` table. All the data in the column will be lost.
  - You are about to alter the column `start_at` on the `pemagangs` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `end_at` on the `pemagangs` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `start_date` on the `weekly_reports` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `end_date` on the `weekly_reports` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `is_read` to the `notifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `send` to the `notifications` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `notifications` DROP FOREIGN KEY `notifications_pemagang_id_fkey`;

-- AlterTable
ALTER TABLE `daily_reports` MODIFY `date` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `notifications` DROP COLUMN `pemagang_id`,
    ADD COLUMN `is_read` BOOLEAN NOT NULL,
    ADD COLUMN `receive` VARCHAR(255) NULL,
    ADD COLUMN `send` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `pemagangs` MODIFY `start_at` DATETIME NOT NULL,
    MODIFY `end_at` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `weekly_reports` MODIFY `start_date` DATETIME NOT NULL,
    MODIFY `end_date` DATETIME NOT NULL;
