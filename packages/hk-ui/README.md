# Theme

My purpose is that you have a default theme.
Then you can create multiple theme css files.

+ sass
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

```
<div class="hk-g">
    <div class="hk-u-1-3"><p>Thirds</p></div>
    <div class="hk-u-1-3"><p>Thirds</p></div>
    <div class="hk-u-1-3"><p>Thirds</p></div>
</div>
```

# Responsive Grids

```
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
