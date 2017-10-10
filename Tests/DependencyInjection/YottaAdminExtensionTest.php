<?php

namespace YottaCms\Bundle\YottaAdminBundle\Tests\DependencyInjection;

use PHPUnit\Framework\TestCase;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use YottaCms\Bundle\YottaAdminBundle\DependencyInjection\YottaAdminExtension;

class YottaAdminExtensionTest extends TestCase
{
    /** @var ContainerBuilder */
    protected $configuration;

    public function testLoadFormServiceWithDefaults()
    {
        $this->createEmptyConfiguration();   
        $this->assertHasDefinition('YottaCms\Bundle\YottaAdminBundle\EventListener\AdminToolbarListener');
        $this->assertHasDefinition('YottaCms\Bundle\YottaAdminBundle\Controller\DefaultController');
    }
    
    protected function createEmptyConfiguration()
    {
        $this->configuration = new ContainerBuilder();
        $loader = new YottaAdminExtension();
        $config = $this->getEmptyConfig();
        $loader->load(array($config), $this->configuration);
    }
    
    /**
     * @param string $id
     */
    protected function assertHasDefinition($id)
    {
        $this->assertTrue(($this->configuration->hasDefinition($id) ?: $this->configuration->hasAlias($id)));
    }
    
    /**
     * getEmptyConfig.
     *
     * @return array
     */
    protected function getEmptyConfig()
    {
        return array();
    }
}
