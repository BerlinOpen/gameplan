import type { SheetRow } from "../types/sheets";

export const SheetTable = ({ rows }: { rows: SheetRow[] }) => {
    const headers = rows[0] ?? [];

    const data = rows.slice(1).map((row: SheetRow ) => {
        const obj: Record<string, string> = {};

        headers.forEach((h, i) => {
            obj[h] = row[i];
        });

        return obj;
    });

    return <p>{JSON.stringify(data)}</p>
}
