<?php

namespace YottaCms\Bundle\YottaAdminBundle\DependencyInjection;

use Symfony\Component\Config\Definition\Builder\TreeBuilder;
use Symfony\Component\Config\Definition\ConfigurationInterface;

class Configuration implements ConfigurationInterface
{
    /**
     * {@inheritdoc}
     */
    public function getConfigTreeBuilder()
    {
        $treeBuilder = new TreeBuilder();
        $rootNode = $treeBuilder->root('yotta_admin');

        $rootNode
            ->children()
                ->booleanNode('enabled')->defaultValue(true)->end()
                ->end()
            ->end();

        return $treeBuilder;
    }
}
