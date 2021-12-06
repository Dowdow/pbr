<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;

/**
 * Class User
 * @package App\Entity
 *
 * @ORM\Table(name="user")
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 */
class User implements UserInterface
{
    /**
     * @var int|null
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private ?int $id;

    /**
     * @var string
     *
     * @ORM\Column(name="email", type="string", unique=true)
     */
    private string $email;

    /**
     * @var string
     *
     * @ORM\Column(name="username", type="string")
     */
    private string $username;

    /**
     * @var string
     *
     * @ORM\Column(name="picture", type="string")
     */
    private string $picture;

    /**
     * @var string
     *
     * @ORM\Column(name="twitch_id", type="string", unique=true)
     */
    private string $twitchId;

    /**
     * User constructor.
     * @param string $email
     * @param string $name
     * @param string $picture
     * @param string $twitchId
     */
    public function __construct(string $email, string $name, string $picture, string $twitchId)
    {
        $this->email = $email;
        $this->username = $name;
        $this->picture = $picture;
        $this->twitchId = $twitchId;
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
    public function getEmail(): ?string
    {
        return $this->email;
    }

    /**
     * @param string $email
     * @return User
     */
    public function setEmail(string $email): User
    {
        $this->email = $email;
        return $this;
    }

    /**
     * @return string
     */
    public function getUsername(): ?string
    {
        return $this->username;
    }

    /**
     * @param string $username
     * @return User
     */
    public function setUsername(string $username): User
    {
        $this->username = $username;
        return $this;
    }

    /**
     * @return string
     */
    public function getPicture(): ?string
    {
        return $this->picture;
    }

    /**
     * @param string $picture
     * @return User
     */
    public function setPicture(string $picture): User
    {
        $this->picture = $picture;
        return $this;
    }

    /**
     * @return string
     */
    public function getTwitchId(): ?string
    {
        return $this->twitchId;
    }

    /**
     * @param int $twitchId
     * @return User
     */
    public function setTwitchId(int $twitchId): User
    {
        $this->twitchId = $twitchId;
        return $this;
    }

    /**
     * Returns the roles granted to the user.
     *
     *     public function getRoles()
     *     {
     *         return array('ROLE_USER');
     *     }
     *
     * Alternatively, the roles might be stored on a ``roles`` property,
     * and populated in any number of different ways when the user object
     * is created.
     *
     * @return array (Role|string)[] The user roles
     */
    public function getRoles(): array
    {
        return ['ROLE_USER'];
    }

    /**
     * Returns the password used to authenticate the user.
     *
     * This should be the encoded password. On authentication, a plain-text
     * password will be salted, encoded, and then compared to this value.
     *
     * @return string The password
     */
    public function getPassword(): ?string
    {
        return null;
    }

    /**
     * Returns the salt that was originally used to encode the password.
     *
     * This can return null if the password was not encoded using a salt.
     *
     * @return string|null The salt
     */
    public function getSalt(): ?string
    {
        return null;
    }

    /**
     * Removes sensitive data from the user.
     *
     * This is important if, at any given point, sensitive information like
     * the plain-text password is stored on this object.
     */
    public function eraseCredentials(): void
    {
    }

    /**
     * Returns the identifier for this user (e.g. its username or email address).
     */
    public function getUserIdentifier(): string
    {
        return $this->id;
    }
}