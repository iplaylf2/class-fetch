export type IfExtends<T, Super, True, False> = T extends Super ? True : False;
