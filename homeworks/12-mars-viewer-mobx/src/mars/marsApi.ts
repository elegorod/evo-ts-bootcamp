
const apiKey = process.env.REACT_APP_NASA_API_KEY

export interface MarsApiResponse {
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
