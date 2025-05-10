import { fetchTokkoProperties } from "@/lib/tokkoApi"; // Asegúrate que la ruta sea correcta
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query')?.toLowerCase().trim();

  // Si no hay query, podríamos devolver todas las propiedades o un error/mensaje.
  // Por ahora, si no hay query, la lógica de filtro devolverá todo si no se hace un chequeo explícito.
  // Opcionalmente: if (!query) return NextResponse.json({ objects: await fetchTokkoProperties() });


  try {
    const allProperties = await fetchTokkoProperties(); // Esta es tu función existente

    if (!query) {
        // Si no hay término de búsqueda, devuelve todas las propiedades o un array vacío
        return NextResponse.json(allProperties); // O return NextResponse.json([]);
    }

    const filteredProperties = allProperties.filter(property => {
      const searchTerm = query;

      // Campos a incluir en la búsqueda (todos convertidos a minúsculas para búsqueda insensible)
      const address = property.address?.toLowerCase() || '';
      const publicationTitle = property.publication_title?.toLowerCase() || '';
      const locationName = property.location?.name?.toLowerCase() || '';
      const propertyType = property.type?.name?.toLowerCase() || '';
      const description = property.description?.toLowerCase() || '';
      const realAddress = property.real_address?.toLowerCase() || '';
      const referenceCode = property.reference_code?.toLowerCase() || '';
      
      // Buscar en tags (nombres de tags)
      const tagsMatch = property.tags?.some(tag => tag.name?.toLowerCase().includes(searchTerm)) || false;

      // Buscar en el tipo de operación
      const operationTypeMatch = property.operations?.some(op => op.operation_type?.toLowerCase().includes(searchTerm)) || false;


      return (
        address.includes(searchTerm) ||
        publicationTitle.includes(searchTerm) ||
        locationName.includes(searchTerm) ||
        propertyType.includes(searchTerm) ||
        description.includes(searchTerm) ||
        realAddress.includes(searchTerm) ||
        referenceCode.includes(searchTerm) ||
        tagsMatch ||
        operationTypeMatch
      );
    });

    return NextResponse.json(filteredProperties); // Devuelve el array filtrado
  } catch (error) {
    console.error("Error en API de búsqueda de Tokko:", error);
    return NextResponse.json({ message: "Error al buscar propiedades", error: error.message }, { status: 500 });
  }
}