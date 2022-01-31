# Theme

My purpose is that you have a default theme.
Then you can create multiple theme css files.

```
sass
|- site/
   |- core
      |- components
         |- ***
      |- ***
|- hkui.scss
|- theme.config
|- theme.scss
|- themes
   |- core
      |- components
          |- card
              |- _card.scss
|- core
   |- components
      |- card
         |- _card.scss
```

## Config Files
filename | usage | Initial Name
--- | --- | ---
**theme.config** | config file that stores each element's current theme for SASS | theme.config.example
**site/** | folder storing all your site's variables and css overrides for each UI component | _site/

## Inheritance

There are three levels of inheritance in Semantic
* Default theme - UI's neutral default theme
* Packaged theme - A specified packaged theme, like "amazon", or "material"
* Site theme - A theme specific to your site

# Grid

## Grid classes vs. unit classes
Grid class `hk-g`
Unit class `hk-u-*`

## The width of units are fractional
- `hk-u-1-2` has a width of 50%
- `hk-u-1-5` has a width of 20%

```html
<div class="hk-g">
    <div class="hk-u-1-3"><p>Thirds</p></div>
    <div class="hk-u-1-3"><p>Thirds</p></div>
    <div class="hk-u-1-3"><p>Thirds</p></div>
</div>
```

# Responsive Grids

```html
<div class="hk-g">
    <div class="hk-u-1 hk-u-md-1-3"> ... </div>
    <div class="hk-u-1 hk-u-md-1-3"> ... </div>
    <div class="hk-u-1 hk-u-md-1-3"> ... </div>
</div>
```

| Key | CSS Media Query | Applies | Classname
| --- | --- | --- | --- |
| `sm` | `@media screen and (min-width: 35.5em)` | `>= 565px` | `.hk-u-sm-*`
| `md` | `@media screen and (min-width: 48em)` | `>= 768px` | `.hk-u-md-*`
| `lg` | `@media screen and (min-width: 64em)` | `>= 1024px` | `.hk-u-lg-*`
| `xl` | `@media screen and (min-width: 80em)` | `>= 1280px` | `.hk-u-xl-*`

# Nav Bar

# Menu

Menu is a vertical list of navigational links.

A list of main component:
- Menu
- SubMenu
- MenuList
- MenuHeader
- MenuDivider
- MenuFooter
- MenuItem

```html
<div class="hk1-menu">
   <li class="hk1-menu-header"><h6 class="hk1-heading">Layouts</h6></li>
   <li class="hk1-menu-message"><h6 class="hk1-intent-danger">Message goes here</h6></li>
   <a class="hk1-menu-item">Normal Item...</a>
   <a class="hk1-menu-item hk1-disabled">Disabled item...</a>
   <div class="hk1-menu-divider"></div>
   <a class="hk1-menu-item hk1-intent-danger">Delete</a>

   <!-- Submenu -->
   <div class="hk1-submenu">
      <a class="hk1-submenu-item">Level 1...</a>
      <div class="hk1-submenu-content">
         <a class="hk1-menu-item">Level 1-1...</a>

         <div class="hk1-submenu">
            <a class="hk1-submenu-item">Level 1-2</a>
            <div class="hk1-submenu-content">
               <a class="hk1-menu-item">Level 2-1...</a>
            </div>
         </div>
      </div>
   </div>

   <!-- Submenu with grid -->
   <div class="hk1-submenu">
      <div class="hk1-menu-grid">
         <div class="hk1-grid row">
            <div class="col-sm-6">
               <div class="hk1-menu">
                  <div class="hk1-menu-header">Grid 1</div>
                  <a class="hk1-submenu-item">Grid 1-1</a>
                  <a class="hk1-submenu-item">Grid 1-2</a>
               </div>
            </div>
            <div class="col-sm-6">
               <div class="hk1-menu">
                  <div class="hk1-menu-header">Grid 2</div>
                  <a class="hk1-submenu-item">Grid 2-1</a>
                  <a class="hk1-submenu-item">Grid 2-2</a>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
```

## Menu
Menu is the wrapper of the whole menu.

- `hk1-menu` contains many of `hk1-menu-item` and `hk1-submenu`
- `hk1-submenu` contains many of `hk1-menu-item`, `hk1-menu-header`, `hk1-menu-message` and `hk1-menu-divider`
- `hk1-menu-header` solely contains text and icon
- `hk1-menu-message` solely contains text and icon
- `hk1-menu-divider` solely contains text and icon

# Development
The development tool workflow must satisfy the following points.
- webpack should monitor ts and scss when running `yarn dev`
- The `.d.ts` files are generated for each `scss` file, so that `ts` file can detect if there's any name change in `scss` file when compiling