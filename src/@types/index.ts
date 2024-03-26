export interface Color {
  nome: string;
  codigo: string;
}

export interface Photo {
  url: string;
  capa: boolean;
}

export interface Product {
  titulo: string;
  valor: string;
  descricao: string;
  categoria: string;
  cores: Color[];
  tamanhos: string[];
  fotos: Photo[];
}

export interface CartItem {
  titulo: string;
  valor: string;
  descricao: string;
  color: string;
  size: string;
}
