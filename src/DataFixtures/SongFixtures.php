<?php

namespace App\DataFixtures;

use App\Entity\Song;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class SongFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $song1 = (new Song())
            ->setSoundcloudId('806509507')
            ->setName('Malaa - Bling Bling (20E Remix)')
            ->setImage('https://i1.sndcdn.com/artworks-srWVDyeBJcf9OpCr-48zQ5A-t200x200.jpg')
            ->setActivated(true);
        $manager->persist($song1);

        $song2 = (new Song())
            ->setSoundcloudId('806510212')
            ->setName('The Partysquad & Boaz - Oh My (20E Remix)')
            ->setImage('https://i1.sndcdn.com/artworks-QionKIxYuMDtkAlw-5gGFUA-t200x200.jpg')
            ->setActivated(true);
        $manager->persist($song2);

        $song3 = (new Song())
            ->setSoundcloudId('807610501')
            ->setName('Vicetone & Tony Igy - Astronomia (20E Remix)')
            ->setImage('https://i1.sndcdn.com/artworks-DlQfTX5kuid45QKi-ou2Lbw-t200x200.jpg')
            ->setActivated(true);
        $manager->persist($song3);

        $manager->flush();
    }
}
