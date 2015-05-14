## Introduction

### What is this?

This is an opinionated guide to building native mobile apps with [NativeScript](http://nativescript.org). The advice this guide prescribes is by no means mandatory, however, the very opinionated authors of this guide believe that following these guidelines will help you produce high-quality, maintenance friendly, and performant apps with NativeScript.

Feel free to ignore tips that don't apply to your projects, or to build upon this advice based on your app's requirements. If you find an error in this guide, or would like to suggest new guidelines, feel free to [open an issue](https://github.com/NativeScript/nativescript-style-guide/issues/new) in [this guide's GitHub repo](https://github.com/NativeScript/nativescript-style-guide).

### Why use NativeScript?

NativeScript provides the ability to build completely native iOS and Android apps using standards-based JavaScript. As such, NativeScript is a great fit for anyone with a JavaScript skill set that wants or needs to build native mobile applications.

NativeScript allows you to reuse JavaScript skills you already know. For example this guide will show you how to use npm modules in your app, how to lint your code with [JSHint](http://jshint.com/) and [JSCS](http://jscs.info/), and how to write modules that adhere to the [CommonJS spec](http://en.wikipedia.org/wiki/CommonJS).

But perhaps NativeScript's characterizing feature is the direct access it gives you to native iOS and Android APIs. This access makes it trivial to make iOS- and Android-specific customizations to your apps, and to build NativeScript modules that abstract away the platform-specific implementations. This guide will cover both.

### Who wrote this?

The following people have contributed to this guide in some fashion—aka, if you disagree with the advice this guide presents, here are some people you can yell at:

* TJ VanToll | [@tjvantoll](http://twitter.com/tjvantoll)

### Prerequisites

This guides assumes you know how to create and run a NativeScript project. If you don't, start on the [NativeScript getting started page](http://docs.nativescript.org/getting-started), and come back here when you've got the NativeScript basics down and are looking to create a real app.

### JustMeme application

This guide's example are given in the context of an application called “JustMeme”. JustMeme is a NativeScript-built iOS and Android application for building memes and sharing them with your friends and family. JustMeme's source code is available on GitHub, and you can also download the app from the iOS app store.

* [View JustMeme on GitHub](https://github.com/NativeScript/JustMeme)
* [Download JustMeme from the iOS App Store](https://itunes.apple.com/us/app/justmeme/id989340374?mt=8)

<div class="image-container">
![](images/justmeme-1.png)
![](images/justmeme-2.png)
![](images/justmeme-3.png)
</div>