async function clearDir(path: string) {
  for await (const entry of Deno.readDir(path)) {
    const entryPath = `${path}/${entry.name}`;
    await Deno.remove(entryPath);
  }
}

const buildFront = new Deno.Command("npx", {
	args: ["ng", "build", "--configuration=production"],
	cwd: "packages/frontend",
	stdout: "inherit",
	stderr: "inherit",
})

const buildStatus = await buildFront.output()
const source = "packages/frontend/dist/frontend/browser"
const destiny = "packages/backend/public"
if (buildStatus.success) {
    await clearDir(destiny)
	for await (const entry of Deno.readDir(source)) {
		await Deno.copyFile(`${source}/${entry.name}`, `${destiny}/${entry.name}`)
	}
}

Deno.exit(buildStatus.code)
