import TagCreate from "@/components/tag/TagCreate";
import TagList from "@/components/tag/TagList";
export default function AdminTag() {
  return (
    <div className="container mx-auto">
      <div className="max-w-5xl mx-auto my-5">
        <div className="mb-5">
          <p className="text-2xl font-bold mb-2">Crear Ubicación</p>
          <TagCreate />
        </div>
        <div>
          <p className="text-2xl font-bold mb-2">Lista de Ubicaciones</p>
          <TagList />
        </div>
      </div>
    </div>
  );
}