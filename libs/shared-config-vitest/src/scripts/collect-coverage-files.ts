import { glob } from "glob";
import fs from "node:fs/promises";
import path from "node:path";

const getDestinationFilename = (sourceDir: string, filename: string) => {
	const directoryName = path.basename(sourceDir);
	return `${directoryName}-${filename}`;
};

const asyncFilter = async <T>(
	array: T[],
	predicate: (item: T) => Promise<boolean>,
) => {
	const results = await Promise.all(array.map((item) => predicate(item)));
	return array.filter((_, index) => results[index]);
};

const formatFoundMessage = (directories: string[], filename: string) => {
	const cleanedDirs = directories
		.map((directory) => directory.replaceAll("../", ""))
		.join(", ");
	return `Found ${filename} in: ${cleanedDirs}`;
};

const findMatchingPaths = async (patterns: string[]) => {
	const paths = await Promise.all(patterns.map((pattern) => glob(pattern)));
	return paths.flat();
};

const hasCoverageFile = async (dirPath: string, filename: string) => {
	try {
		await fs.access(path.join(dirPath, filename));
		return true;
	} catch {
		return false;
	}
};

export const collectFileRecursivelyUp = async ({
	patterns,
	destinationDir,
	filename,
}: {
	patterns: string[];
	destinationDir: string;
	filename: string;
}) => {
	try {
		await fs.mkdir(destinationDir, { recursive: true });

		const matchingPaths = await findMatchingPaths(patterns);

		const matchingDirs = await asyncFilter(matchingPaths, async (p) => {
			const stats = await fs.stat(p);
			return stats.isDirectory();
		});

		const matchingDirsWithCoverage = await asyncFilter(
			matchingDirs,
			(dirPath) => hasCoverageFile(dirPath, filename),
		);

		await Promise.all(
			matchingDirsWithCoverage.map(async (dir) => {
				const sourceFilePath = path.join(dir, filename);
				const destinationFilename = getDestinationFilename(dir, filename);
				const destinationFilePath = path.join(
					destinationDir,
					destinationFilename,
				);

				await fs.copyFile(sourceFilePath, destinationFilePath);
			}),
		);

		if (matchingDirsWithCoverage.length > 0) {
			console.log(formatFoundMessage(matchingDirsWithCoverage, filename));
		}

		console.log(`Coverage collected into: ${destinationDir}`);
	} catch (error) {
		console.error("Error collecting coverage files:", error);
	}
};

if (import.meta.url === `file://${process.argv[1]}`) {
	void collectFileRecursivelyUp({
		patterns: ["../../../apps/*", "../../../libs/*"],
		destinationDir: path.join(process.cwd(), "coverage/raw"),
		filename: "coverage.json",
	});
}
