import fsPromises from "fs/promises";

const deleteImage = async (oldImage: string, dir: string) => {
	const path = `D:\\JAVA SCRIPT PROJECTS\\Spotify Clone\\server\\static\\${dir}\\${oldImage}`;
	await fsPromises.unlink(path);
};

export default deleteImage;
