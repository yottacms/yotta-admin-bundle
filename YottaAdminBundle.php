<?php

namespace YottaCms\Bundle\YottaAdminBundle;

use Symfony\Component\HttpKernel\Bundle\Bundle;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\Config\FileLocator;
use Symfony\Component\DependencyInjection\Loader;

class YottaAdminBundle extends Bundle
{
    public function registerBundles() {
        return [
            \YottaCms\Bundle\YottaUnitBundle\YottaUnitBundle::class,
            \YottaCms\Bundle\YottaRouterBundle\YottaRouterBundle::class
        ];
    }
    
}
