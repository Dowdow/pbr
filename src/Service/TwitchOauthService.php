<?php

namespace App\Service;

use GuzzleHttp\Exception\GuzzleException;
use Symfony\Component\DependencyInjection\ContainerInterface;

class TwitchOauthService
{
    /**
     * @var Caller
     */
    private $caller;
    /**
     * @var ContainerInterface
     */
    private $container;
    /**
     * Constructor
     * @param Caller $caller
     * @param ContainerInterface $container
     */
    public function __construct(Caller $caller, ContainerInterface $container) {
        $this->caller = $caller;
        $this->container = $container;
    }

    /**
     * @param $authorization_code string
     * @param $state string
     * @return mixed
     * @throws GuzzleException
     */
    public function getAccessToken($authorization_code, $state) {
        $request = $this->container->getParameter('url')['base_auth'] . $this->container->getParameter('url')['oauth']['token'];
        $twitchParameters = $this->container->getParameter('twitch');
        return $this->caller->post($request, [
            'client_id' =>$twitchParameters['client_id'],
            'client_secret' => $twitchParameters['client_secret'],
            'grant_type' => 'authorization_code',
            'redirect_uri' => $twitchParameters['redirect'],
            'code' => $authorization_code,
            'state' => $state
        ]);
    }
}