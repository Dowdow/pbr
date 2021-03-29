<?php

namespace App\Service;

use Exception;
use Symfony\Component\Cache\Adapter\FilesystemAdapter;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class TwitchService
{
    /** @var HttpClientInterface */
    private $httpClient;

    /** @var array */
    private $twitchParameters;

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

    /**
     * @return mixed
     */
    public function isStreamOnline(): bool
    {
        $cache = new FilesystemAdapter();
        try {
            $isOnline = $cache->getItem('stream.is_online');
        } catch (Exception $e) {
            return false;
        }

        if ($isOnline->isHit()) {
            return $isOnline->get();
        }

        $response = $this->httpClient->request(
            'GET',
            'https://api.twitch.tv/helix/streams?user_login=painboudinrecord',
            ['headers' => ['Client-ID' => $this->twitchParameters['client_id']]]
        );

        $stream = json_decode($response->getContent(), true);

        if ($stream === null || empty($stream['data'])) {
            $isOnline->set(false);
        } else {
            $isOnline->set(true);
        }

        $isOnline->expiresAfter(600);
        $cache->save($isOnline);

        return $isOnline->get();
    }
}
