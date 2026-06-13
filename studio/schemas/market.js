import { ColourPicker } from "../components/ColourPicker";

export default {
  name: "market", title: "Markets", type: "document",
  fields: [
    { name: "title", type: "string" },
    { name: "slug",  type: "slug", options: { source: "title" } },
    { name: "color", title: "Accent colour", type: "string",
      components: { input: ColourPicker } },
    { name: "tag",   title: "One-line tag", type: "string" },
    { name: "body",  type: "text" },
    { name: "proof", title: "Proof line", type: "text" },
    { name: "image", title: "Hero image", type: "image", options: { hotspot: true } },
    { name: "order", type: "number" },
  ]
};
