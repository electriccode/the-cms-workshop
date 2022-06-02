import Head from "next/head";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export default function IndexPage(props) {
  console.log(props);
  const pageData = props?.data?.data?.pageCollection?.items?.[0];
  if (!pageData) return "Page not found";
  return (
    <>
      <Head>
        <title>{pageData.title}</title>
      </Head>
      <main>{documentToReactComponents(pageData.body.json)}</main>
    </>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  let slug = "";
  let predicate = ", where: { slug_exists: false }";
  if (query.index) {
    slug = query.index.join("/");
    predicate = ', where: { slug: \\"' + slug + '\\" }';
  }
  const body =
    '{"query":"query {\\n  pageCollection(limit: 1' +
    predicate +
    ') {\\n    items {\\n      title\\n      slug\\n      body {\\n        json\\n      }\\n    }\\n  }\\n}","variables":null}';
  console.log({ query, slug, predicate, body });
  const response = await fetch(
    "https://graphql.contentful.com/content/v1/spaces/wn1reipdztrw/",
    {
      headers: {
        authorization: "Bearer 6Eb9ZGQrMcRFqgmeSj1I6z_aPzuQR30RBvs4FPQEXXI",
        "content-type": "application/json"
      },
      body,
      method: "POST"
    }
  );
  const data = await response.json();
  return {
    props: {
      data
    }
  };
}
