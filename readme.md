# APEX Nitro

<h1 align="center">
      <br>
      <img src="https://raw.githubusercontent.com/OraOpenSource/apex-nitro/master/docs/img/apex-nitro-logo.png" alt="APEX Nitro" width="600">
      <br>
      <br>
</h1>

> Your essential APEX companion

[![npm](https://img.shields.io/npm/v/apex-nitro.svg)](https://www.npmjs.com/package/apex-nitro) [![Build Status](https://travis-ci.org/OraOpenSource/apex-nitro.svg?branch=master)](https://travis-ci.org/OraOpenSource/apex-nitro) [![Dependency Status](https://david-dm.org/OraOpenSource/apex-nitro.svg)](https://david-dm.org/OraOpenSource/apex-nitro) [![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

APEX developers of all skills inevitably have to write JavaScript and CSS. Do you feel the learning curve to be steep? That is 100% normal. Barely any guidelines exist within APEX to learn the fundamentals of these languages. Let’s fix that.

APEX Nitro takes your front-end development to the next level by reducing mundane tasks, boosting performance, modularizing code, enhancing teamwork and more.

## What APEX Nitro is

APEX Nitro is a tool that runs in the background while you develop an APEX application, watching for local static file (e.g. `js`, `css`) modifications inside of a given directory, compiling them into a better format and sending them back to your APEX application seamlessly. It makes front-end coding faster by syncing these local files to your APEX application in real-time.

APEX Nitro also establishes clear front-end guidelines and enforces good programming practices. It streamlines JavaScript and CSS by eliminating the *bad* practice of inline coding, so your APEX application benefits from an efficient 100% file-based approach.

### What APEX Nitro does

- Browser Synchronization
- File Minification
- File Concatenation
- Source Mapping
- Error Handling
- CSS Preprocessing
- CSS Auto-Prefixer
- Theme Roller Customization

For more info on the features, [read the documentation](/docs/features.md).

### Benefits

- Reduce development time
- Reduce mundane tasks
- Increase maintainability
- Better modularization
- Performance boost
- Enhances teamwork
- Makes responsive development easier

For more info on the benefits, [read the documentation](/docs/benefits.md).

## Quickstart

This following sections show the easiest way to get started with APEX Nitro.

[Go to the full documentation](/docs/) to read more about using APEX Nitro.

### System Requirements

- [Node.js](https://nodejs.org)
- [SQLcl](http://www.oracle.com/technetwork/developer-tools/sqlcl/overview/index.html) *>= v17.2 (optional, used for the publish feature)*

### Install

Execute this command to install APEX Nitro:

```bash
npm install -g apex-nitro
```

*Getting errors? Make sure to read the [troubleshooting section](/docs/troubleshooting.md).*

### Project Configuration

Execute this command to configure an APEX Nitro project:

```bash
apex-nitro config <project>
```

A new browser tab will open and you can simply fill the form:

![APEX Nitro Config](/docs/img/command-config.png)

*You can read about the different options by hovering the help icons.*

### APEX Application Setup

APEX Nitro requires to make one small modification to your APEX application to allow real-time synchronization. Head to Shared Components, under Application Processes and create a new application process with the following attributes:

Attribute | Value
--- | ---
Name | `APEX Nitro`
Sequence | `-999`
Process Point | `On Load: Before Header (page template header)`
Condition | `owa_util.get_cgi_env('APEX-Nitro') is not null`
Source (`PL/SQL`) | `apex_application.g_flow_images := owa_util.get_cgi_env('APEX-Nitro');` 

![Setup Application Process](/docs/img/setup-application-process.png)

[Read the documentation](/docs/setup.md) for more information.

### Launch

```bash
apex-nitro launch <project>
```

![APEX Nitro Launch](/docs/img/command-launch.png)

### Usage

After APEX Nitro is launched, create, edit or delete any file within your project's source folder. Example `/my_project/src/`:

```bash
|-/src/
   |-css
      |-app.css
   |-js
      |-app.js
```

APEX Nitro will synchronize the content of the source folder directly to your APEX application.

[**Read more about usage.**](/docs/usage.md)  
[**See common patterns.**](/docs/patterns.md)  
[**Try our examples.**](/examples/)

### File Reference

For the files to work properly at runtime, APEX must reference these files _somewhere_. For the `/src/` example folder above, a valid pattern would be to add the following code on the APEX page properties, under the _JavaScript File URLs_ section:

```bash
#APP_IMAGES#js/app.js
```

Same for the _CSS File URLs_ section:

```bash
#APP_IMAGES#css/app.css
```

### Publish to APEX

When you are done developing, you _can_ upload your files to the *Shared Components* in APEX (this is optional).

```bash
apex-nitro publish <project>
```

![APEX Nitro Publish](/docs/img/command-publish.png)

[Read more](/docs/publish.md) to get SQLcl running on your environment.

## Troubleshoot

[Read more about common issues.](/docs/troubleshooting.md)

## Changelog

[See changelog.](changelog.md)

## Project Sponsors

[Insum Solutions](http://insum.ca/)

## Team

- [Vincent Morneau](https://github.com/vincentmorneau)
- [Martin Giffy D'Souza](https://github.com/martindsouza)
