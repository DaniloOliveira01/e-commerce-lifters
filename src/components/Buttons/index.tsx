import { ReactNode } from "react";

interface IButtonProps {
  text: string | ReactNode;
  onClick?: () => void;
}

export const ButtonOrange = ({ text, onClick }: IButtonProps) => {
  return (
    <button onClick={onClick} className="btn-orange">
      {text}
    </button>
  );
};
