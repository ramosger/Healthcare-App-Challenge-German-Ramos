import type { ComponentPropsWithoutRef, ElementType, JSX, PropsWithChildren } from "react";
import type { IconProps } from "@iconify/react";
import { Icon, loadIcons } from "@iconify/react";
import { tv } from "tailwind-variants";

import { SIZE, type Size, type Styled } from "@/types/styles";

const AVAILABLE_ICONIFY_ICONS = {
  Check: "check",
  ChevronDown: "mdi-light:chevron-down",
  ChevronRight: "chevron-right",
  ChevronUp: "chevron-up",
  ChevronLeft: "chevron-left",
  Circle: "circle",
  Home: "home",
  LoaderCircle: "loader-circle",
  LocationPin: "weui:location-outlined",
  LogOut: "log-out",
  MoreHorizontal: "more-horizontal",
  Menu: "menu",
  Search: "formkit:search",
  Slash: "slash",
  Close: "x",
  Plus: "plus",
  Eye: "eye",
  EyeOff: "eye-off",
  Lock: "lock",
  Logout: "material-symbols:logout",
  User: "ph:user",
  Mail: "material-symbols:mail-outline",
  Phone: "solar:phone-linear",
  World: "jam:world",
};

export const initializeIcons = () => {
  return loadIcons(Object.values(AVAILABLE_ICONIFY_ICONS));
};

const iconsVariants = tv({
  slots: {
    icon: "size-4",
    wrapper: "flex shrink-0 flex-row items-center justify-center",
  },
  variants: {
    size: {
      [SIZE.X_SMALL]: { wrapper: "size-4" },
      [SIZE.SMALL]: { wrapper: "size-5" },
      [SIZE.MEDIUM]: { wrapper: "size-6" },
      [SIZE.LARGE]: { wrapper: "size-9" },
      [SIZE.X_LARGE]: { wrapper: "size-10" },
    },
  },
});

const { icon, wrapper } = iconsVariants();

type IconComponentProps = {
  className?: string;
} & Record<string, unknown>;

type IconComponent = (props: IconComponentProps) => JSX.Element;

type IconifyIconProps = Omit<IconProps, "icon"> & IconComponentProps;

const iconifyIcons = Object.fromEntries(
  Object.entries(AVAILABLE_ICONIFY_ICONS).map(([key, value]) => {
    return [
      key,
      ({ className, ...rest }: IconifyIconProps) => {
        return <Icon className={icon({ className })} icon={value} {...rest} />;
      },
    ];
  }),
) as Record<keyof typeof AVAILABLE_ICONIFY_ICONS, IconComponent>;

const Logo: IconComponent = ({ className, ...rest }) => {
  return (
    <svg
      className={icon({ className })}
      fill="none"
      viewBox="0 0 39 39"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <rect fill="#2E364C" height="38.0525" rx="9.19409" width="38.0265" />
      <path
        d="M17.7368 7.66162C18.2042 7.66162 18.6122 7.91603 18.8306 8.29346H18.9995C20.0456 8.29346 20.894 9.14097 20.894 10.187V15.8696C21.2424 15.8698 21.528 16.1526 21.4966 16.4995C21.3498 18.1103 20.6437 19.6278 19.4907 20.7808C18.6453 21.6261 17.6043 22.2309 16.4741 22.5513V24.0776C16.4739 24.902 15.9468 25.6037 15.2114 25.8638C15.2383 27.6712 16.7121 29.1283 18.5259 29.1284C20.3565 29.1284 21.8403 27.6436 21.8403 25.813V23.2876C21.8405 21.2828 23.4663 19.6577 25.4712 19.6577C27.476 19.6578 29.1009 21.2828 29.1011 23.2876V24.8159C29.8367 25.0759 30.3638 25.7783 30.3638 26.603C30.3636 27.6489 29.5161 28.4965 28.4702 28.4966C27.4242 28.4966 26.5759 27.649 26.5757 26.603C26.5757 25.7784 27.1028 25.076 27.8384 24.8159V23.2876C27.8382 21.9802 26.7786 20.9205 25.4712 20.9204C24.1637 20.9204 23.1032 21.9801 23.103 23.2876V25.813C23.103 28.341 21.0539 30.3911 18.5259 30.3911C16.0147 30.391 13.9757 28.3686 13.9487 25.8638C13.2131 25.6039 12.6862 24.9022 12.686 24.0776V22.5513C11.5559 22.2309 10.5149 21.626 9.66943 20.7808C8.51644 19.6278 7.81036 18.1103 7.66357 16.4995C7.63222 16.1525 7.91765 15.8697 8.26611 15.8696H8.29736V10.3979C8.29736 9.26473 9.21487 8.34527 10.3472 8.34521H10.5298C10.7661 7.9364 11.2085 7.66162 11.7144 7.66162C12.4692 7.66174 13.0806 8.27435 13.0806 9.02979C13.0805 9.78513 12.4691 10.3978 11.7144 10.3979C11.2084 10.3979 10.7661 10.1223 10.5298 9.71338H10.3472C9.96977 9.71343 9.66357 10.0202 9.66357 10.3979V15.8696H10.2612C10.6098 15.8696 10.8873 16.154 10.9468 16.4976C11.0756 17.2422 11.4316 17.9355 11.9731 18.4771C12.6645 19.1682 13.6021 19.556 14.5796 19.5562C15.5574 19.5562 16.4956 19.1683 17.187 18.4771C17.7286 17.9355 18.0846 17.2422 18.2134 16.4976C18.2729 16.154 18.5503 15.8696 18.8989 15.8696H19.6313V10.187C19.6313 9.83836 19.3482 9.55615 18.9995 9.55615H18.8306C18.6122 9.9334 18.2041 10.187 17.7368 10.187C17.0394 10.187 16.4741 9.6217 16.4741 8.92432C16.4741 8.22695 17.0394 7.66163 17.7368 7.66162ZM28.4702 25.9712C28.1215 25.9712 27.8384 26.2543 27.8384 26.603C27.8386 26.9516 28.1216 27.2339 28.4702 27.2339C28.8187 27.2338 29.1009 26.9515 29.1011 26.603C29.1011 26.2544 28.8189 25.9713 28.4702 25.9712ZM13.9487 24.0776C13.949 24.426 14.2312 24.7083 14.5796 24.7085C14.9281 24.7085 15.2112 24.4261 15.2114 24.0776V22.8149H13.9487V24.0776ZM9.03955 17.1323C9.27553 18.1674 9.79933 19.1245 10.562 19.8872C11.6275 20.9527 13.0727 21.5512 14.5796 21.5513C16.0867 21.5513 17.5325 20.9528 18.5981 19.8872C19.3608 19.1245 19.8847 18.1674 20.1206 17.1323H19.3657C19.1443 17.9713 18.7047 18.7454 18.0806 19.3696C17.1523 20.2979 15.8924 20.8188 14.5796 20.8188C13.267 20.8187 12.0078 20.2978 11.0796 19.3696C10.4554 18.7454 10.0149 17.9714 9.79346 17.1323H9.03955Z"
        fill="white"
      />
    </svg>
  );
};

export const Icons = {
  ...iconifyIcons,
  Logo,
} as const;

type IconWrapperProps<TElement extends ElementType> = {
  size?: Size;
  as?: TElement;
} & Styled &
  PropsWithChildren;

export const IconWrapper = <TElement extends ElementType = "div">({
  as,
  children,
  className,
  size = SIZE.MEDIUM,
  ...rest
}: Omit<ComponentPropsWithoutRef<TElement>, keyof IconWrapperProps<TElement>> &
  IconWrapperProps<TElement>) => {
  const Component = as ?? "div";

  return (
    <Component className={wrapper({ size, className })} {...rest}>
      {children}
    </Component>
  );
};
