import { MenuHeader } from "@/components/menu-header";
import { MenuCategories } from "@/components/menu-categories";
import { MenuContent } from "@/components/menu-content";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fffefe] flex flex-col">
      <MenuHeader />

      <main className="flex-1 flex flex-col h-full">
        <div className="flex flex-col flex-1 h-full">
          <MenuCategories />

          <div className="flex-1 overflow-auto px-2 pb-20">
            <MenuContent />
          </div>
        </div>
      </main>

      <footer className="py-4 text-center text-xs text-[#eb7919] bg-[#fffefe] border-t border-[#eb7919]/20">
        © {new Date().getFullYear()} - Don Osvaldo Comidas
      </footer>
    </div>
  );
}
