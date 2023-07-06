import type Merit from "./Merit"

export default interface MeritGroup {
  value: string
  text: string
  selectionRule: 'SINGLE' | 'MULTIPLE'
  merits: Merit[]
}
