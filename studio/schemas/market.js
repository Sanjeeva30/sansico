import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { ColourPicker } from "../components/ColourPicker";

export default {
  name: "market", title: "Markets", type: "document",
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "market" }),
    { name: "visible", title: "Visible on site", type: "boolean", initialValue: true },
    { name: "title", type: "string", validation: R => R.required() },
    { name: "slug",  type: "slug", options: { source: "title" }, validation: R => R.required() },
    { name: "color", title: "Accent colour", type: "string", components: { input: ColourPicker } },
    { name: "tag",   title: "One-line tag (shown on index card)", type: "string" },

    // ── Page content ──────────────────────────────────────
    { name: "image", title: "Hero image (full-width)", type: "image", options: { hotspot: true } },
    { name: "body",  title: "Body (plain text, quick entry)", type: "text" },
    { name: "richBody", title: "Rich body (overrides plain when set)", type: "array",
      of: [{ type: "block",
        styles: [{ title:"Normal",value:"normal" },{ title:"Heading 2",value:"h2" },{ title:"Heading 3",value:"h3" },{ title:"Quote",value:"blockquote" }],
        marks: { decorators: [{ title:"Bold",value:"strong" },{ title:"Italic",value:"em" }] }
      }]
    },
    { name: "proof", title: "Proof / quote line", type: "text" },

    // ── Market stats ──────────────────────────────────────
    { name: "marketStats", title: "Market stats", type: "array",
      description: "e.g. 40+ years serving this category",
      of: [{ type: "object", fields: [
        { name: "value", title: "Value (e.g. 40+)", type: "string" },
        { name: "label", title: "Label",            type: "string" }
      ], preview: { select: { title: "value", subtitle: "label" } } }]
    },

    // ── Linked content ────────────────────────────────────
    { name: "capabilityRefs", title: "Relevant capabilities", type: "array",
      description: "Which of Sansico's capabilities serve this market",
      of: [{ type: "reference", to: [{ type: "capability" }] }]
    },
    { name: "featuredWork", title: "Featured case study", type: "reference",
      to: [{ type: "caseStudy" }]
    },
    { name: "relatedProducts", title: "Related product categories", type: "array",
      of: [{ type: "reference", to: [{ type: "productCategory" }] }]
    },
  ],
  preview: {
    select: { title: "title", visible: "visible" },
    prepare({ title, visible }) {
      return { title, subtitle: visible === false ? "🔴 Hidden" : "✅ Visible" };
    }
  }
};
