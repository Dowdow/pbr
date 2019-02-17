<?php

namespace App\Controller;

use App\Entity\User;
use App\Service\TwitchStreamService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

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
     * @return mixed
     */
    public function oauthAuthorizeAction(Request $request)
    {
        if ($request->getMethod() === Request::METHOD_POST) {
            $csrf = $this->get('security.csrf.token_manager');
            $twitchParameters = $this->getParameter('twitch');
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
     * @Route("/oauthcallback", name="oauth_callback", host="%base_host%")
     *
     * @return RedirectResponse
     */
    public function oauthCallbackAction(): RedirectResponse
    {
        return $this->redirect($this->generateUrl('live'));
    }

    /**
     * @Route("/score", name="score", host="%base_host%")
     *
     * @param TwitchStreamService $streamService
     * @return JsonResponse
     * @throws \Exception
     */
    public function scoreAction(TwitchStreamService $streamService): JsonResponse
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');
        /** @var User $user */
        $user = $this->getUser();

        if ($streamService->isStreamOnline() && $user->getLastScoreUpdate() < (new \DateTime())->modify('-50 seconds')) {
            $user->setScore($user->getScore() + 1);
            $user->setLastScoreUpdate(new \DateTime());
            $this->getDoctrine()->getManager()->flush();
        }

        return new JsonResponse([
            'score' => $user->getScore()
        ]);
    }

}