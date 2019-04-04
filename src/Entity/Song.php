<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Class Song
 * @package App\Entity
 *
 * @ORM\Table(name="song")
 * @ORM\Entity(repositoryClass="App\Repository\SongRepository")
 */
class Song
{
    public const CATEGORY_SONG = 'song';
    public const CATEGORY_MIX = 'mix';

    public const TYPE_TRACK = 'tracks';
    public const TYPE_PLAYLIST = 'playlists';

    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="soundcloud_id", type="string", nullable=false)
     *
     * @Assert\NotBlank()
     */
    private $soundcloudId;

    /**
     * @var boolean
     *
     * @ORM\Column(name="activated", type="boolean", nullable=false)
     */
    private $activated;

    /**
     * @var string
     *
     * @ORM\Column(name="type", type="string", nullable=false)
     */
    private $type;

    /**
     * @var string
     *
     * @ORM\Column(name="category", type="string", nullable=false)
     */
    private $category;

    /**
     * @var boolean
     *
     * @ORM\Column(name="visual", type="boolean")
     */
    private $visual;

    /**
     * @var int
     *
     * @ORM\Column(name="sort", type="integer", nullable=false)
     */
    private $sort;

    /**
     * Song constructor.
     */
    public function __construct()
    {
        $this->activated = true;
        $this->type = self::TYPE_TRACK;
        $this->category = self::CATEGORY_SONG;
        $this->visual = false;
        $this->sort = 0;
    }

    /**
     * @return int
     */
    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return string
     */
    public function getSoundcloudId(): ?string
    {
        return $this->soundcloudId;
    }

    /**
     * @param string $soundcloudId
     * @return Song
     */
    public function setSoundcloudId(string $soundcloudId): Song
    {
        $this->soundcloudId = $soundcloudId;
        return $this;
    }

    /**
     * @return bool
     */
    public function isActivated(): ?bool
    {
        return $this->activated;
    }

    /**
     * @param bool $activated
     * @return Song
     */
    public function setActivated(bool $activated): Song
    {
        $this->activated = $activated;
        return $this;
    }

    /**
     * @return string
     */
    public function getType(): string
    {
        return $this->type;
    }

    /**
     * @param string $type
     * @return Song
     */
    public function setType(string $type): Song
    {
        $this->type = $type;
        return $this;
    }

    /**
     * @return string
     */
    public function getCategory(): string
    {
        return $this->category;
    }

    /**
     * @param string $category
     * @return Song
     */
    public function setCategory(string $category): Song
    {
        $this->category = $category;
        return $this;
    }

    /**
     * @return bool
     */
    public function isVisual(): bool
    {
        return $this->visual;
    }

    /**
     * @param bool $visual
     * @return Song
     */
    public function setVisual(bool $visual): Song
    {
        $this->visual = $visual;
        return $this;
    }

    /**
     * @return int
     */
    public function getSort(): int
    {
        return $this->sort;
    }

    /**
     * @param int $sort
     * @return Song
     */
    public function setSort(int $sort): Song
    {
        $this->sort = $sort;
        return $this;
    }
}