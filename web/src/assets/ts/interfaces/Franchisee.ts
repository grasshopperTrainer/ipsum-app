import type Campground from "./Campground"

export default interface Franchisee {
    id: number | null
    ownerName: string
    ownerAddress: string
    ownerPhoneNumber: string

    companyName: string
    companyRegistrationNumber: string
    companyAddress: string
    companyPhoneNuber: string
    companyEmail: string

    campgrounds: Campground[]
    [key: string]: any
}