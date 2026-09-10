import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  ChartBarIcon,
  CheckIcon,
  CheckCircleIcon,
  CaretRightIcon,
  ClipboardTextIcon,
  EnvelopeSimpleIcon,
  ListIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  ReceiptIcon,
  TShirtIcon,
  UsersIcon,
  WalletIcon,
  WashingMachineIcon,
  XIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { IconProps } from "@phosphor-icons/react";

const icons = {
  arrow: ArrowRightIcon,
  arrowUp: ArrowUpRightIcon,
  overview: ChartBarIcon,
  orders: ClipboardTextIcon,
  customers: UsersIcon,
  payment: WalletIcon,
  services: TShirtIcon,
  receipt: ReceiptIcon,
  check: CheckIcon,
  checkCircle: CheckCircleIcon,
  chevronRight: CaretRightIcon,
  menu: ListIcon,
  close: XIcon,
  search: MagnifyingGlassIcon,
  plus: PlusIcon,
  mail: EnvelopeSimpleIcon,
  washer: WashingMachineIcon,
};

export type IconName = keyof typeof icons;

export function Icon({
  name,
  size = 20,
  ...props
}: IconProps & { name: IconName }) {
  const Component = icons[name];
  return <Component size={size} aria-hidden="true" {...props} />;
}
