import type { Tablero } from "@/types/tablero";

export type TableroFormSubmitPayload = Omit<Tablero, "id">;

export const INITIAL_VALUES: Record<keyof TableroFormSubmitPayload, string> = {
    nombre: "",
    ubicacion: "",
    marca: "",
    capacidad_amperios: "",
    estado: "Operativo",
    ano_fabricacion: "2025",
    ano_instalacion: "2025",
};
