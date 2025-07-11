import Sidebar from "@/app/components/Invoice/Sidebar";

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="h-screen w-screen grid grid-cols-[15rem_1fr] max-lg:grid-cols-1 grid-rows-[6rem_1fr] bg-gray-200">
      <Sidebar/>
      <div className="row-start-1 row-end-3 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}