<?php

namespace YottaCms\Bundle\YottaAdminBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

use YottaCms\Bundle\YottaUnitBundle\UnitManager\Manager;

/**
 * @Route("/yotta")
 */
class DefaultController extends Controller
{
    /**
     * @Route("/bootstrap", name="yottaadmin_bootstrap")
     */
    public function bootstrapAction(Manager $units)
    {
        $returnArray = [
            'url'       => '/bundles/yottaadmin/build/js/app.js',
            'title'    => 'Yotta.Admin',
            'bundle'    => [],
            'widget'    => [],
            'system'    => [],
        ];

        foreach ($units->list() as $unitStruct) {
            
            $unit = $unitStruct->unit;
            
            array_push($returnArray[$unit->getType()], array(
                'name'  => $unit->getName(),
                'description'  => $unit->getDescription(),
                'url'  => $unit->getEntryPoint(),
                'icon'  => $unit->getConfig()['icon'] ?? false,
                'developer'  => $unit->getConfig()['developer'] ?? false,
            ));
            
        }

        return new JsonResponse($returnArray);
    }
    
}
