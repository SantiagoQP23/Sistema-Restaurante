

export interface ICargo {
  idCargo: number,
  nombreCargo: string,
  descripcion: string
}


export interface IUsuario {
  idUsuario?: number,
  nombreUsuario: string,
  nombres: string,
  password?: string;
  
  cargo: ICargo,
  idCargo?: number;
  estado?: boolean
}

export interface ILogin{
  nombreUsuario: string;
  password: string;
}

