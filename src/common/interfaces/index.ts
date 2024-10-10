import { ReactNode } from "react";
import { SearchFiltersParams } from "../enums";

export interface NextFillImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  quality?: number;
  children?: ReactNode;
  parentClassName: string;
  childrenClassName?: string;
  noBlurEffect?: boolean;
  onClick?: () => void;
  optimized?: boolean;
}

export interface NextIcon {
  src: string;
  alt: string;
  size?: number;
  width?: number;
  height?: number;
  tabIndexed?: boolean;
  className?: string;
  onClick?: () => void;
}

export interface ButtonTypes {
  text?: string;
  icon?: string;
  url?: string;
  className?: string;
  hasBgColor?: boolean;
  isNewTab?: boolean;
  onClick?: () => void;
  iconSize?: number;
}

export interface InputTypes {
  type: string;
  placeholder: string;
  name: string;
  label: string;
  icon?: string;
  alt?: string;
  value?: string;
  onChange?: () => void;
}
export interface PropertyImageTypes {
  src: string;
  alt: string;
}

export interface FooterContactUsIconType {
  icon: string;
  alt: string;
  text: string;
  href?: string;
  isNewTab?: boolean;
}
export interface FooterSocialIconsType {
  src: string;
  alt: string;
  href?: string;
}
export interface SubmitButtonProps {
  isSubmitting: boolean;
  children: ReactNode;
  className?: string;
}

export interface MainHeaderProps {
  bgColor?: string;
  breadCrumb: ReactNode;
  title: string;
  coloredTitle?: string;
}

export interface IdNameProps {
  _id: string;
  name: string;
}

export interface CardCheckBoxProps {
  checked?: boolean;
  onChange?: () => void;
}

export interface ApiResponseInterface<T> {
  data: T;
  message: string;
  code: number;
  token?: string;
  meta?: any;
}

export type SearchFiltersParamsTypes =
  | SearchFiltersParams.PAGE
  | SearchFiltersParams.PER_PAGE
  | SearchFiltersParams.SEARCH
  | SearchFiltersParams.SORT
  | SearchFiltersParams.SORT_TYPE;
