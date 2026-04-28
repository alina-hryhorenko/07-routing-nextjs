import type { ReactNode } from "react";

interface NotesLayoutProps {
  children: ReactNode;
  sidebar?: ReactNode;
}

export default function NotesLayout({ children, sidebar }: NotesLayoutProps) {
  return (
    <section>
      {sidebar}
      {children}
    </section>
  );
}
