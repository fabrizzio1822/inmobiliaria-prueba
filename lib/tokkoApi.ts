const BASE_URL = "https://api.tokkobroker.com/v1";
const API_KEY = process.env.TOKKO_API_KEY;

export async function fetchTokkoProperties() {
  const res = await fetch(`http://www.tokkobroker.com/api/v1/property/?format=json&key=${API_KEY}&lang=es_ar`, {
    next: { revalidate: 60 }, // opcional: ISR si usas app dir
  });

  if (!res.ok) {
    throw new Error("Error al obtener propiedades de Tokko");
  }

  const data = await res.json();
  return data.objects; // la mayoría de las respuestas vienen en "objects"
}

export async function fetchTokkoPropertyById(id: string) {
    const res = await fetch(`http://www.tokkobroker.com/api/v1/property/${id}/?format=json&key=${API_KEY}&lang=es_ar`);
    
    if (!res.ok) {
      const error = await res.text();
      console.error("Tokko error:", error);
      throw new Error(`Error al obtener la propiedad con ID: ${id}`);
    }
  
    return res.json();
  }