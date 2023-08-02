import type Role from './Role'
import type Franchisee from './Franchisee'

export default interface Operator {
    id: number | null
    nickname: string
    password: string
    role: Role

    name: string
    phoneNumber: string
    email: string
    address: string

    isActive: boolean
    franchisees: Franchisee[]
}