# YottaCMS admin
Скелет панели администратора

## Installation
```Bash
composer require yottacms/yotta-admin-bundle
```
```PHP    
// app/AppKernel.php
use YottaCms\Framework\Component\HttpKernel\Kernel;
// ...

class AppKernel extends Kernel
{
    public function registerBundles()
    {
        $bundles = array(
            // ...
            \YottaCms\Bundle\YottaAdminBundle\YottaAdminBundle::class
        );
        // ...
    }
    // ...
}
```
```YAML
# app/config/routing.yml
# ...
yottadmin:
    resource: '@YottaAdminBundle/Resources/config/routing.yml'
```
```Bash
# and one more thing...
php bin/console assets:install
```
