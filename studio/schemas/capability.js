import { ColourPicker } from "../components/ColourPicker";

export default {
  name: "capability", title: "Capabilities", type: "document",
  fields: [
    { name: "title",   type: "string" },
    { name: "slug",    type: "slug", options: { source: "title" } },
    { name: "num",     title: "Eyebrow (DESIGN / MAKE / DELIVER)", type: "string" },
    { name: "summary", title: "One-line summary", type: "text", rows: 2 },
    { name: "colorTheme", title: "Colour theme", type: "string",
      description: "Pick a brand colour or enter a custom hex.",
      components: { input: ColourPicker } },
    { name: "order",   title: "Display order", type: "number" },
    { name: "body",    title: "Body (plain text)", type: "text" },
    { name: "richBody", title: "Rich body (overrides plain when set)", type: "array",
      of: [{ type: "block",
        styles: [{ title:"Normal",value:"normal" },{ title:"Heading 2",value:"h2" },{ title:"Heading 3",value:"h3" },{ title:"Quote",value:"blockquote" }],
        marks: { decorators: [{ title:"Bold",value:"strong" },{ title:"Italic",value:"em" }] }
      }]
    },
    { name: "points",  title: "Bullet points", type: "array", of: [{ type: "string" }] },
    { name: "image",   title: "Primary image",  type: "image" },
    { name: "gallery", title: "Image gallery",  type: "array",
      of: [{ type: "image", options: { hotspot: true },
        fields: [{ name: "caption", title: "Caption", type: "string" }] }]
    },
    { name: "subServices", title: "Sub-services", type: "array",
      of: [{ type: "object", fields: [
        { name: "title",       title: "Service name", type: "string" },
        { name: "description", title: "Description",  type: "text", rows: 2 }
      ], preview: { select: { title: "title", subtitle: "description" } } }]
    },
    { name: "proofPoints", title: "Proof points / stats", type: "array",
      of: [{ type: "object", fields: [
        { name: "value", title: "Stat (e.g. 40+)", type: "string" },
        { name: "label", title: "Label",           type: "string" }
      ], preview: { select: { title: "value", subtitle: "label" } } }]
    },
    { name: "customerLogos", title: "Customers using this capability", type: "array",
      of: [{ type: "object", fields: [
        { name: "name", title: "Customer name", type: "string" },
        { name: "logo", title: "Logo", type: "image",
          options: { accept: "image/svg+xml,image/png,image/webp" } }
      ], preview: { select: { title: "name", media: "logo" } } }]
    },
  ]
};
