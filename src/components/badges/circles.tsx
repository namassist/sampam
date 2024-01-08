import React from "react";
import { IconType } from "react-icons";
import { cva, type VariantProps } from "class-variance-authority";

const circles = cva(
  "w-5 h-5 rounded-full text-xs flex justify-center items-center",
  {
    variants: {
      type: {
        primary: "bg-blue-200",
        danger: "bg-red-200",
        warning: "bg-yellow-200",
        success: "bg-green-200",
      },
    },
    defaultVariants: {
      type: "primary",
    },
  }
);

export interface BadgesProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof circles> {
  title: string;
}

const BadgesCircle: React.FC<BadgesProps> = ({ type, className, title }) => {
  return <div className={circles({ type, class: className })}>{title}</div>;
};

export default BadgesCircle;
