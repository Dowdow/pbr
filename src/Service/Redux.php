<?php

namespace App\Service;

use App\Entity\Song;
use App\Entity\Transition;
use App\Entity\User;
use App\Entity\Video;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\Security;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class Redux extends AbstractExtension
{
    /** @var TokenStorageInterface */
    private TokenStorageInterface $tokenStorage;

    /** @var EntityManagerInterface */
    private EntityManagerInterface $entityManager;

    /** @var RankingService */
    private RankingService $rankingService;

    /** @var Security */
    private Security $security;

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
    ) {
        $this->tokenStorage = $tokenStorage;
        $this->entityManager = $entityManager;
        $this->rankingService = $rankingService;
        $this->security = $security;
    }

    /**
     * Get the json encoded pre loaded redux state
     *
     * @return string
     */
    public function getPreLoadedState(): string
    {
        $state = [
            'admin' => $this->security->isGranted('TWITCH_ID'),
            'rank' => $this->rankingService->getTop10(),
            'user' => false,
            'songs' => [],
            'videos' => [],
            'transitions' => [],
        ];

        $token = $this->tokenStorage->getToken();
        if ($token !== null) {
            $user = $token->getUser();
            if ($user instanceof User) {
                $state['user'] = [
                    'name' => $user->getUsername(),
                    'picture' => $user->getPicture(),
                    'score' => $user->getScore(),
                ];
            }
        }

        $i = 0;
        $songs = $this->entityManager->getRepository(Song::class)->findBy(['activated' => true,], ['createdAt' => 'desc']);
        foreach ($songs as $song) {
            $state['songs'][] = [
                'id' => $song->getSoundcloudId(),
                'name' => $song->getName(),
                'image' => $song->getImage(),
                'order' => $i,
                'plays' => 0,
            ];
            $i++;
        }

        $videos = $this->entityManager->getRepository(Video::class)->findBy(['activated' => true], ['sort' => 'desc']);
        foreach ($videos as $video) {
            $state['videos'][] = $video->getYoutubeId();
        }

        $transitions = $this->entityManager->getRepository(Transition::class)->findBy([], ['id' => 'desc']);
        foreach ($transitions as $transition) {
            $state['transitions'][] = [
                'file' => '/transitions/' . $transition->getFileName(),
                'plays' => 0,
            ] ;
        }

        return json_encode($state);
    }

    /**
     * @return array|TwigFunction[]
     */
    public function getFunctions(): array
    {
        return [
            'getPreLoadedState' => new TwigFunction('getPreLoadedState', [$this, 'getPreLoadedState']),
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
