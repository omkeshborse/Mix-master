import axios from "axios";
import { useLoaderData } from "react-router-dom";
import CocktailList from "../Components/CocktailList";
import SearchForm from "../Components/SearchForm";
const cocktailSearchUrl =
  "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
import { useQuery } from "@tanstack/react-query";

const searchCocktailsQuery = (searchTerm) => {
  return {
    queryKey: ["search", searchTerm || "all"],
    queryFn: async () => {
      const response = await axios.get(`${cocktailSearchUrl}${searchTerm}`);
      return response.data.drinks;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const url = new URL(request.url);
    const searchTerm = url.searchParams.get("search") || "";
    // const response = await axios.get(`${cocktailSearchUrl}${searchTerm}`);
    await queryClient.ensureQueryData(searchCocktailsQuery(searchTerm));
    return { searchTerm };
  };

function Landing() {
  const { searchTerm } = useLoaderData();
  const { data: drinks } = useQuery(searchCocktailsQuery(searchTerm));
  return (
    <>
      <SearchForm searchTerm={searchTerm} />
      <CocktailList drinks={drinks} />
    </>
  );
}
export default Landing;
