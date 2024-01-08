import React from "react";
import { IconType } from "react-icons";
import { cva, type VariantProps } from "class-variance-authority";

const card = cva(
  "w-full lg:w-3/12 rounded-lg shadow-lg p-6 hover:border-b-4 bg-white duration-150 transition-all ease-in-out space-y-2 box-border",
  {
    variants: {
      type: {
        primary: "shadow-blue-200 hover:border-blue-300",
        danger: "shadow-red-200 hover:border-red-300",
        warning: "shadow-yellow-200 hover:border-yellow-300",
        success: "shadow-green-200 hover:border-green-300",
      },
    },
    defaultVariants: {
      type: "primary",
    },
  }
);

export interface BasicCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof card> {
  icon: IconType;
  title: string;
  value: string | number;
}

const BasicCard: React.FC<BasicCardProps> = ({
  type,
  className,
  icon: Icon,
  title,
  value,
}) => {
  return (
    <div className={card({ type, class: className })}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 flex justify-center items-center rounded-md">
          <Icon size={20} />
        </div>
        <h4 className="text-gray-500 font-medium text-lg">{value}</h4>
      </div>
      <h2 className="text-gray-500 font-medium capitalize">{title}</h2>
    </div>
  );
};

export default BasicCard;
