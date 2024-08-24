export interface Pagina<T>{
    elementos : T[],
    totalElementos : number,
    totalPaginas : number,
    paginaActual : number,
    tamañoPagina : number,
    linkAnterior: string,
    linkSiguiente: string
}