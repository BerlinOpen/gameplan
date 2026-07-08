import axios from "axios";
import type { SheetObject, SheetTitle } from "../types/sheets";

const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
const sheetId = import.meta.env.VITE_SHEET_ID;

const base = "https://sheets.googleapis.com/v4/spreadsheets";


export const getSheetNames = async () => {
    const res = await axios.get(
        `${base}/${sheetId}?fields=sheets.properties.title&key=${apiKey}`
    );

    return res.data.sheets.map((s: SheetTitle) => s.properties.title);
}

export const getSheet = async (name: string) => {
    const res = await axios.get(
        `${base}/${sheetId}/values/${encodeURIComponent(name)}?key=${apiKey}`
    );

    console.log(res.data.values);

    return {
        name,
        rows: res.data.values ?? []
    };
}

export const loadAllSheets = async (): Promise<SheetObject[]> => {
    const names = await getSheetNames();

    return Promise.all(names.map(getSheet));
}