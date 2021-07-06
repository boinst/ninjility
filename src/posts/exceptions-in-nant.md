---
layout: article 
title: Exceptions in NAnt
date: 2021-07-05
tags: ['post']
---

[NAnt](https://github.com/nant/nant) is an open-source build orchestration tool, written in .NET, and inspired by the Java-based Ant project. I'm mostly switching over to Cake Frosting these days, but NAnt served me very well for many years.

<!-- Excerpt Start -->
NAnt has limited support for exceptions, but there are a few ways we can make use of exception behaviour in our NAnt logic.
<!-- Excerpt End -->
 
You can throw exceptions in NAnt by invoking the `fail` task. 

```xml
<fail message="Something wrong here." />
```

Internally within the NAnt executor this throws a dotnet exception of type `BuildException`. In fact, any kind of task failure inside of NAnt ends up throwing and propagating a `BuildException`. 

You can also catch exceptions (including any kind of task failure) using the `trycatch` block, as follows.

```xml
<trycatch>
    <try>
        <echo message="In try" />
        <fail message="Just because..." />
    </try>
    <catch property="failure">
        <echo message="Caught failure: ${failure}" />
        <fail message="Bad catch" />
    </catch>
    <finally>
        <echo message="Finally done" />
    </finally>
</trycatch>
```

# Further Reading

Learn more about NAnt with these resources:

- NAnt on [Wikipedia](https://en.wikipedia.org/wiki/NAnt)