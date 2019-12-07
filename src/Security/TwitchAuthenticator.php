<?php

namespace App\Security;

use App\Entity\User;
use App\Service\TwitchOauthService;
use App\Service\TwitchUserService;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use GuzzleHttp\Exception\GuzzleException;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Routing\RouterInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Csrf\CsrfToken;
use Symfony\Component\Security\Csrf\CsrfTokenManagerInterface;
use Symfony\Component\Security\Guard\AbstractGuardAuthenticator;
use UnexpectedValueException;

class TwitchAuthenticator extends AbstractGuardAuthenticator
{
    /** @var EntityManagerInterface */
    private $entity_manager;

    /** @var RouterInterface */
    private $router;

    /** @var CsrfTokenManagerInterface */
    private $csrf_token_manager;

    /** @var SessionInterface */
    private $session;

    /** @var TwitchOauthService */
    private $twitch_oauth_service;

    /** @var TwitchUserService */
    private $twitch_user_service;

    /**
     * TwitchAuthenticator constructor.
     * @param EntityManagerInterface $entity_manager
     * @param RouterInterface $router
     * @param CsrfTokenManagerInterface $csrf_token_manager
     * @param SessionInterface $session
     * @param TwitchOauthService $twitch_oauth_service
     * @param TwitchUserService $twitch_user_service
     */
    public function __construct(
        EntityManagerInterface $entity_manager,
        RouterInterface $router,
        CsrfTokenManagerInterface $csrf_token_manager,
        SessionInterface $session,
        TwitchOauthService $twitch_oauth_service,
        TwitchUserService $twitch_user_service
    )
    {
        $this->entity_manager = $entity_manager;
        $this->router = $router;
        $this->csrf_token_manager = $csrf_token_manager;
        $this->session = $session;
        $this->twitch_oauth_service = $twitch_oauth_service;
        $this->twitch_user_service = $twitch_user_service;
    }

    /**
     * Returns a response that directs the user to authenticate.
     *
     * This is called when an anonymous request accesses a resource that
     * requires authentication. The job of this method is to return some
     * response that "helps" the user start into the authentication process.
     *
     * Examples:
     *
     * - For a form login, you might redirect to the login page
     *
     *     return new RedirectResponse('/login');
     *
     * - For an API token authentication system, you return a 401 response
     *
     *     return new Response('Auth header required', 401);
     *
     * @param Request $request The request that resulted in an AuthenticationException
     * @param AuthenticationException $authException The exception that started the authentication process
     *
     * @return RedirectResponse
     * @throws Exception
     */
    public function start(Request $request, AuthenticationException $authException = null): RedirectResponse
    {
        return new RedirectResponse(
            $this->router->generate('oauth_authorize', [], UrlGeneratorInterface::ABSOLUTE_PATH)
        );
    }

    /**
     * Does the authenticator support the given Request?
     *
     * If this returns false, the authenticator will be skipped.
     *
     * @param Request $request
     *
     * @return bool
     */
    public function supports(Request $request): bool
    {
        return $request->query->has('state') && $request->query->has('code');
    }

    /**
     * Get the authentication credentials from the request and return them
     * as any type (e.g. an associate array).
     *
     * Whatever value you return here will be passed to getUser() and checkCredentials()
     *
     * For example, for a form login, you might:
     *
     *      return array(
     *          'username' => $request->request->get('_username'),
     *          'password' => $request->request->get('_password'),
     *      );
     *
     * Or for an API token that's on a header, you might use:
     *
     *      return array('api_key' => $request->headers->get('X-API-TOKEN'));
     *
     * @param Request $request
     *
     * @return mixed Any non-null value
     *
     * @throws UnexpectedValueException If null is returned
     * @throws GuzzleException
     */
    public function getCredentials(Request $request)
    {
        if (!$this->csrf_token_manager->isTokenValid(new CsrfToken('oauth_authorize_state', $request->query->get('state')))) {
            return null;
        }

        $res = $this->twitch_oauth_service->getAccessToken(
            $request->query->get('code'),
            $this->csrf_token_manager->refreshToken('oauth_access_state')->getValue()
        );

        if (!isset($res['access_token'])) {
            return null;
        }

        return [
            'token' => $res['access_token']
        ];
    }

    /**
     * Return a UserInterface object based on the credentials.
     *
     * The *credentials* are the return value from getCredentials()
     *
     * You may throw an AuthenticationException if you wish. If you return
     * null, then a UsernameNotFoundException is thrown for you.
     *
     * @param mixed $credentials
     * @param UserProviderInterface $userProvider
     *
     * @return UserInterface|null
     *
     * @throws GuzzleException
     * @throws Exception
     */
    public function getUser($credentials, UserProviderInterface $userProvider): UserInterface
    {
        $twitch_user = $this->twitch_user_service->getUser($credentials['token']);
        if ($twitch_user === null) {
            return null;
        }

        $twitch_user = $twitch_user['data'][0];

        $user = $this->entity_manager->getRepository(User::class)->findOneBy(['twitchId' => $twitch_user['id']]);
        if ($user === null) {
            $user = new User(
                $twitch_user['email'] ?? $twitch_user['display_name'],
                $twitch_user['display_name'],
                $twitch_user['profile_image_url'],
                $twitch_user['id']
            );
            $this->entity_manager->persist($user);
        } else {
            $user->setEmail($twitch_user['email'] ?? $twitch_user['display_name']);
            $user->setUsername($twitch_user['display_name']);
            $user->setPicture($twitch_user['profile_image_url']);
        }
        $this->entity_manager->flush();

        $this->session->set('access_token', $credentials['token']);
        return $userProvider->loadUserByUsername($user->getEmail());
    }

    /**
     * Returns true if the credentials are valid.
     *
     * If any value other than true is returned, authentication will
     * fail. You may also throw an AuthenticationException if you wish
     * to cause authentication to fail.
     *
     * The *credentials* are the return value from getCredentials()
     *
     * @param mixed $credentials
     * @param UserInterface $user
     *
     * @return bool
     *
     * @throws AuthenticationException
     */
    public function checkCredentials($credentials, UserInterface $user): bool
    {
        return true;
    }

    /**
     * Called when authentication executed, but failed (e.g. wrong username password).
     *
     * This should return the Response sent back to the user, like a
     * RedirectResponse to the login page or a 403 response.
     *
     * If you return null, the request will continue, but the user will
     * not be authenticated. This is probably not what you want to do.
     *
     * @param Request $request
     * @param AuthenticationException $exception
     *
     * @return void
     */
    public function onAuthenticationFailure(Request $request, AuthenticationException $exception): void
    {
        throw new AccessDeniedHttpException('Your Twitch account is not verified or not valid ...');
    }

    /**
     * Called when authentication executed and was successful!
     *
     * This should return the Response sent back to the user, like a
     * RedirectResponse to the last page they visited.
     *
     * If you return null, the current request will continue, and the user
     * will be authenticated. This makes sense, for example, with an API.
     *
     * @param Request $request
     * @param TokenInterface $token
     * @param string $providerKey The provider (i.e. firewall) key
     *
     * @return Response|null
     */
    public function onAuthenticationSuccess(Request $request, TokenInterface $token, $providerKey): ?Response
    {
        return null;
    }

    /**
     * Does this method support remember me cookies?
     *
     * Remember me cookie will be set if *all* of the following are met:
     *  A) This method returns true
     *  B) The remember_me key under your firewall is configured
     *  C) The "remember me" functionality is activated. This is usually
     *      done by having a _remember_me checkbox in your form, but
     *      can be configured by the "always_remember_me" and "remember_me_parameter"
     *      parameters under the "remember_me" firewall key
     *  D) The onAuthenticationSuccess method returns a Response object
     *
     * @return bool
     */
    public function supportsRememberMe(): bool
    {
        return false;
    }
}