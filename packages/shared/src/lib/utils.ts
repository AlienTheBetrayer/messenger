/**
 * converts an svg into a usable by browser url
 * @param svg svg string (the actual image)
 * @returns url
 */
export const svgToUrl = (svg: string) => {
	return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};
