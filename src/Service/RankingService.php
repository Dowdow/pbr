<?php

namespace App\Service;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;

class RankingService
{
    /** @var EntityManagerInterface */
    private $em;

    /**
     * RankingService constructor.
     * @param EntityManagerInterface $em
     */
    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    /**
     * @return array
     */
    public function getTop10()
    {
        $ranking = [];
        $users = $this->em->getRepository(User::class)->findRanking();
        foreach ($users as $user) {
            $ranking[] = [
                'name' => $user->getUsername(),
                'score' => $user->getScore()
            ];
        }
        return $ranking;
    }
}