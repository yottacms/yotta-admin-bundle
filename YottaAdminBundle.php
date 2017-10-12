<?php

namespace YottaCms\Bundle\YottaAdminBundle;

use Symfony\Component\HttpKernel\Bundle\Bundle;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\Config\FileLocator;
use Symfony\Component\DependencyInjection\Loader;

class YottaAdminBundle extends Bundle
{
    
    public function build(ContainerBuilder $container)
    {
        parent::build($container);

        $loader = new Loader\YamlFileLoader($container, new FileLocator($this->getPath().'/Resources/config/'));
        $loader->load('config.yml');

    }
    
    public function registerBundles() {
        return [
            \YottaCms\Bundle\YottaUnitBundle\YottaUnitBundle::class,
            \YottaCms\Bundle\YottaRouterBundle\YottaRouterBundle::class
        ];
    }
    
}
