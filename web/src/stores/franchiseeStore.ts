import { ref } from 'vue'
import { defineStore } from 'pinia'
import conf from '@/conf'
import type Franchisee from '@/assets/ts/interfaces/Franchisee'
import type Campground from '@/assets/ts/interfaces/Campground'
import type CampsiteGroup from '@/assets/ts/interfaces/CampsiteGroup'
import type Campsite from '@/assets/ts/interfaces/Campsite'
import { logoIonic } from 'ionicons/icons'
import MeritGroup from '@/assets/ts/interfaces/MeritGroup'
import { updateItemProps, removeFromArray } from './utils'

export const useFranchisee = defineStore('franchisee', () => {
    const franchisees = ref<Franchisee[]>([])

    let ID = 0
    function getId() {
        return ID++
    }
    const NO_FRANCHISEE_MSG = '가맹 정보가 존재하지 않습니다.'
    function isFranchiseePresent(id: Number) {
        if (franchisees.value.filter(x => x.id == id).length == 1) {
            return true
        }
    }

    function isCampgroundPresent(franchiseeId: number) {
        const franch = franchisees.value.filter(x => x.id == franchiseeId)[0]
        if (franch != null) return franch.campgrounds.length != 0
    }
    function isCampsiteGroupPresent(franchiseeId: number) {
        const franch = franchisees.value.filter(x => x.id == franchiseeId)[0]
        if (franch != null) return franch.campgrounds.some(x => x.campsiteGroups.length != 0)
    }

    function createFranchisee(): Franchisee {
        return {
            id: null,
            ownerName: '',
            ownerAddress: '',
            ownerPhoneNumber: '',
            companyName: '',
            companyRegistrationNumber: '',
            companyAddress: '',
            companyEmail: '',
            companyPhoneNuber: '',
            campgrounds: []
        }
    }

    function createCampground(franchiseeId: number): Campground {
        return {
            id: null,
            name: '',
            address: '',
            phoneNumber: '',
            campsiteGroups: [],
            isActive: false,
            franchiseeId: franchiseeId
        }
    }

    function createCampsiteGroup(campgroundId: number | null): CampsiteGroup {
        return {
            id: null,
            name: '',
            checkin: conf.defaultCheckinTime,
            checkout: conf.defaultCheckoutTime,
            merits: [],
            campsites: [],
            isActive: false,
            description: '',
            campgroundId: campgroundId!
        }
    }

    function createCampsite(campsiteGroupId: number): Campsite {
        return {
            id: null,
            campsiteGroupId: campsiteGroupId,
            coordinate: null,
            name: '',
            isActive: true,
        }
    }

    // TODO: parent, children 관계로 일반화하기
    function registerFranchisee(franch: Franchisee) {
        if (franch.id == null) {
            franch.id = getId()
            franchisees.value.push(franch)
        } else {
            const oldFranchisee = getFranchisee(franch.id)
            if (oldFranchisee != null) {
                updateItemProps(oldFranchisee, franch)
            }
        }
    }
    function registerCampground(campg: Campground) {
        const franchisee = getFranchisee(campg.franchiseeId)

        // 알려지지 않은 캠프그라운드라면 새로운 캠프그라운드
        if (campg.id == null) {
            campg.id = getId()
            if (franchisee != null) franchisee.campgrounds.push(campg)
        } else {
            const oldCampg = getCampground(campg.id)
            if (oldCampg) {
                updateItemProps(oldCampg, campg)
            } else {
                throw { error: 'unknown campground' }
            }
        }
    }
    function registerCampsiteGroup(campsGroup: CampsiteGroup) {
        const campg = getCampground(campsGroup.campgroundId)
        if (campg == null) {
            throw { error: 'campground of campsite-group is unknown' }
        }

        if (campsGroup.id == null) {
            campsGroup.id = getId()
            // camps 는 group 생성 과정 중에 함께 생성되어 id 가 없음
            campsGroup.campsites.forEach(x => x.campsiteGroupId = campsGroup.id)
        } else {
            const oldCampsGroup = getCampsiteGroup(campsGroup.id)
            if (oldCampsGroup) {
                const oldCampg = getCampground(oldCampsGroup.campgroundId)
                if (oldCampg != null) {
                    removeFromArray(
                        oldCampg.campsiteGroups,
                        campsGroup,
                        (arrayItem: CampsiteGroup, item: CampsiteGroup) => arrayItem.id == item.id
                    )
                }
                updateItemProps(oldCampsGroup, campsGroup)
            } else {
                throw { error: 'unknown campsiteGroup' }
            }
        }
        campg.campsiteGroups.push(campsGroup)
    }
    function registerCampsite(camps: Campsite, campsGroup: CampsiteGroup) {
        // campsiteGroup 이 등록되기 이전에 편집할 수 있으므로, 예외적으로 부모 객체를 받아서 처리해야 함
        if (camps.id == null) {
            camps.id = getId()
            if (campsGroup != null) campsGroup.campsites.push(camps)
            else throw { error: 'campsGroup of campsite not found' }
        } else {
            const oldCamps = campsGroup.campsites.filter(x => x.id == camps.id)[0]
            if (oldCamps != null) {
                updateItemProps(oldCamps, camps)
            }
        }
    }

    // TODO: need better caching
    function getFranchisee(franchiseeId: number) {
        for (const franch of franchisees.value) {
            if (franch.id == franchiseeId) return franch
        }
    }

    function getCampground(campgroundId: number): Campground | undefined {
        for (const franch of franchisees.value) {
            for (const campg of franch.campgrounds) {
                if (campg.id == campgroundId) return campg
            }
        }
    }

    function getCampsiteGroup(campsiteGroupId: number): CampsiteGroup | undefined {
        for (const franch of franchisees.value) {
            for (const campg of franch.campgrounds) {
                for (const campsGroup of campg.campsiteGroups) {
                    if (campsGroup.id == campsiteGroupId) return campsGroup
                }
            }
        }
    }

    function getCampsite(campsId: number) {
        for (const franch of franchisees.value) {
            for (const campg of franch.campgrounds) {
                for (const campsGroup of campg.campsiteGroups) {
                    for (const camps of campsGroup.campsites) {
                        if (camps.id == campsId) return camps
                    }
                }
            }
        }
    }

    function deleteFranchisee(franchisee: Franchisee) {
        return removeFromArray(franchisee.value, franchisee, (arrayItem: Franchisee, item: Franchisee) => arrayItem.id == item.id)
    }

    function deleteCampground(campg: Campground) {
        const franchisee = getFranchisee(campg.franchiseeId)
        if (franchisee != null) {
            let idx
            franchisee.campgrounds.forEach((x, i) => {
                if (x.id == campg.id) idx = i
            })
            if (idx != null) return franchisee.campgrounds.splice(idx, 1)[0]
        }
    }

    function deleteCampsiteGroup(campsGroup: CampsiteGroup) {
        const campg = getCampground(campsGroup.campgroundId)
        if (campg != null) {
            let idx
            campg.campsiteGroups.forEach((x, i) => {
                if (x.id == campsGroup.id) idx = i
            })
            if (idx != null) return campg.campsiteGroups.splice(idx, 1)[0]
        }
    }

    function deleteCampsite(campsite: Campsite, campsGroup: CampsiteGroup) {
        // campsiteGroup 이 등록되기 이전에 편집할 수 있으므로, 예외적으로 부모 객체를 받아서 처리해야 함
        let idx
        campsGroup.campsites.forEach((x, i) => {
            if (x.id == campsite.id) idx = i
        })
        if (idx != null) return campsGroup.campsites.splice(idx, 1)[0]
    }

    function getMerits(): MeritGroup[] {
        // 숙박: 숙박 형태, 바닥 종류 등
        // 시설: 위생시설, 기타 캠핑 관련 시설
        // 지역: 자연환경(산, 바다), 여가시설(산책로, 숲 당방로) 관련 환경
        return [
            {
                value: 'accomodation',
                text: '숙박',
                selectionRule: 'SINGLE',
                merits: [
                    {
                        value: 'grass',
                        text: '잔디',
                        description: '텐트 설치를 위한 잔디 바닥이 제공됩니다',
                        icon: logoIonic,
                        group: 'accomodation',
                        isActive: false
                    },
                    {
                        value: 'deck',
                        text: '데크',
                        description: '텐트 설치를 위한 데크 바닥이 제공됩니다',
                        icon: logoIonic,
                        group: 'accomodation',
                        isActive: false
                    }
                ]
            },
            {
                value: 'facility',
                text: '시설',
                selectionRule: 'MULTIPLE',
                merits: [
                    {
                        value: 'treeShadow',
                        text: '나무 그늘',
                        description: '나무가 캠핑장에 그늘을 제공합니다',
                        icon: logoIonic,
                        group: 'facility',
                        isActive: false
                    },
                    {
                        value: 'privateToilet',
                        text: '개인 화장실',
                        description: '1인용 화장실이 제공됩니다',
                        icon: logoIonic,
                        group: 'facility',
                        isActive: false
                    },
                    {
                        value: 'privateShower',
                        text: '개인 샤워실',
                        description: '1인용 샤워실이 제공됩니다',
                        icon: logoIonic,
                        group: 'facility',
                        isActive: false
                    },
                    {
                        value: 'wifi',
                        text: '와이파이',
                        description: '무선 인터넷 연결이 제공됩니다',
                        icon: logoIonic,
                        group: 'facility',
                        isActive: false
                    },
                    {
                        value: 'sink',
                        text: '개수대',
                        description: '수도를 사용할 수 있습니다',
                        icon: logoIonic,
                        group: 'facility',
                        isActive: false
                    },
                    {
                        value: 'kitchen',
                        text: '부엌',
                        description: '화구와 조리대가 제공됩니다',
                        icon: logoIonic,
                        group: 'facility',
                        isActive: false
                    },
                    {
                        value: 'firepit',
                        text: '모닥불 허용',
                        description: '모닥불을 피울 수 있습니다',
                        icon: logoIonic,
                        group: 'facility',
                        isActive: false
                    }
                ]
            },
            {
                value: 'vicinity',
                text: '주변',
                selectionRule: 'MULTIPLE',
                merits: [
                    {
                        value: 'forest',
                        text: '숲',
                        description: '주위에 방문할 수 있는 숲이 있습니다',
                        icon: logoIonic,
                        group: 'vicinity',
                        isActive: false
                    },
                    {
                        value: 'pond',
                        text: '호수',
                        description: '주위에 방문할 수 있는 호수가 있습니다',
                        icon: logoIonic,
                        group: 'vicinity',
                        isActive: false
                    },
                    {
                        value: 'sea',
                        text: '바다',
                        description: '주위에 방문할 수 있는 바다가 있습니다',
                        icon: logoIonic,
                        group: 'vicinity',
                        isActive: false
                    },
                    {
                        value: 'village',
                        text: '마을',
                        description: '주변에 방문할 수 있는 마을이 있습니다',
                        icon: logoIonic,
                        group: 'vicinity',
                        isActive: false
                    }
                ]
            }
        ]
    }
    return {
        franchisees,
        isFranchiseePresent, isCampgroundPresent, isCampsiteGroupPresent,
        createFranchisee, createCampground, createCampsiteGroup, createCampsite,
        registerFranchisee, registerCampground, registerCampsiteGroup, registerCampsite,
        deleteCampground, deleteCampsiteGroup, deleteCampsite, deleteFranchisee,
        getFranchisee, getCampground, getMerits,
        NO_FRANCHISEE_MSG
    }
})