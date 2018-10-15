<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class TwitchController extends Controller
{
    /**
     * @Route("/authorize", name="oauth_authorize")
     *
     * @param Request $request
     * @return mixed
     */
    public function oauthAuthorizeAction(Request $request)
    {
        if ($request->getMethod() === Request::METHOD_POST) {
            $csrf = $this->get('security.csrf.token_manager');
            $twitchParameters = $this->container->getParameter('twitch');
            return $this->redirect(
                'https://id.twitch.tv/oauth2/authorize?response_type=code' .
                '&client_id=' . $twitchParameters['client_id'] .
                '&redirect_uri=' . $twitchParameters['redirect'] .
                '&scope=' . implode('+', $twitchParameters['scope']) .
                '&state=' . $csrf->refreshToken('oauth_authorize_state')->getValue()
            );
        }
        return $this->redirect($this->generateUrl('live'));
    }

    /**
     * @Route("/oauthcallback", name="oauth_callback")
     *
     * @return RedirectResponse
     */
    public function oauthCallbackAction(): RedirectResponse
    {
        return $this->redirect($this->generateUrl('live'));
    }
}