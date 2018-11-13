<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class SoundcloudController
 * @package App\Controller
 *
 * @Route(schemes={"%protocol%"})
 */
class SoundcloudController extends Controller
{
    /**
     * @Route("/api/tracks", name="soundcloud_tracks")
     */
    public function tracksAction(): JsonResponse
    {
        $tracks = [];
        return new JsonResponse($tracks);
    }

}