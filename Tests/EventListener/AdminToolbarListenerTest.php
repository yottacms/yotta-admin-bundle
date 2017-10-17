<?php

namespace YottaCms\Bundle\YottaAdminBundle\Tests\EventListener;

use PHPUnit\Framework\TestCase;
use Symfony\Component\HttpFoundation\HeaderBag;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\FilterResponseEvent;
use Symfony\Component\HttpKernel\HttpKernelInterface;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use YottaCms\Bundle\YottaAdminBundle\EventListener\AdminToolbarListener;

class AdminToolbarListenerTest extends TestCase
{
    /**
     * @dataProvider getInjectToolbarTests
     */
    public function testInjectToolbar($content, $expected)
    {
        $listener = new AdminToolbarListener($this->getTwigMock(), $this->getContainerMock());
        $m = new \ReflectionMethod($listener, 'injectToolbar');
        $m->setAccessible(true);
        
        $response = new Response($content);

        $m->invoke($listener, $response, Request::create('/'));
        $this->assertEquals($expected, $response->getContent());
    }

    public function getInjectToolbarTests()
    {
        return array(
            array('<html><head></head><body></body></html>', "<html><head></head><body>\nAdminToolbarHtml\n</body></html>"),
            array('<html>
            <head></head>
            <body>
            <textarea><html><head></head><body></body></html></textarea>
            </body>
            </html>', "<html>
            <head></head>
            <body>
            <textarea><html><head></head><body></body></html></textarea>
            \nAdminToolbarHtml\n</body>
            </html>"),
        );
    }

    public function testToolbarIsInjected()
    {
        $response = new Response('<html><head></head><body></body></html>');
        $event = new FilterResponseEvent($this->getKernelMock(), $this->getRequestMock(), HttpKernelInterface::MASTER_REQUEST, $response);
        $listener = new AdminToolbarListener($this->getTwigMock(), $this->getContainerMock());
        $listener->onKernelResponse($event);

        $this->assertEquals("<html><head></head><body>\nAdminToolbarHtml\n</body></html>", $response->getContent());
    }

    /**
     * @depends testToolbarIsInjected
     */
    public function testToolbarIsNotInjectedWhenOnSubRequest()
    {
        $response = new Response('<html><head></head><body></body></html>');
        $event = new FilterResponseEvent($this->getKernelMock(), $this->getRequestMock(), HttpKernelInterface::SUB_REQUEST, $response);
        $listener = new AdminToolbarListener($this->getTwigMock(), $this->getContainerMock());
        $listener->onKernelResponse($event);

        $this->assertEquals('<html><head></head><body></body></html>', $response->getContent());
    }

    /**
     * @depends testToolbarIsInjected
     */
    public function testToolbarIsNotInjectedOnIncompleteHtmlResponses()
    {
        $response = new Response('<div>Some content</div>');
        $event = new FilterResponseEvent($this->getKernelMock(), $this->getRequestMock(), HttpKernelInterface::MASTER_REQUEST, $response);
        $listener = new AdminToolbarListener($this->getTwigMock(), $this->getContainerMock());
        $listener->onKernelResponse($event);

        $this->assertEquals('<div>Some content</div>', $response->getContent());
    }

    /**
     * @depends testToolbarIsInjected
     */
    public function testToolbarIsNotInjectedOnXmlHttpRequests()
    {
        $response = new Response('<html><head></head><body></body></html>');
        $event = new FilterResponseEvent($this->getKernelMock(), $this->getRequestMock(true), HttpKernelInterface::MASTER_REQUEST, $response);
        $listener = new AdminToolbarListener($this->getTwigMock(), $this->getContainerMock());
        $listener->onKernelResponse($event);

        $this->assertEquals('<html><head></head><body></body></html>', $response->getContent());
    }

    /**
     * @depends testToolbarIsInjected
     */
    public function testToolbarIsNotInjectedOnNonHtmlRequests()
    {
        $response = new Response('<html><head></head><body></body></html>');
        $event = new FilterResponseEvent($this->getKernelMock(), $this->getRequestMock(false, 'json'), HttpKernelInterface::MASTER_REQUEST, $response);
        $listener = new AdminToolbarListener($this->getTwigMock(), $this->getContainerMock());
        $listener->onKernelResponse($event);

        $this->assertEquals('<html><head></head><body></body></html>', $response->getContent());
    }
    
    /**
     * @depends testToolbarIsInjected
     */
    public function testToolbarIsNotInjectedOnContentDispositionAttachment()
    {
        $response = new Response('<html><head></head><body></body></html>');
        $response->headers->set('Content-Disposition', 'attachment; filename=test.html');
        $event = new FilterResponseEvent($this->getKernelMock(), $this->getRequestMock(false, 'html'), HttpKernelInterface::MASTER_REQUEST, $response);
        $listener = new AdminToolbarListener($this->getTwigMock(), $this->getContainerMock());
        $listener->onKernelResponse($event);

        $this->assertEquals('<html><head></head><body></body></html>', $response->getContent());
    }

    protected function getRequestMock($isXmlHttpRequest = false, $requestFormat = 'html', $hasSession = true)
    {
        $request = $this->getMockBuilder('Symfony\Component\HttpFoundation\Request')->setMethods(array('getSession', 'isXmlHttpRequest', 'getRequestFormat'))->disableOriginalConstructor()->getMock();
        $request->expects($this->any())
            ->method('isXmlHttpRequest')
            ->will($this->returnValue($isXmlHttpRequest));
        $request->expects($this->any())
            ->method('getRequestFormat')
            ->will($this->returnValue($requestFormat));

        $request->headers = new HeaderBag();

        if ($hasSession) {
            $session = $this->getMockBuilder('Symfony\Component\HttpFoundation\Session\Session')->disableOriginalConstructor()->getMock();
            $request->expects($this->any())
                ->method('getSession')
                ->will($this->returnValue($session));
        }

        return $request;
    }

    protected function getTwigMock($render = 'AdminToolbarHtml')
    {
        $templating = $this->getMockBuilder('Twig\Environment')->disableOriginalConstructor()->getMock();
        $templating->expects($this->any())
            ->method('render')
            ->will($this->returnValue($render));

        return $templating;
    }

    protected function getKernelMock()
    {
        return $this->getMockBuilder('Symfony\Component\HttpKernel\Kernel')->disableOriginalConstructor()->getMock();
    }
    
    protected function getContainerMock()
    {
        return $this->getMockBuilder('Symfony\Component\DependencyInjection\Container')->disableOriginalConstructor()->getMock();
    }
}
