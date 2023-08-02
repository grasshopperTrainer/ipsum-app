import type CampsiteGroup from './CampsiteGroup'

export default interface Campground {
    id: number | null
    name: string
    address: string
    phoneNumber: string
    isActive: boolean
    campsiteGroups: CampsiteGroup[]
    franchiseeId: number
    [key: string]: any
}