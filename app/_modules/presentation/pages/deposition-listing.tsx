import Listings from "@/app/_commons/components/organisms/listing";
import { fetchData } from "../../infrastructure/action";
import { PropertiesProps } from "@/app/page";

const DepositionListing = async ({ searchParams }: PropertiesProps) => {
  const data = await fetchData(
    searchParams.limit,
    parseInt(searchParams.offset, 10),
    searchParams.searchTerm
  );

  return (
    <>
      <Listings
        topics={data.findManyTopics.docs}
        hasNextPage={data.findManyTopics.hasNextPage}
        isSearch={searchParams?.isSearch?.toLowerCase() === "true"}
      />
    </>
  );
};

export default DepositionListing;
