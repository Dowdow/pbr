<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Csrf\CsrfTokenManagerInterface;

/**
 * Class TwitchController
 * @package App\Controller
 *
 * @Route(schemes={"%protocol%"})
 */
class TwitchController extends AbstractController
{
    /**
     * @Route("/authorize", name="oauth_authorize", host="%base_host%")
     *
     * @param Request $request
     * @param CsrfTokenManagerInterface $csrfTokenManager
     * @return RedirectResponse
     */
    public function oauthAuthorizeAction(Request $request, CsrfTokenManagerInterface $csrfTokenManager): RedirectResponse
    {
        if ($request->getMethod() === Request::METHOD_POST) {
            $twitchParameters = $this->getParameter('twitch');

            return $this->redirect(
                'https://id.twitch.tv/oauth2/authorize?response_type=code' .
                    '&client_id=' . $twitchParameters['client_id'] .
                    '&redirect_uri=' . $twitchParameters['redirect'] .
                    '&scope=' . implode(' ', $twitchParameters['scope']) .
                    '&state=' . $csrfTokenManager->refreshToken('oauth_authorize_state')->getValue()
            );
        }

        return $this->redirect($this->generateUrl('live'));
    }

    /**
     * @Route("/oauthcallback", name="oauth_callback", host="%base_host%")
     *
     * @return RedirectResponse
     */
    public function oauthCallbackAction(): RedirectResponse
    {
        return $this->redirect($this->generateUrl('live'));
    }
}
