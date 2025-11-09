import { CommandContext, CommandGuard } from "@rbxts/centurion";

export function isAdmin(guard: CommandGuard): CommandGuard {
    return guard;
}

export function isAdminGuard(
        allowedPlayers?: Set<number>,
        groupId?: number,
        minimumRank?: number
    ): CommandGuard {
        return (ctx: CommandContext) => {
            const player = ctx.executor;

            if (groupId && minimumRank) {
                const rank = player.GetRankInGroup(groupId);
                if (rank < minimumRank) {
                    ctx.error("Insufficient group rank to use this command");
                    return false;
                }
            }

            if (allowedPlayers && allowedPlayers.has(player.UserId)) {
                return true;
            }

            return groupId !== undefined || allowedPlayers?.has(player.UserId) ? true : false;
        };
    }

export let AdminGuard: CommandGuard | undefined;        

export namespace Permissions {

    export function initializeAdminGuard(
        allowedPlayers?: Set<number>,
        groupId?: number,
        minimumRank?: number
    ) {
        AdminGuard = isAdminGuard(allowedPlayers, groupId, minimumRank);
    }

}