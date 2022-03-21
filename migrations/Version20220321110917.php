<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220321110917 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE video');
        $this->addSql('ALTER TABLE transition CHANGE name name VARCHAR(191) NOT NULL, CHANGE file_name file_name VARCHAR(191) NOT NULL');
        $this->addSql('ALTER TABLE user CHANGE email email VARCHAR(191) NOT NULL, CHANGE username username VARCHAR(191) NOT NULL, CHANGE picture picture VARCHAR(191) NOT NULL, CHANGE twitch_id twitch_id VARCHAR(191) NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE video (id INT AUTO_INCREMENT NOT NULL, youtube_id VARCHAR(191) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, activated TINYINT(1) NOT NULL, sort INT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE transition CHANGE name name VARCHAR(191) NOT NULL, CHANGE file_name file_name VARCHAR(191) NOT NULL');
        $this->addSql('ALTER TABLE user CHANGE email email VARCHAR(191) NOT NULL, CHANGE username username VARCHAR(191) NOT NULL, CHANGE picture picture VARCHAR(191) NOT NULL, CHANGE twitch_id twitch_id VARCHAR(191) NOT NULL');
    }
}
