<?php

namespace App\Service;

use Exception;
use GuzzleHttp\Exception\GuzzleException;
use Symfony\Component\Cache\Adapter\FilesystemAdapter;
use Symfony\Component\DependencyInjection\ContainerInterface;

class TwitchStreamService
{
    /** @var Caller */
    private $caller;

    /** @var ContainerInterface */
    private $container;

    /**
     * Constructor
     * @param Caller $caller
     * @param ContainerInterface $container
     */
    public function __construct(Caller $caller, ContainerInterface $container)
    {
        $this->caller = $caller;
        $this->container = $container;
    }

    /**
     * @return mixed
     */
    public function isStreamOnline()
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

        try {
            $uri = $this->container->getParameter('url')['base_api'] . $this->container->getParameter('url')['stream'];
            $uri .= '?user_login=painboudinrecord';
            $stream = $this->caller->get($uri, ['Client-ID' => $this->container->getParameter('twitch')['client_id']]);
        } catch (GuzzleException $e) {
            $stream = null;
        }

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