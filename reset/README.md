# Web design for reset

## Overview

This is a reset CSS.




## Getting Sitarted

### Install with npm

```console
npm install @noknow/web-design-reset
```



### Install with Github

```console
cd /YOUR_PROJECT/css
mkdir -p lib/noknow_web_design
cd lib/noknow_web_design

git init
git remote add -f origin https://github.com/noknow-hub/pkg-web-design.git

git config core.sparsecheckout true
echo "reset" >> .git/info/sparse-checkout

git pull origin main
```



### Import with @import

```css
@import 'YOUR_PROJECT/INSTALLED_CSS_PATH/reset/style.css';
```
