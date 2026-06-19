import { ColourPicker } from "../components/ColourPicker";

export default {
  name: "styledString",
  title: "Text",
  type: "object",
  fields: [
    { name: "text", title: "Text", type: "string" },
    {
      name: "sizePx", title: "Font size (px)", type: "number",
      description: "Leave blank to use this element's normal design size.",
      validation: (R) => R.min(8).max(160),
    },
    {
      name: "color", title: "Color", type: "string",
      components: { input: ColourPicker },
      description: "Leave blank to use this element's normal design color.",
    },
  ],
  preview: { select: { title: "text" } },
};
