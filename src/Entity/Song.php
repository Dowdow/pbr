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
     * @ORM\Column(name="url", type="string", nullable=false)
     *
     * @Assert\NotBlank()
     */
    private $url;

    /**
     * @var boolean
     *
     * @ORM\Column(name="activated", type="boolean", nullable=false)
     */
    private $activated;

    /**
     * @var string
     *
     * @ORM\Column(name="category", type="string", nullable=false)
     */
    private $category;

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
        $this->category = self::CATEGORY_SONG;
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
    public function getUrl(): ?string
    {
        return $this->url;
    }

    /**
     * @param string $url
     * @return Song
     */
    public function setUrl(string $url): Song
    {
        $this->url = $url;
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