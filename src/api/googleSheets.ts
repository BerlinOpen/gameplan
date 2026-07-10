import axios from "axios";
import type { SheetRow } from "../types/sheets";

const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
const sheetId = import.meta.env.VITE_SHEET_ID;

const base = "https://sheets.googleapis.com/v4/spreadsheets";

export const getSheet = async () => {
    const res = await axios.get(
        `${base}/${sheetId}/values/${encodeURIComponent('Final Gameplan')}?key=${apiKey}`
    );

    return res.data.values ?? [];
}

export const loadAllSheets = async (): Promise<SheetRow[]> => {
    return getSheet();
}