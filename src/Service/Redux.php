<?php

namespace App\Service;

use Symfony\Component\DependencyInjection\ContainerInterface;

class Redux extends \Twig_Extension
{
    /** @var ContainerInterface */
    private $container;

    /**
     * Redux constructor.
     * @param ContainerInterface $container
     */
    public function __construct(ContainerInterface $container)
    {
        $this->container = $container;
    }

    /**
     * @return array
     */
    public function getTwitchConnectState(): array
    {
        $token = $this->container->get('security.token_storage')->getToken();
        if ($token) {
            return [
                'name' => $token->getUser()->getUsername(),
                'picture' => $token->getUser()->getPicture(),
                'score' => $token->getUser()->getScore()
            ];
        }
        return [
            'email' => '',
            'picture' => '',
            'score' => 0
        ];
    }

    /**
     * @return array|\Twig_Function[]
     */
    public function getFunctions(): array
    {
        return [
            'getTwitchConnectState' => new \Twig_SimpleFunction('getTwitchConnectState', [$this, 'getTwitchConnectState'])
        ];
    }

    /**
     * @return string
     */
    public function getName(): string
    {
        return 'Redux';
    }
}