<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Class Post
 * @package App\Entity
 *
 * @ORM\Table(name="post")
 * @ORM\Entity(repositoryClass="App\Repository\PostRepository")
 */
class Post
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
     * @ORM\Column(name="insta_id", type="string", nullable=false)
     *
     * @Assert\NotBlank()
     */
    private $instaId;

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
    public function getInstaId(): ?string
    {
        return $this->instaId;
    }

    /**
     * @param string $instaId
     * @return Post
     */
    public function setInstaId(string $instaId): Post
    {
        $this->instaId = $instaId;
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
     * @return Post
     */
    public function setActivated(bool $activated): Post
    {
        $this->activated = $activated;
        return $this;
    }
}