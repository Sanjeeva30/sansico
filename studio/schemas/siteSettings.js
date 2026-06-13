const BRAND_COLOURS = [
  { label: "Crimson",   value: { hex: "#7A0D20" } },
  { label: "Navy",      value: { hex: "#22409E" } },
  { label: "Green",     value: { hex: "#0D4F31" } },
  { label: "Red",       value: { hex: "#F3263E" } },
  { label: "Citrus",    value: { hex: "#BDDA5F" } },
  { label: "Black",     value: { hex: "#1A1A1A" } },
  { label: "White",     value: { hex: "#FFFFFF" } },
  { label: "Off-white", value: { hex: "#F5F0E8" } },
];
const COLOR_OPTS = { disableAlpha: true, colorList: BRAND_COLOURS };

export default {
  name: "siteSettings", title: "Site Settings", type: "document",
  fields: [
    { name: "logo", title: "Brand logo", type: "image",
      description: "SVG or transparent PNG — replaces the text wordmark when set.",
      options: { accept: "image/svg+xml,image/png,image/webp" } },
    { name: "tagline",  title: "Tagline",                    type: "string" },
    { name: "mission",  title: "Mission statement (footer)", type: "text"   },
    { name: "headingFont", title: "Heading font", type: "string",
      options: { list: [{ title: "Sans-serif (current)", value: "sans" }, { title: "Serif", value: "serif" }], layout: "radio" },
      initialValue: "sans" },
    { name: "bodySize", title: "Body text size", type: "string",
      options: { list: [{ title: "Small", value: "sm" }, { title: "Medium (current)", value: "md" }, { title: "Large", value: "lg" }], layout: "radio" },
      initialValue: "md" },
    { name: "accentColour", title: "Accent colour", type: "color", options: COLOR_OPTS },
    { name: "nav", title: "Header navigation", type: "array", of: [{ type: "navItem" }] },
    { name: "ctaLabel", title: "Header CTA label", type: "string" },
    { name: "email",    title: "Sales email",   type: "string" },
    { name: "whatsapp", title: "WhatsApp number", type: "string" },
    { name: "phones",   title: "Phone numbers", type: "array",
      of: [{ type: "object", fields: [
        { name: "label",   type: "string" },
        { name: "display", type: "string" },
        { name: "tel",     type: "string" }
      ]}] },
  ]
};
