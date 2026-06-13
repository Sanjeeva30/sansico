import { orderRankField } from "@sanity/orderable-document-list";

export default {
  name: "companyPage", title: "Company Page", type: "document",
  fields: [
    { name: "title",  title: "Page title",  type: "string",
      initialValue: "An Indonesian group built for the world's shelves" },
    { name: "intro",  title: "Intro paragraph", type: "text" },
    { name: "vision", title: "Vision statement", type: "text",
      description: "Shown in the Vision card" },
    { name: "culture",title: "Culture statement", type: "text",
      description: "Shown in the Culture card" },
    { name: "overviewTitle", title: "Overview heading", type: "string" },
    { name: "overviewBody", title: "Overview body (rich text)", type: "array",
      of: [{ type: "block",
        styles: [{ title:"Normal",value:"normal" },{ title:"Heading 3",value:"h3" }],
        marks: { decorators: [{ title:"Bold",value:"strong" },{ title:"Italic",value:"em" }] }
      }]
    },
    { name: "timeline", title: "Company timeline", type: "array",
      of: [{ type: "object", fields: [
        { name: "year",        title: "Year",        type: "string", validation: R => R.required() },
        { name: "event",       title: "Event title", type: "string", validation: R => R.required() },
        { name: "description", title: "Description", type: "text" }
      ], preview: { select: { title: "year", subtitle: "event" } } }]
    },
    { name: "values", title: "Our values", type: "array",
      of: [{ type: "object", fields: [
        { name: "title", type: "string", validation: R => R.required() },
        { name: "body",  type: "text" }
      ], preview: { select: { title: "title" } } }]
    },
  ]
};
