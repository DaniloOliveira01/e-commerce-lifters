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
  filterCategorie: string[] | null;
  filterColor: Color | null;
  filterSearch: string | null;
  setFilterCategorie: Dispatch<SetStateAction<string[] | null>>;
  setFilterColor: Dispatch<SetStateAction<Color | null>>;
  setFilterSearch: Dispatch<SetStateAction<string | null>>;
}

const ApiContext = createContext<ApiContextType>({
  produtos: [],
  loading: true,
  filterCategorie: null,
  filterColor: null,
  filterSearch: null,
  setFilterCategorie: () => [],
  setFilterColor: () => [],
  setFilterSearch: () => [],
});

export const ApiProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [produtos, setProdutos] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filterCategorie, setFilterCategorie] = useState<string[] | null>(null);
  const [filterColor, setFilterColor] = useState<Color | null>(null);
  const [filterSearch, setFilterSearch] = useState<string | null>(null);

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
    if (filterCategorie && !filterCategorie.includes(produto.categoria)) {
      return false;
    }

    if (
      filterSearch &&
      !produto.titulo.toLowerCase().includes(filterSearch.toLowerCase())
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
        filterCategorie,
        filterColor,
        filterSearch,
        setFilterCategorie,
        setFilterColor,
        setFilterSearch,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = (): ApiContextType => useContext(ApiContext);
