import { Photo } from "./Photo"

export interface Member {
  id: number
  username: string
  age: number
  photoUrl: string
  knowAs: string
  created: Date
  lastActive: Date
  introduction: string
  interests: string
  lookingFor: string
  city: string
  country: string
  photos: Photo[]
}


