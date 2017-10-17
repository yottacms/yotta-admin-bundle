<?php

namespace YottaCms\Bundle\YottaAdminBundle\Tests\DependencyInjection;

use Symfony\Component\Config\Definition\Processor;
use PHPUnit\Framework\TestCase;
use YottaCms\Bundle\YottaAdminBundle\DependencyInjection\Configuration;

class ConfigurationTest extends TestCase
{
    public function testDefaultConfig()
    {
        $processor = new Processor();
        $config = $processor->processConfiguration(new Configuration(true), [[
            'enabled'       => true,
            'templating'    => array(
                'use_react_library' => false
            )
        ]]);
        
        $this->assertEquals(
            array(
                'enabled'       => true,
                'templating'    => array(
                    'use_react_library' => false
                )
            ),
            $config
        );
    }
}
