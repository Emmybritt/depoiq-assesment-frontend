import DepositionListing from "./_modules/presentation/pages/deposition-listing";

export interface PropertiesProps {
  searchParams: {
    offset: string;
    searchTerm: string;
    limit: number;
    page: number;
    isSearch: string;
  };
}

export default function Home({ searchParams }: PropertiesProps) {
  return (
    <main className="mt-6">
      <DepositionListing searchParams={searchParams} />
    </main>
  );
}
