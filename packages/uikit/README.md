# Compilation

From the root folder
`yarn build:uikit`


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
   |- dark 
      |- card
         |- _card.scss
|- core
   |- components
      |- card
         |- _card.scss
```

## Inheritance

There are three levels of inheritance
* Default theme - UI's neutral default theme
   - The default theme provides baseline variables for a component.
* Packaged theme - A specified packaged theme, like "amazon", or "material"
   - Packaged themes are themes bundled together in a folder
   - Packaged themes can be used by modifying values in your `theme.config` file.
* Site theme - A theme specific to your site

# Theme

## Using the Build Process of the Application
Install the uikit package

```sh
yarn install @hungknow/uikit
```

To the build the theme files, import tham into the styles.scss file
```scss
@import "node_modules/@hungknow/uikit/scss/hk-uikit.scss;
```
The `hk-uikit.scss` file adds the styles for all components that are available in the theme. To trim down the size of the generated CSS, import only the source for the components that you use in your application. Each of them could be found in `scss/` folder.

```scss
@import "~@hungknow/uikit/scss/components/menu";
```

To customize the variables that ared used in the theme, change the theme before you import the theme files.

All customizable variables should have the `hk-` prefix.

```scss
$hk-menu-background-color: black; // Change the background color of menu

@import "~@hungknow/uikit/scss/components/menu";
```

## Override the theme in the custom scss file
If your site is using `dark` theme, but you want to override some theme variables.

The content of `index.scss` file
```scss
@use "@hungknow/uikit/themes/dark/hk-uikit-dark" with (
    $hk-menu-background-color: #394b59
);
```

Your output of index.scss will have all styles for `dark` theme with the updated menu background color.


# Create new theme

In folder `theme`, create new folder with your target theme name.
Create the basic folder and file structure.

```
<theme_name>
.
|- variables
   |- _core-variables.scss
|- _variables.scss
|_ hk-uikit-<theme_name>.scss
```

## Basic SCSS Structure
| File | Description | 
| --- | --- |
| colors/_app-color | Application background color 
| colors/_border-colors | Border color |
| colors/_intent-colors | The colors for 4 primary intent |


# Component Lists
- Grid: [Usage](), [Theme Color]()
- Button: [Usage](), [Theme Color]()
- Dropdown
- Input
- Scrollbar
- Badge
- Progress bar
- Lists and trees
- Activity bar
- Side bar
- Panel
- Title Bar
- Menu Bar
- Notification
- Banner
- Breadcrumb
- Navbar [Usage](), [Theme Color]()
- Menu: [Usage](), [Theme Color](docs/theme-colors.md#menu)
- Tab
- Settings: [Usage](), [Theme Color]()
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
- There are two methods that use can overwrite the theme
   - The client may build the bundle default css file, then overwrite theme variable by import another css file
   - The client may import `.scss` file of `hk-ui` into their bundle `.css` file, then generate the final bundle `css` file


# Deliverables
- css bundle file or multiple component css files
- scss folder for variable reference and theme change
- react js bundle file