export interface Categoria{
    _id: string;
    name: string;
}

export type NewCategoria = Omit<Categoria, '_id'>;