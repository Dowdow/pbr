<?php

namespace App\Service;

use App\Entity\Post;
use App\Entity\Song;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

class Redux extends \Twig_Extension
{
    /** @var ContainerInterface */
    private $container;
    /** @var EntityManagerInterface */
    private $entityManager;

    /**
     * Redux constructor.
     * @param ContainerInterface $container
     * @param EntityManagerInterface $entityManager
     */
    public function __construct(ContainerInterface $container, EntityManagerInterface $entityManager)
    {
        $this->container = $container;
        $this->entityManager = $entityManager;
    }

    /**
     * @return array
     */
    public function getTwitchConnectState(): array
    {
        $token = $this->container->get('security.token_storage')->getToken();
        if ($token) {
            return [
                'name' => $token->getUser()->getUsername(),
                'picture' => $token->getUser()->getPicture(),
                'score' => $token->getUser()->getScore()
            ];
        }
        return [
            'email' => '',
            'picture' => '',
            'score' => 0
        ];
    }

    /**
     * @return array
     */
    public function getRanking(): array
    {
        $ranking = [];
        $users = $this->entityManager->getRepository(User::class)->findRanking();
        foreach ($users as $user) {
            $ranking[] = [
                'name' => $user->getUsername(),
                'score' => $user->getScore()
            ];
        }
        return $ranking;
    }

    /**
     * @return array
     */
    public function getSongs(): array
    {
        $urls = [];
        $songs = $this->entityManager->getRepository(Song::class)->findBy(['activated' => true], ['id' => 'desc']);
        foreach ($songs as $song) {
            $urls[] = $song->getUrl();
        }
        return $urls;
    }

    /**
     * @return array
     */
    public function getPosts(): array
    {
        $instaIds = [];
        $posts = $this->entityManager->getRepository(Post::class)->findBy(['activated' => true], ['id' => 'desc']);
        foreach ($posts as $post) {
            $instaIds[] = $post->getInstaId();
        }
        return $instaIds;
    }

    /**
     * @return array|\Twig_Function[]
     */
    public function getFunctions(): array
    {
        return [
            'getTwitchConnectState' => new \Twig_SimpleFunction('getTwitchConnectState', [$this, 'getTwitchConnectState']),
            'getRanking' => new \Twig_SimpleFunction('getRanking', [$this, 'getRanking']),
            'getSongs' => new \Twig_SimpleFunction('getSongs', [$this, 'getSongs']),
            'getPosts' => new \Twig_SimpleFunction('getPosts', [$this, 'getPosts']),
        ];
    }

    /**
     * @return string
     */
    public function getName(): string
    {
        return 'Redux';
    }
}