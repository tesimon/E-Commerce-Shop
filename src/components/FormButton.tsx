"use client";
import { ComponentProps } from "react";
import { useFormStatus } from "react-dom";
type buttonProps = {
  children: React.ReactNode;
  className?: string;
} & ComponentProps<"button">;
export default function FormButton({
  children,
  className,
  ...props
}: buttonProps) {
  const { pending } = useFormStatus();
  return (
    <button className={`btn ${className}`} {...props} disabled={pending}>
      {pending && <span className="loading loading-dots loading-xs"></span>}
      {children}
    </button>
  );
}
