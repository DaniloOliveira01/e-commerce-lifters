import { Color, Product } from "@/@types";
import axios from "axios";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface ApiContextType {
  produtos: Product[];
  loading: boolean;
  filtroCategoria: string[] | null;
  filtroCor: Color | null;
  filtroSearch: string | null;
  setFiltroCategoria: Dispatch<SetStateAction<string[] | null>>;
  setFiltroCor: Dispatch<SetStateAction<Color | null>>;
  setFiltroSearch: Dispatch<SetStateAction<string | null>>;
}

const ApiContext = createContext<ApiContextType>({
  produtos: [],
  loading: true,
  filtroCategoria: null,
  filtroCor: null,
  filtroSearch: null,
  setFiltroCategoria: () => [],
  setFiltroCor: () => [],
  setFiltroSearch: () => [],
});

export const ApiProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [produtos, setProdutos] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filtroCategoria, setFiltroCategoria] = useState<string[] | null>(null);
  const [filtroCor, setFiltroCor] = useState<Color | null>(null);
  const [filtroSearch, setFiltroSearch] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const response = await axios.get<Product[]>(
        "https://gist.githubusercontent.com/thiagossampaio/060e82b4801b0841fc683b0ce5efa06d/raw/e3cc555d9c71fd1b1160e20d7b10c083b5abcd61/desafio_front_end",
      );
      setProdutos(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const produtosFiltrados = produtos?.filter(produto => {
    if (filtroCategoria && !filtroCategoria.includes(produto.categoria)) {
      return false;
    }

    if (filtroCor && !produto.cores.includes(filtroCor)) {
      return false;
    }

    if (
      filtroSearch &&
      !produto.titulo.toLowerCase().includes(filtroSearch.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  return (
    <ApiContext.Provider
      value={{
        produtos: produtosFiltrados,
        loading,
        filtroCategoria,
        filtroCor,
        filtroSearch,
        setFiltroCategoria,
        setFiltroCor,
        setFiltroSearch,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = (): ApiContextType => useContext(ApiContext);
