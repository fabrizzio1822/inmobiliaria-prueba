const BASE_URL = "https://api.tokkobroker.com/v1";
const API_KEY = process.env.TOKKO_API_KEY;

export async function fetchTokkoProperties() {
  const res = await fetch(`https://www.tokkobroker.com/api/v1/property/?format=json&key=${API_KEY}&lang=es_ar`, {
    next: { revalidate: 60 }, // Actualiza cada 60 segundos para evitar que Tokko nos bloquee (503)
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error(`Tokko API Error (${res.status}):`, errorText);
    throw new Error(`Error al obtener propiedades de Tokko: ${res.status} - ${errorText}`);
  }

  const data = await res.json();
  return data.objects;
}

export async function fetchTokkoPropertyById(id: string) {
    const res = await fetch(`https://www.tokkobroker.com/api/v1/property/${id}/?format=json&key=${API_KEY}&lang=es_ar`, {
      next: { revalidate: 60 }, // Actualiza cada 60 segundos para evitar bloqueos
    });
    
    if (!res.ok) {
      const error = await res.text();
      console.error("Tokko error:", error);
      throw new Error(`Error al obtener la propiedad con ID: ${id}`);
    }
  
    return res.json();
  }