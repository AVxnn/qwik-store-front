import NavBar from "@/components/NavBar";

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-background">
      <NavBar />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-white mb-4">
          Добро пожаловать в QwikStore
        </h1>
        <p className="text-white/70">
          Выберите раздел в боковой панели для навигации по приложению.
        </p>
      </main>
    </div>
  );
}
