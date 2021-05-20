
const apiKey = "EJxNr6OrEqS7HfnoIlhnJRZS4DtHFQoLDyLafH62"

interface MarsApiResponse {
  photos: MarsApiPhoto[]
}

interface MarsApiPhoto {
  id: number
  camera: { 
    full_name: string 
  }
  img_src: string
  rover: {
    name: string
  }
}

export async function loadData(sol: number): Promise<MarsApiResponse> {
  const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/photos?sol=${sol}&api_key=${apiKey}`)
  return response.json()
}
