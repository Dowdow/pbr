<?php

namespace App\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class AdminController
 * @package App\Controller
 *
 * @Route(schemes={"%protocol%"})
 */
class AdminController extends AbstractController
{
    /**
     * @Route("/admin", name="admin")
     * @IsGranted("IS_AUTHENTICATED_FULLY")
     * @IsGranted("TWITCH_ID")
     *
     * @return Response
     */
    public function adminAction(): Response
    {
        return $this->render('admin/admin.html.twig');
    }
}