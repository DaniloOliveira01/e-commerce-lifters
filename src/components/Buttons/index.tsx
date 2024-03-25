import { ReactNode } from "react";

interface IButtonProps {
  text: string | ReactNode;
  onClick?: () => void;
}

export const ButtonBlack = ({ text, onClick }: IButtonProps) => {
  return (
    <button onClick={onClick} className="btn-black">
      {text}
    </button>
  );
};

export const ButtonGray = ({ text, onClick }: IButtonProps) => {
  return (
    <button onClick={onClick} className="btn-gray">
      {text}
    </button>
  );
};

export const ButtonWhite = ({ text, onClick }: IButtonProps) => {
  return (
    <button onClick={onClick} className="btn-white">
      {text}
    </button>
  );
};
