import { type FlatConfig, includeIgnoreFile } from "@eslint/compat";
import { existsSync } from "node:fs";
import path from "node:path";
import { cwd } from "node:process";

type IncludeIgnoreFileResult = Pick<FlatConfig, "name" | "ignores">;

const findGitignoresUp = (startDir: string, endDir?: string) => {
	const filepaths: string[] = [];

	let currentDir = startDir;

	while (true) {
		if (endDir && startDir === endDir) break;

		const parentDir = path.dirname(currentDir);
		if (parentDir === currentDir) break; // Reached filesystem root

		const gitignorePath = path.join(currentDir, ".gitignore");
		if (existsSync(gitignorePath)) {
			filepaths.push(gitignorePath);
		}

		currentDir = parentDir;
	}

	return filepaths;
};

export const getCombinedGitignoreConfig = () => {
	const repoWorksapceRoot = process.env.REPO_WORKSPACE_ROOT;
	if (!repoWorksapceRoot) {
		throw new Error("REPO_WORKSPACE_ROOT environamnet variable is not set.");
	}

	const gitignorePaths = findGitignoresUp(cwd(), repoWorksapceRoot);

	const ignoreSet = new Set<string>(
		gitignorePaths
			.map((filepath) => includeIgnoreFile(filepath) as IncludeIgnoreFileResult)
			.flatMap((result) => result.ignores ?? []),
	);

	const ignoreConfig: IncludeIgnoreFileResult = {
		name: "Values from .gitignore files",
		ignores: [...ignoreSet],
	};

	return ignoreConfig;
};
