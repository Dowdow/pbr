<?php

namespace App\Security;

use App\Entity\User;
use App\Service\TwitchService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Csrf\CsrfToken;
use Symfony\Component\Security\Csrf\CsrfTokenManagerInterface;
use Symfony\Component\Security\Http\Authenticator\AbstractAuthenticator;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Passport;
use Symfony\Component\Security\Http\Authenticator\Passport\SelfValidatingPassport;

class TwitchAuthenticator extends AbstractAuthenticator
{
    /** @var EntityManagerInterface */
    private EntityManagerInterface $entityManager;

    /** @var CsrfTokenManagerInterface */
    private CsrfTokenManagerInterface $csrfTokenManager;

    /** @var TwitchService */
    private TwitchService $twitchService;

    /**
     * TwitchAuthenticator constructor.
     * @param EntityManagerInterface $entityManager
     * @param CsrfTokenManagerInterface $csrfTokenManager
     * @param TwitchService $twitchService
     */
    public function __construct(
        EntityManagerInterface    $entityManager,
        CsrfTokenManagerInterface $csrfTokenManager,
        TwitchService             $twitchService
    )
    {
        $this->entityManager = $entityManager;
        $this->csrfTokenManager = $csrfTokenManager;
        $this->twitchService = $twitchService;
    }

    /**
     * @param Request $request
     * @return boolean|null
     */
    public function supports(Request $request): ?bool
    {
        return $request->query->has('state') && $request->query->has('code');
    }

    /**
     * @param Request $request
     * @return Passport
     */
    public function authenticate(Request $request): Passport
    {
        if (!$this->csrfTokenManager->isTokenValid(new CsrfToken('oauth_authorize_state', $request->query->get('state')))) {
            throw new AuthenticationException('');
        }

        $res = $this->twitchService->getAccessToken(
            $request->query->get('code'),
            $this->csrfTokenManager->refreshToken('oauth_access_state')->getValue()
        );

        if (!isset($res['access_token'])) {
            throw new AuthenticationException('');
        }

        $accessToken = $res['access_token'];

        $twitchUser = $this->twitchService->getUser($accessToken);
        if ($twitchUser === null) {
            throw new AuthenticationException('');
        }

        $twitchUser = $twitchUser['data'][0];

        $user = $this->entityManager->getRepository(User::class)->findOneBy(['twitchId' => $twitchUser['id']]);
        if ($user === null) {
            $user = new User(
                $twitchUser['email'] ?? $twitchUser['display_name'],
                $twitchUser['display_name'],
                $twitchUser['profile_image_url'],
                $twitchUser['id']
            );
            $this->entityManager->persist($user);
        } else {
            $user->setEmail($twitchUser['email'] ?? $twitchUser['display_name']);
            $user->setUsername($twitchUser['display_name']);
            $user->setPicture($twitchUser['profile_image_url']);
        }

        $this->entityManager->flush();

        return new SelfValidatingPassport(
            new UserBadge($user->getEmail())
        );
    }

    /**
     * @param Request $request
     * @param TokenInterface $token
     * @param string $firewallName
     * @return Response|null
     */
    public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $firewallName): ?Response
    {
        return null;
    }

    /**
     * @param Request $request
     * @param AuthenticationException $exception
     * @return Response|null
     */
    public function onAuthenticationFailure(Request $request, AuthenticationException $exception): ?Response
    {
        throw new AccessDeniedHttpException('Your Twitch account is not verified or not valid ...');
    }
}
