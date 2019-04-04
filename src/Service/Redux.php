<?php

namespace App\Service;

use App\Entity\Post;
use App\Entity\Song;
use App\Entity\Video;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\Security;
use Twig_Extension;
use Twig_Function;
use Twig_SimpleFunction;

class Redux extends Twig_Extension
{
    /** @var TokenStorageInterface */
    private $tokenStorage;
    /** @var EntityManagerInterface */
    private $entityManager;
    /** @var RankingService */
    private $rankingService;
    /** @var Security */
    private $security;

    /**
     * Redux constructor.
     * @param TokenStorageInterface $tokenStorage
     * @param EntityManagerInterface $entityManager
     * @param RankingService $rankingService
     * @param Security $security
     */
    public function __construct(
        TokenStorageInterface $tokenStorage,
        EntityManagerInterface $entityManager,
        RankingService $rankingService,
        Security $security
    )
    {
        $this->tokenStorage = $tokenStorage;
        $this->entityManager = $entityManager;
        $this->rankingService = $rankingService;
        $this->security = $security;
    }

    /**
     * @return array
     */
    public function getTwitchConnectState(): array
    {
        $token = $this->tokenStorage->getToken();
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
        $songObjs = [];
        $songs = $this->entityManager->getRepository(Song::class)->findBy([
            'activated' => true,
            'category' => Song::CATEGORY_SONG
        ], [
            'sort' => 'desc'
        ]);
        foreach ($songs as $song) {
            $songObjs[] = [
                'id' => $song->getSoundcloudId(),
                'type' => $song->getType(),
                'visual' => $song->isVisual(),
            ];
        }
        return $songObjs;
    }

    /**
     * @return array
     */
    public function getMixes(): array
    {
        $mixObjs = [];
        $mixes = $this->entityManager->getRepository(Song::class)->findBy([
            'activated' => true,
            'category' => Song::CATEGORY_MIX
        ], [
            'sort' => 'desc'
        ]);
        foreach ($mixes as $mix) {
            $mixObjs[] = [
                'id' => $mix->getSoundcloudId(),
                'type' => $mix->getType(),
                'visual' => $mix->isVisual(),
            ];
        }
        return $mixObjs;
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
     * @return bool
     */
    public function isAdmin(): bool
    {
        return $this->security->isGranted('TWITCH_ID');
    }

    /**
     * @return array|Twig_Function[]
     */
    public function getFunctions(): array
    {
        return [
            'getTwitchConnectState' => new Twig_SimpleFunction('getTwitchConnectState', [$this, 'getTwitchConnectState']),
            'getRanking' => new Twig_SimpleFunction('getRanking', [$this, 'getRanking']),
            'getSongs' => new Twig_SimpleFunction('getSongs', [$this, 'getSongs']),
            'getMixes' => new Twig_SimpleFunction('getMixes', [$this, 'getMixes']),
            'getPosts' => new Twig_SimpleFunction('getPosts', [$this, 'getPosts']),
            'getVideos' => new Twig_SimpleFunction('getVideos', [$this, 'getVideos']),
            'isAdmin' => new Twig_SimpleFunction('isAdmin', [$this, 'isAdmin'])
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