import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { ColourPicker } from "../components/ColourPicker";

export default {
  name: "market", title: "Markets", type: "document",
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "market" }),
    { name: "visible", title: "Visible on site", type: "boolean", initialValue: true,
      description: "Off = hidden from nav and returns 404" },
    { name: "title", type: "string" },
    { name: "slug",  type: "slug", options: { source: "title" } },
    { name: "color", title: "Accent colour", type: "string", components: { input: ColourPicker } },
    { name: "tag",   title: "One-line tag", type: "string" },
    { name: "body",  type: "text" },
    { name: "proof", title: "Proof line", type: "text" },
    { name: "image", title: "Hero image", type: "image", options: { hotspot: true } },
  ],
  preview: {
    select: { title: "title", visible: "visible" },
    prepare({ title, visible }) {
      return { title, subtitle: visible === false ? "🔴 Hidden" : "✅ Visible" };
    }
  }
};
