import Listings from "@/app/_commons/components/organisms/Listings/listing";

interface DepositionListingProp {
  searchParams: {
    offset: string;
    searchTerm: string;
    limit: string;
    page: number;
    isSearch: string;
  };
  data: any;
}
const DepositionListing = async ({
  searchParams,
  data,
}: DepositionListingProp) => {
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
