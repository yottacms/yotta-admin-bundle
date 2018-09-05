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
        return $this->preloadBundles($bundles);
    }
    // ...
}
```
```YAML
# app/config/routing.yml
# ...
yotta_admin:
    resource: '@YottaAdminBundle/Resources/config/routing.yml'
```
```Bash
# and one more thing...
php bin/console assets:install
```

## Default configuration
```YAML
# app/config/config.yml
# ...
yotta_admin:
    enabled: true
    templating:
        use_react_library: true # automatic insert js libraries for React in output html
```
