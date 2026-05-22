import { formatDistanceToNow } from 'date-fns';

/**
 * @description takes a timestamp and converts to "3 days ago" using date-fns library
 *
 * @param date - timestamp to convert
 * @returns formatted string of the time distance
 */
export const timeAgo = (date: string | Date) => {
	return formatDistanceToNow(new Date(date), {
		addSuffix: true,
	});
};
