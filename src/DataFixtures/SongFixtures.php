<?php

namespace App\DataFixtures;

use App\Entity\Song;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class SongFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $song1 = (new Song())
            ->setSoundcloudId('806509507')
            ->setType(Song::TYPE_TRACK)
            ->setCategory(Song::CATEGORY_SONG)
            ->setSort(0)
            ->setActivated(true)
            ->setVisual(false);
        $manager->persist($song1);

        $song2 = (new Song())
            ->setSoundcloudId('806510212')
            ->setType(Song::TYPE_TRACK)
            ->setCategory(Song::CATEGORY_SONG)
            ->setSort(1)
            ->setActivated(true)
            ->setVisual(false);
        $manager->persist($song2);

        $song3 = (new Song())
            ->setSoundcloudId('807610501')
            ->setType(Song::TYPE_TRACK)
            ->setCategory(Song::CATEGORY_SONG)
            ->setSort(2)
            ->setActivated(true)
            ->setVisual(false);
        $manager->persist($song3);

        $ep1 = (new Song())
            ->setSoundcloudId('915032833')
            ->setType(Song::TYPE_PLAYLIST)
            ->setCategory(Song::CATEGORY_EP)
            ->setSort(0)
            ->setActivated(true)
            ->setVisual(false);
        $manager->persist($ep1);

        $mix1 = (new Song())
            ->setSoundcloudId('584304492')
            ->setType(Song::TYPE_TRACK)
            ->setCategory(Song::CATEGORY_MIX)
            ->setSort(0)
            ->setActivated(true)
            ->setVisual(false);
        $manager->persist($mix1);

        $manager->flush();
    }
}
