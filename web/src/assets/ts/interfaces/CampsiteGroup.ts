import Campsite from "./Campsite"

export default interface Campground {
    uuid?: string
    name: string
    campsites: Campsite[]
}