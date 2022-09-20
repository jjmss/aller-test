import { useEffect, useState } from "react";

/**
 * Loops over the params and adds them to the url
 *
 * @param {string} url
 * @param {{}} params object with params and values
 * @returns {URL}
 */
const addParams = (url, params) => {
	Object.entries(params).forEach(([param, value]) => {
		url.searchParams.set(param, value);
	});

	return url;
};

/**
 * Generates the default structure for the image url
 *
 * @param {string} imageUrl
 * @param {{}} options object with params and values
 * @returns {URL}
 */
const structureDefaultUrl = (imageUrl, options) => {
	const url = new URL(imageUrl);

	return addParams(url, options);
};

/**
 * Hook to control/ensure the params of the image
 *
 * @param {string} imageUrl
 * @param {{defaultHeight: int, defaultWidth: int}} imageOptions
 * @returns {{image: string, setImageOptions: Function}}
 */
function useImage(imageUrl, { defaultHeight = 300, defaultWidth = 600 } = {}) {
	const url = structureDefaultUrl(imageUrl, {
		height: defaultHeight,
		width: defaultWidth,
	});
	const [urlString, setUrlString] = useState(url.toString());
	const [imageOptions, setImageOptions] = useState();

	// Update the image params and updates the url
	useEffect(() => {
		if (imageOptions) {
			addParams(url, imageOptions);
		}

		setUrlString(url.toString());
	}, [imageOptions, url]);

	return { image: urlString, setImageOptions };
}

export default useImage;
