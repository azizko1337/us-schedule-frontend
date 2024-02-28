import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

function Nav(props: Props) {
  const { children } = props;
  return (
    <nav className="w-full p-3 flex flex-col items-center fixed bottom-0 left-0 bg-background border-t-4">
      {children}
    </nav>
  );
}

export default Nav;
