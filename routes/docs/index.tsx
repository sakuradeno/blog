/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

// import { asset } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { walk, WalkEntry } from "std/fs/mod.ts";
import { relative } from "std/path/mod.ts";
import { staticRoot } from "@/utils/meta.ts";

const root = `${staticRoot}/docs`;
const regMd = /\.md$/;

export const handler: Handlers<WalkEntry[] | null> = {
  async GET(_, ctx) {
    const list: WalkEntry[] = [];
    for await (
      const entry of walk(root, { match: [regMd] })
    ) {
      list.push(entry);
    }
    return ctx.render(list);
  },
};

export default function Page({ data: list }: PageProps<WalkEntry[] | null>) {
  if (!list) {
    return <h1>Not Found</h1>;
  }

  return (
    <div class={tw`p-4 mx-auto max-w-screen-md`}>
      <div>docs: {root}</div>
      {list.map((item) => (
        <a href={`/docs/${relative(root, item.path.replace(regMd, ""))}`}>
          {item.path}
        </a>
      ))}
    </div>
  );
}
