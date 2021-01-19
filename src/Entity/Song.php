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
     * @var string
     *
     * @ORM\Column(name="name", type="string", nullable=false)
     *
     * @Assert\NotBlank()
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(name="image", type="string", nullable=false)
     *
     * @Assert\NotBlank()
     */
    private $image;

    /**
     * @var boolean
     *
     * @ORM\Column(name="activated", type="boolean", nullable=false)
     */
    private $activated;

    /**
     * Song constructor.
     */
    public function __construct()
    {
        $this->activated = true;
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
    public function getName(): ?string
    {
        return $this->name;
    }

    /**
     * @param string $name
     * @return Song
     */
    public function setName(string $name): Song
    {
        $this->name = $name;
        return $this;
    }

    /**
     * @return string
     */
    public function getImage(): ?string
    {
        return $this->image;
    }

    /**
     * @param string $image
     * @return Song
     */
    public function setImage(string $image): Song
    {
        $this->image = $image;
        return $this;
    }
}
