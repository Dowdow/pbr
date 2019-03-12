<?php

namespace App\Service;

use App\Entity\Post;
use App\Entity\Song;
use App\Entity\Video;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

class Redux extends \Twig_Extension
{
    /** @var ContainerInterface */
    private $container;
    /** @var EntityManagerInterface */
    private $entityManager;
    /** @var RankingService */
    private $rankingService;

    /**
     * Redux constructor.
     * @param ContainerInterface $container
     * @param EntityManagerInterface $entityManager
     * @param RankingService $rankingService
     */
    public function __construct(ContainerInterface $container, EntityManagerInterface $entityManager, RankingService $rankingService)
    {
        $this->container = $container;
        $this->entityManager = $entityManager;
        $this->rankingService = $rankingService;
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
        return $this->rankingService->getTop10();
    }

    /**
     * @return array
     */
    public function getSongs(): array
    {
        $urls = [];
        $songs = $this->entityManager->getRepository(Song::class)->findBy([
            'activated' => true,
            'category' => Song::CATEGORY_SONG
        ], [
            'sort' => 'desc'
        ]);
        foreach ($songs as $song) {
            $urls[] = $song->getSoundcloudId();
        }
        return $urls;
    }

    /**
     * @return array
     */
    public function getMixes(): array
    {
        $urls = [];
        $mixes = $this->entityManager->getRepository(Song::class)->findBy([
            'activated' => true,
            'category' => Song::CATEGORY_MIX
        ], [
            'sort' => 'desc'
        ]);
        foreach ($mixes as $mix) {
            $urls[] = $mix->getSoundcloudId();
        }
        return $urls;
    }

    /**
     * @return array
     */
    public function getPosts(): array
    {
        $instaIds = [];
        $posts = $this->entityManager->getRepository(Post::class)->findBy(['activated' => true], ['sort' => 'desc']);
        foreach ($posts as $post) {
            $instaIds[] = $post->getInstaId();
        }
        return $instaIds;
    }

    /**
     * @return array
     */
    public function getVideos(): array
    {
        $youtubeIds = [];
        $videos = $this->entityManager->getRepository(Video::class)->findBy(['activated' => true], ['sort' => 'desc']);
        foreach ($videos as $video) {
            $youtubeIds[] = $video->getYoutubeId();
        }
        return $youtubeIds;
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
            'getMixes' => new \Twig_SimpleFunction('getMixes', [$this, 'getMixes']),
            'getPosts' => new \Twig_SimpleFunction('getPosts', [$this, 'getPosts']),
            'getVideos' => new \Twig_SimpleFunction('getVideos', [$this, 'getVideos']),
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