<?php

namespace App\DataFixtures;

use App\Entity\Video;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class VideoFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $video1 = (new Video())
            ->setYoutubeId('AZEHOuhgwg4')
            ->setSort(0)
            ->setActivated(true);
        $manager->persist($video1);

        $video2 = (new Video())
            ->setYoutubeId('l_xi02AMH-c')
            ->setSort(1)
            ->setActivated(true);
        $manager->persist($video2);

        $manager->flush();
    }
}
