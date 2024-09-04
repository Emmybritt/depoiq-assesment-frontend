import { initializeApollo } from "./apollo/apollo-client";
import { FIND_MANY_TOPICS } from "./apollo/queries/topic.query";

const client = initializeApollo(null);
export async function fetchData(limit = 18, offset = 0, search?: string) {
  const { data } = await client.query({
    query: FIND_MANY_TOPICS,
    variables: {
      topicsInput: {
        limit,
        offset,
        search,
      },
    },
    fetchPolicy: "network-only",
  });

  return data;
}
