import { ServerScriptService } from "@rbxts/services";
import { Centurion } from "@rbxts/centurion";

const server = Centurion.server();

server.registry.load(ServerScriptService.WaitForChild("commands") as Folder);