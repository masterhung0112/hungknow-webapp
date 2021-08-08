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
