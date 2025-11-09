# Introduction

## Getting Started

Centurion-Commands is a Roblox-TS Library built for Centurion to easily create Commands and focus on what matters.

Here is an example to create a KickCommand:

```ts
import { CenturionCommands } from "@rbxts/centurion-commands";

CenturionCommands.KickCommand();
```

## Installation

```shell
npm install @rbxts/centurion-commands
```


## Creating Guards

Creating Guards for Centurion with Centurion-Commands is very important and very easy.

```ts
import { Permissions } from "@rbxts/centurion-commands";

// If you only want specific players to use it
Permissions.initializeAdminGuard(new Set([0, 1, 2]));

// If you want members from your group to use it
Permissions.initializeAdminGuard(undefined, 1, 1);
```

:::info Note
If you want to use different guards for different Commands, you will currently have to create the command manually with Centurion
