import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemas";

const structure = (S) =>
  S.list()
    .title("Sansico Studio")
    .items([
      S.listItem().title("🎨  Appearance")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings").title("Appearance & Brand")),
      S.listItem().title("📄  Pages")
        .child(S.documentTypeList("pageSettings").title("Pages")),
      S.divider(),
      S.listItem().title("🏠  Home Page")
        .child(S.document().schemaType("homePage").documentId("homePage").title("Home Page")),
      S.documentTypeListItem("capability").title("Capabilities"),
      S.documentTypeListItem("market").title("Markets"),
      S.listItem().title("📦  Products")
        .child(S.list().title("Products").items([
          S.documentTypeListItem("productCategory").title("Categories"),
          S.documentTypeListItem("productItem").title("Products"),
        ])),
      S.documentTypeListItem("caseStudy").title("Case Studies"),
      S.documentTypeListItem("certification").title("Certifications"),
      S.documentTypeListItem("facility").title("Facilities"),
      S.listItem().title("Careers Page")
        .child(S.document().schemaType("careersPage").documentId("careersPage").title("Careers Page")),
      S.divider(),
      S.documentTypeListItem("person").title("Team"),
      S.documentTypeListItem("newsPost").title("News & Press"),
    ]);

export default defineConfig({
  name: "sansico",
  title: "Sansico Group",
  projectId: "rvghw4zu",
  dataset: "production",
  plugins: [structureTool({ structure })],
  schema: { types: schemaTypes },
});
