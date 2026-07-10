import { useQuery } from "@tanstack/react-query";
import { loadAllSheets } from "../api/googleSheets";

export function useGoogleSheets() {
    return useQuery({
        queryKey: ["googleSheets"],
        queryFn: loadAllSheets,

        refetchInterval: 120000,
        refetchIntervalInBackground: true,
        staleTime: 0,
    });
}