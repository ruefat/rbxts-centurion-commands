import { Register, Command, CenturionType, CommandContext, Guard } from "@rbxts/centurion";
import { Players } from "@rbxts/services";

export const Ban = (allowedPlayers?: Set<number>, groupId?: number, minimumRank?: number) => {
@Register()
class BanCommand {
	@Command({
		name: "ban",
		description: "Ban a player by name",
		arguments: [
			{
				name: "target",
				description: "Player to ban",
				type: CenturionType.Player,
			},
			{
				name: "duration",
				description: "Duration in hours or 'perm' for permanent ban",
				type: CenturionType.String,
				suggestions: ["perm"],
			},
			{
				name: "reason",
				description: "Reason for ban",
				type: CenturionType.String,
			},
		],
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
	async ban(ctx: CommandContext, target: Player, duration: string, reason: string) {
		const userId = target.UserId;

        if (groupId && minimumRank) {
            const rank = target.GetRankInGroup(groupId);
		    if (rank >= minimumRank) {
			ctx.error(`You cannot ban a team member with rank ${rank}.`);
			return;
		    }
        }
		

		let durationSeconds: number | undefined;

		if (duration.lower() === "perm") {
			durationSeconds = undefined;
		} else {
			const parsedHours = tonumber(duration);
			if (parsedHours === undefined || parsedHours <= 0) {
				ctx.error("Duration must be a positive number of hours or 'perm'.");
				return;
			}
			durationSeconds = parsedHours * 3600;
		}

		try {
			if (durationSeconds !== undefined) {
				await Players.BanAsync({
					UserIds: [userId],
					DisplayReason: reason,
					PrivateReason: reason,
					Duration: durationSeconds,
				});
				ctx.reply(
					`Banned UserId ${userId} (${target.Name}) for ${durationSeconds / 3600} hours. Reason: ${reason}`,
				);
			} else {
				await Players.BanAsync({
					UserIds: [userId],
					DisplayReason: reason,
					PrivateReason: reason,
					Duration: -1,
				});
				ctx.reply(`Permanently banned UserId ${userId} (${target.Name}). Reason: ${reason}`);
			}
		} catch (err) {
			ctx.error(`Failed to ban user: ${err}`);
		}
	}
}
}