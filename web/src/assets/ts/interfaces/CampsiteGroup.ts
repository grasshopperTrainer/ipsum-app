import type Campsite from './Campsite'
import type Merit from './Merit'
import MeritGroup from './MeritGroup'

export default interface CampsiteGroup {
    id: number | null
    name: string
    checkin: string
    checkout: string
    merits: MeritGroup[]
    campsites: Campsite[]
    isActive: boolean
    campgroundId: number
    description: string
    [item: string]: any
}