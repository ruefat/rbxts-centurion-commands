import { Register, Command, CenturionType, Guard, CommandContext } from "@rbxts/centurion";

export const Kick = (allowedPlayers?: Set<number>, groupId?: number, minimumRank?: number) => {
@Register()
class KickCommand {
    public name = "KickCommand";
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
    @Guard((ctx: CommandContext) => {
            const player = ctx.executor;

            if (allowedPlayers && allowedPlayers.has(player.UserId)) return true;

            if (groupId !== undefined && minimumRank !== undefined) {
                if (player.GetRankInGroup(groupId) >= minimumRank) return true;
            }

            ctx.error("You are not allowed to use this command");
            return false;
        })
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