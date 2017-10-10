<?php

namespace YottaCms\Bundle\YottaAdminBundle\Tests\Controller;

use PHPUnit\Framework\TestCase;
use Symfony\Bundle\WebProfilerBundle\Csp\ContentSecurityPolicyHandler;
use Symfony\Component\HttpKernel\Profiler\Profile;
use Symfony\Component\HttpFoundation\Request;
use YottaCms\Bundle\YottaUnitBundle\UnitManager\Manager;
use YottaCms\Bundle\YottaUnitBundle\UnitManager\UnitInterface;
use YottaCms\Bundle\YottaAdminBundle\Controller\DefaultController;

class DefaultControllerTest extends TestCase
{
    /**
     * @dataProvider getFakeUnitList
     */
    public function testBootstrap($unitList, $expected)
    {
        $container = $this->createMock('\Symfony\Component\DependencyInjection\ContainerInterface');
        $managerMock = $this->createMock(Manager::class);
        
        $managerMock
            ->expects($this->any())
            ->method('list')
            ->will($this->returnValue($unitList))
        ;
            
        $controller = new DefaultController();
        $controller->setContainer($container);
        $response = $controller->bootstrapAction($managerMock);
        
        $this->assertEquals($response->getContent(), $expected);
    }
    
    public function getFakeUnitList() 
    {
        $unitMock = $this->createMock(UnitInterface::class);
        
        $unitMock->method('getType')->willReturn('bundle');
        $unitMock->method('getEntryPoint')->willReturn(null);
        $unitMock->method('getConfig')->willReturn(array());
        $unitMock->method('getDescription')->willReturn(null);
        $unitMock->method('getName')->willReturn('FakeUnit');
        
        $itemUnit = new \stdClass();
        $itemUnit->priority = 0;
        $itemUnit->unit = $unitMock;
        
        return [[
            array($itemUnit),
            '{"url":"\/bundles\/yottaadmin\/build\/js\/app.js","title":"YottaCMS.Admin","bundle":[{"name":"FakeUnit","description":null,"url":null,"icon":false}],"widget":[],"system":[]}'
        ]];
    }
}
