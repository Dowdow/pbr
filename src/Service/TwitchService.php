<?php

namespace App\Service;

use Symfony\Contracts\HttpClient\HttpClientInterface;

class TwitchService
{
    /** @var HttpClientInterface */
    private HttpClientInterface $httpClient;

    /** @var array */
    private array $twitchParameters;

    /**
     * TwitchService constructor.
     *
     * @param HttpClientInterface $httpClient
     * @param array $twitchParameters
     */
    public function __construct(HttpClientInterface $httpClient, array $twitchParameters)
    {
        $this->httpClient = $httpClient;
        $this->twitchParameters = $twitchParameters;
    }

    /**
     * @param string $authorization_code
     * @param string $state
     * @return mixed
     */
    public function getAccessToken(string $authorization_code, string $state)
    {
        $response = $this->httpClient->request(
            'POST',
            'https://id.twitch.tv/oauth2/token' .
            '?client_id=' . $this->twitchParameters['client_id'] .
            '&client_secret=' . $this->twitchParameters['client_secret'] .
            '&grant_type=' . 'authorization_code' .
            '&redirect_uri=' . $this->twitchParameters['redirect'] .
            '&code=' . $authorization_code .
            '&state=' . $state
        );

        return json_decode($response->getContent(), true);
    }

    /**
     * @param $token
     * @return array
     */
    public function getUser($token): array
    {
        $response = $this->httpClient->request(
            'GET',
            'https://api.twitch.tv/helix/users',
            ['headers' => ['Authorization' => 'Bearer ' . $token, 'Client-Id' => $this->twitchParameters['client_id']]]
        );

        return json_decode($response->getContent(), true);
    }
}
