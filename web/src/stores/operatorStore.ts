import { ref } from 'vue'
import { defineStore } from 'pinia'
import type Campground from '@/assets/ts/interfaces/Campground'
import type Franchisee from '@/assets/ts/interfaces/Franchisee'

export const useOperator = defineStore('operator', () => {
    const franchisee = ref<null | Franchisee>(null)
    const campgrounds = ref<Campground[]>([])

    function isFranchiseePresent() {
        return franchisee.value != null
    }

    function isCampgroundsPresent() {
        return campgrounds.value.length != 0
    }

    return { franchisee, campgrounds, isFranchiseePresent, isCampgroundsPresent }
})