<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AppController extends Controller
{
    /**
     * @Route("/", name="home")
     */
    public function homeAction(): Response
    {
        return $this->render('base.html.twig');
    }

    /**
     * @Route("/songs", name="songs")
     */
    public function songsAction(): Response
    {
        return $this->render('base.html.twig');
    }

    /**
     * @Route("/live", name="live")
     */
    public function liveAction(): Response
    {
        return $this->render('base.html.twig');
    }

    /**
     * @Route("/shop", name="shop")
     */
    public function shopAction(): Response
    {
        return $this->render('base.html.twig');
    }
}