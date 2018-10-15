<?php

namespace App\Service;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Psr7\Request;
use Symfony\Component\DependencyInjection\ContainerInterface;

class Caller
{
    /** @var Client */
    private $guzzle;

    /**
     * Constructor
     * @param ContainerInterface $container
     */
    public function __construct(ContainerInterface $container)
    {
        $this->guzzle = new Client(['headers' => [
            'Client-ID' => $container->getParameter('twitch')['client_id']
        ]]);
    }

    /**
     * Send GET
     * @param string $uri
     * @param array $param
     * @return mixed
     * @throws GuzzleException
     */
    public function get($uri, $param = [])
    {
        $res = $this->guzzle->send(new Request('GET', $uri, $param));
        return json_decode($res->getBody(), true);
    }

    /**
     * Send POST
     * @param string $uri
     * @param array $param
     * @return mixed
     * @throws GuzzleException
     */
    public function post($uri, $param = [])
    {
        $body = '';
        foreach ($param as $k => $v) {
            $body .= $k . '=' . $v . '&';
        }
        $res = $this->guzzle->send(new Request('POST', $uri, [], $body));
        return json_decode($res->getBody(), true);
    }
}