<?php

namespace App\Service;

use GuzzleHttp\Exception\GuzzleException;
use Symfony\Component\DependencyInjection\ContainerInterface;

class TwitchUserService
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
     * @param $token
     * @return mixed
     * @throws GuzzleException
     */
    public function getUser($token)
    {
        return $this->caller->get(
            $this->container->getParameter('url')['base_api'] . $this->container->getParameter('url')['user'],
            ['Authorization' => 'Bearer ' . $token]
        );
    }
}