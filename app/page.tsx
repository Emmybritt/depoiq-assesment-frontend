import HomeTemplate from "./_commons/components/templates/home.templates";
import ApolloClientProvider from "./_commons/utils/provider/apolloWrapper";
import { initializeApollo } from "./_modules/infrastructure/apollo/apollo-client";
import { FIND_MANY_TOPICS } from "./_modules/infrastructure/apollo/queries/topic.query";
import DepositionListing from "./_modules/presentation/pages/deposition-listing";

export interface PropertiesProps {
  searchParams: {
    offset: string;
    searchTerm: string;
    limit: string;
    page: number;
    isSearch: string;
  };
}

export default async function Home({ searchParams }: PropertiesProps) {
  const client = initializeApollo(null);
  const { data } = await client.query({
    query: FIND_MANY_TOPICS,
    variables: {
      topicsInput: {
        limit: 15,
        page: searchParams?.offset ? parseInt(searchParams.offset) : 1,
        search: searchParams.searchTerm ?? "",
      },
    },
    fetchPolicy: "network-only",
  });

  return (
    <HomeTemplate>
      <main className="mt-6">
        <ApolloClientProvider
          initialApolloState={JSON.stringify(client.cache.extract())}
        >
          <DepositionListing searchParams={searchParams} data={data} />
        </ApolloClientProvider>
      </main>
    </HomeTemplate>
  );
}
