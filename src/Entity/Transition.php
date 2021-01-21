<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Class Transition
 * @package App\Entity
 *
 * @ORM\Table(name="transition")
 * @ORM\Entity(repositoryClass="App\Repository\TransitionRepository")
 */
class Transition
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
     * @ORM\Column(name="name", type="string", nullable=false)
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(name="file_name", type="string", nullable=false)
     */
    private $fileName;

    /**
     * Transition constructor.
     */
    public function __construct()
    {
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
    public function getName(): ?string
    {
        return $this->name;
    }

    /**
     * @param string $name
     * @return Transition
     */
    public function setName(string $name): Transition
    {
        $this->name = $name;
        return $this;
    }

    /**
     * @return string
     */
    public function getFileName(): ?string
    {
        return $this->fileName;
    }

    /**
     * @param string $fileName
     * @return Transition
     */
    public function setFileName(string $fileName): Transition
    {
        $this->fileName = $fileName;
        return $this;
    }
}
