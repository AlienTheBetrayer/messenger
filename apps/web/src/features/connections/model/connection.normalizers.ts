import {
	connections_groupType__,
	ConnectionsReturn__,
	connectionsType__,
	usersType__,
} from "@/shared/model/serializable.types";

/**
 * normalizes connections (should be used in thunks later)
 * @param data data from /api/connections
 * @returns normalized data
 */
export function normalizeConnections(data: ConnectionsReturn__) {
	const cache = {
		groups: [] as connections_groupType__[],
		connections: [] as connectionsType__[],
		users: [] as usersType__[],
	};

	for (const group of data.groups) {
		const { connections, ...rawGroup } = group;
		cache.groups.push({
			...rawGroup,
		});

		for (const connection of connections) {
			const { users: user, ...connectionData } = connection;

			cache.users.push(user);
			cache.connections.push(connectionData);
		}
	}

	return cache;
}
