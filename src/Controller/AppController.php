<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class AppController
 * @package App\Controller
 *
 * @Route(schemes={"%protocol%"})
 */
class AppController extends AbstractController
{
    /**
     * @Route("/", name="home", host="%base_host%")
     */
    public function homeAction(): Response
    {
        return $this->render('base.html.twig');
    }

    /**
     * @Route("/", name="shop", host="%shop_host%")
     */
    public function shopAction(): Response
    {
        return $this->render('shop.html.twig');
    }

    /**
     * @Route("/", name="vr", host="%vr_host%")
     */
    public function vrAction(): Response
    {
        return $this->render('vr.html.twig');
    }
}
