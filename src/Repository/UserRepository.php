<?php

namespace App\Repository;

use App\Entity\User;
use Doctrine\ORM\EntityRepository;

class UserRepository extends EntityRepository
{
    /**
     * @return User[]
     */
    public function findRanking(): array
    {
        return $this->createQueryBuilder('u')
            ->orderBy('u.score', 'desc')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult();
    }
}