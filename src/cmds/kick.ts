import { Register, Command, CenturionType, Guard, CommandGuard, CommandContext } from "@rbxts/centurion";
import { isAdmin, AdminGuard } from "../permissions";

export const Kick = () => { @Register()
class KickCommand {
    @Command({
        name: "kick",
        description: "Kicks a player from the server",
        arguments: [
            {
                name: "player",
                description: "Player to kick",
                type: CenturionType.Player
            },
            {
                name: "reason",
                description: "Reason for the kick",
                type: CenturionType.String,
            }
        ]
    })
    @Guard(isAdmin(AdminGuard!))
    kick(ctx: CommandContext, player: Player, reason: string) {
        if (player) {
            player.Kick(reason);
        }
        if (!player) {
            ctx.error("Player not found");
            return;
        }
        ctx.reply(`Successfully kicked ${player.Name} for reason: ${reason}`);
    }
}
}