import { IEvento } from "@application/data";

export interface ApiClientRest {
    ubicacionesCercanas(evento: IEvento): Promise<any>;
}
