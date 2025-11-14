# Introduction

## Getting Started

Centurion-Commands is a Roblox-TS Library built for Centurion to easily create Commands and focus on what matters.

Here is an example to create a KickCommand:

```ts
import { CenturionCommands } from "@rbxts/centurion-commands";

CenturionCommands.KickCommand(new Set([1234]));
```

## Installation

```shell
npm install @rbxts/centurion-commands
```


## Creating Guards

Creating Guards for Centurion with Centurion-Commands is very important and very easy.

```ts
import { CenturionCommands } from "@rbxts/centurion-commands";

// If you only want specific players to use it
CenturionCommands.KickCommand(new Set([1234]));

// If you want members from your group to use it
CenturionCommands.KickCommand(undefined, 123, 2);
```
