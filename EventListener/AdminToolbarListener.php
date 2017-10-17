<?php

namespace YottaCms\Bundle\YottaAdminBundle\EventListener;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\FilterResponseEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\DependencyInjection\Container;
use Twig\Environment;

class AdminToolbarListener implements EventSubscriberInterface
{
    protected $twig;
    protected $container;

    public function __construct(Environment $twig, Container $container)
    {
        $this->container = $container;
        $this->twig = $twig;
    }

    public function onKernelResponse(FilterResponseEvent $event)
    {
        $response = $event->getResponse();
        $request = $event->getRequest();
        
        if (!$event->isMasterRequest()
            || $request->isXmlHttpRequest()
            || $response->isRedirection()
            || ($response->headers->has('Content-Type') && false === strpos($response->headers->get('Content-Type'), 'html'))
            || 'html' !== $request->getRequestFormat()
            || false !== stripos($response->headers->get('Content-Disposition'), 'attachment;')
        ) {
            return;
        }

        $this->injectToolbar($response, $request);
    }

    /**
     * Injects the admin toolbar into the given Response.
     */
    protected function injectToolbar(Response $response, Request $request)
    {
        $content = $response->getContent();
        $pos = strripos($content, '</body>');

        if (false !== $pos) {
            $toolbar = "\n".$this->twig->render('@YottaAdmin/Toolbal/toolbar.html.twig', array(
                'use_react_library' => $this->container->getParameter('yotta_admin')['templating']['use_react_library']
            ))."\n";
            $content = substr($content, 0, $pos).$toolbar.substr($content, $pos);
            $response->setContent($content);
        }
    }

    public static function getSubscribedEvents()
    {
        return array(
            KernelEvents::RESPONSE => array('onKernelResponse', -64),
        );
    }
}
