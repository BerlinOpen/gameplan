import { SheetTable } from "./components/SheetTable";
import { useGoogleSheets } from "./hooks/useGoogleSheets";

export const App = () => {
  const { data, isLoading } = useGoogleSheets();

  if (isLoading) return <>Loading...</>;

  return (
    <>
      {data?.map(sheet => (
        <div key={sheet.name}>
          <h2>{sheet.name}</h2>

          <SheetTable rows={sheet.rows} />
        </div>
      ))}
    </>
  );
}
