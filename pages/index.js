import Head from "next/head";

export default function IndexPage(props) {
  const pageData = props?.data?.data?.pageCollection?.items?.[0];
  if (!pageData) return "Page not found";
  return (
    <>
      <Head>
        <title>{pageData.title}</title>
      </Head>
    </>
  );
}

export async function getServerSideProps(context) {
  const response = await fetch(
    "https://graphql.contentful.com/content/v1/spaces/wn1reipdztrw/",
    {
      headers: {
        authorization: "Bearer 6Eb9ZGQrMcRFqgmeSj1I6z_aPzuQR30RBvs4FPQEXXI",
        "content-type": "application/json"
      },
      body:
        '{"query":"query {\\n  pageCollection(limit: 1) {\\n    items {\\n      title\\n      slug\\n    }\\n  }\\n}","variables":null}',
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
