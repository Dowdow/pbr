<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Class Video
 * @package App\Entity
 *
 * @ORM\Table(name="video")
 * @ORM\Entity(repositoryClass="App\Repository\VideoRepository")
 */
class Video
{
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
     * @ORM\Column(name="youtube_id", type="string", nullable=false)
     *
     * @Assert\NotBlank()
     */
    private $youtubeId;

    /**
     * @var boolean
     *
     * @ORM\Column(name="activated", type="boolean", nullable=false)
     */
    private $activated;

    /**
     * @var int
     *
     * @ORM\Column(name="sort", type="integer", nullable=false)
     */
    private $sort;

    /**
     * Video constructor.
     */
    public function __construct()
    {
        $this->activated = true;
        $this->sort = 0;
    }

    /**
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * @return string
     */
    public function getYoutubeId(): ?string
    {
        return $this->youtubeId;
    }

    /**
     * @param string $youtubeId
     * @return Video
     */
    public function setYoutubeId(string $youtubeId): Video
    {
        $this->youtubeId = $youtubeId;
        return $this;
    }

    /**
     * @return bool
     */
    public function isActivated(): bool
    {
        return $this->activated;
    }

    /**
     * @param bool $activated
     * @return Video
     */
    public function setActivated(bool $activated): Video
    {
        $this->activated = $activated;
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
     * @return Video
     */
    public function setSort(int $sort): Video
    {
        $this->sort = $sort;
        return $this;
    }
}