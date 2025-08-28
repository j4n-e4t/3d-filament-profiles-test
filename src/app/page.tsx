import { FilamentTable } from "./_components/filament-table";

export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold text-gray-900">
          3D Filament Profiles Mock
        </h1>
      </div>

      <FilamentTable />
    </main>
  );
}
