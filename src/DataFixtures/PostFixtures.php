<?php

namespace App\DataFixtures;

use App\Entity\Post;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class PostFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $post1 = (new Post())
            ->setInstaId('BvcfjNTomr7')
            ->setSort(0)
            ->setActivated(true);
        $manager->persist($post1);

        $post2 = (new Post())
            ->setInstaId('BxxRuCWih__')
            ->setSort(1)
            ->setActivated(true);
        $manager->persist($post2);

        $post3 = (new Post())
            ->setInstaId('Bx75052iuBA')
            ->setSort(2)
            ->setActivated(true);
        $manager->persist($post3);

        $manager->flush();
    }
}
