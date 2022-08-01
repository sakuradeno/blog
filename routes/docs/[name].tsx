/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

// import { asset } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { staticRootURL } from "@/utils/meta.ts";

export const handler: Handlers<string | null> = {
  async GET(_, ctx) {
    const url = new URL(`docs/${ctx.params.name}.md`, staticRootURL);
    try {
      return ctx.render(await Deno.readTextFile(url));
    } catch {
      return ctx.render(`Not Found: ${url.href}`);
    }
  },
};

export default function Page({ data }: PageProps<string | null>) {
  if (!data) {
    return <h1>Not Found</h1>;
  }

  return (
    <div class={tw`p-4 mx-auto max-w-screen-md`}>
      <pre>{data}</pre>
    </div>
  );
}
