# ylogviewer2

[![GitHub Pages](https://github.com/lslezak/ylogviewer2/actions/workflows/pages.yml/badge.svg)](https://github.com/lslezak/ylogviewer2/actions/workflows/pages.yml)
[![Eslint](https://github.com/lslezak/ylogviewer2/actions/workflows/eslint.yml/badge.svg)](https://github.com/lslezak/ylogviewer2/actions/workflows/eslint.yml)

This is an experimental YaST log (y2log) viewer.

The online version is available at https://lslezak.github.io/ylogviewer2/.

## Examples

You can load some example logs:

- [y2log.xz](
  https://lslezak.github.io/ylogviewer2/?log=https%3A%2F%2Fgist.githubusercontent.com%2Flslezak%2Fd36a2a15b9ccd49f035c7e51b4818ee5%2Fraw%2Fa8f2822f608f7ae0bbabb3dbe457b5202e21da25%2Fy2log.xz) -
  Running the YaST language module in an installed system
- [y2log-tw-installation.tar.xz](
  https://lslezak.github.io/ylogviewer2/?log=https%3A%2F%2Fgist.githubusercontent.com%2Flslezak%2Fd36a2a15b9ccd49f035c7e51b4818ee5%2Fraw%2Fa8f2822f608f7ae0bbabb3dbe457b5202e21da25%2Fy2log-tw-installation.tar.xz) - 
  Complete openSUSE Tumbleweed installation logs

## Features

- Colorization depending on the error level (orange warnings, red errors)
- Show/hide message components (date, time, severity, PID, ...)
- Filtering
  - By severity (warning, error,...)
  - By component (libzypp, UI, storage, ...)
- Can read compressed log files (\*.gz, \*.bz2, \*.xz), even whole tar archives
  created by the [save_y2logs](
  https://github.com/yast/yast-yast2/blob/master/scripts/save_y2logs) script
- Local processing, the selected log file is NOT uploaded anywhere, the
  ylogviewer uses HTML5 features and processes the log completely locally!
  That has several advantages:
  - Speed - nothing is uploaded or downloaded, no bandwidth limitations
  - Security - the logs might potentially contain sensitive data, all data
    stay at your machine!
  - Offline mode - the viewer can be used without internet connection

## Build

You need NodeJS at version 12.22 or higher, tested with NodeJS 16.

In openSUSE ditributions run this command to install the latest NodeJS available:

```
zypper install nodejs
```

Then install the needed NPM packages:

```
npm install
```

And build the page from the sources:

```
npm run build
```

The page is generated in the `dist/` subdirectory. Just deploy the content on
the server or you can open the `dist/index.html` file in a browser.

### Development

For building in development mode run:

```
HOST=localhost npm run start:dev
```

This will also start a development server at `http://localhost:9000`
and automatically open that page in your preferred browser. This also enables
the hot reload feature so the page is automatically updated in the browser
whenever you change a source file.

## TODO

Here are some ideas how to improve the viewer:

- Improve the build process, it currently a lot of RedHat fonts which are not
  used at all (use PatternFly SCSS instead of the final SCC?)
- Display list of the found YaST processes, useful if the log contains several
  YaST runs, to have some table of content
- Two passes, first scan the files, display a summary, then let the user
  choose which parts/files will be loaded
- Allow to not load the debug messages (just hiding them is not nice, they still
  take lot of memory)
- Load other files from tarball archives
- Bookmarks to easily mark some interesting parts and easily navigate between
  them (e.g. like in Visual Studio Code)
- Better UI, better colors

## Used Libraries

### Decompression Libraries

- [xzwasm](https://github.com/SteveSanderson/xzwasm) - XZ decompression library
- [bz2.js](https://github.com/SheetJS/bz2) - Bzip2 decompression library
- [pako](https://github.com/nodeca/pako) - Gzip decompression library
- [tarballjs](https://github.com/ankitrohatgi/tarballjs) - Reading TAR archive

### UI Libraries

- [ReactJS](https://reactjs.org/) - UI library for writing components
  - [Documentation](https://beta.reactjs.org/)
- [PatternFly](https://www.patternfly.org/v4/)
  - [Page template](https://github.com/patternfly/patternfly-react-seed)
