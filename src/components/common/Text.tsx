import { type HTMLProps } from "react";

const PageTitle = ({
  className,
  ...props
}: HTMLProps<HTMLParagraphElement>) => {
  return (
    <p
      className={`text-xl font-bold text-text500 dark:text-primary-40 ${className}`}
      {...props}
    >
      {props.children || props.title}
    </p>
  );
};

const PageSubTitle = ({
  className,
  ...props
}: HTMLProps<HTMLParagraphElement>) => {
  return (
    <p
      className={`text-lg font-bold text-text400 dark:text-primary-60 ${className}`}
      {...props}
    >
      {props.children || props.title}
    </p>
  );
};

const Text = ({
  variant = "primary",
  className,
  ...props
}: HTMLProps<HTMLParagraphElement> & {
  variant?:
    | "primary"
    | "secondary"
    | "muted"
    | "error"
    | "success"
    | "warning"
    | "white"
    | "blue";
  classes?: string;
}) => {
  const textColorTheme = () => {
    if (variant === "primary") {
      return "text-text500 dark:text-primary-40";
    } else if (variant === "secondary") {
      return "text-text400 dark:text-primary-60";
    } else if (variant === "muted") {
      return "text-text300 dark:text-primary-60";
    } else if (variant === "error") {
      return "text-red-500";
    } else if (variant === "success") {
      return "text-green-500";
    } else if (variant === "warning") {
      return "text-warning-100";
    } else if (variant === "white") {
      return "text-white dark:text-primary-20";
    } else if (variant === "blue") {
      return "text-[#0052CC] dark:text-[#0052CC]";
    }
  };
  const classes = `${textColorTheme()} ${className}`;
  return (
    <p className={classes} {...props}>
      {props.children || props.title}
    </p>
  );
};

export { PageSubTitle, PageTitle, Text };
