import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

function Nav(props: Props) {
  const { children } = props;
  return <nav className="container fixed bottom-0 left-0">{children}</nav>;
}

export default Nav;
