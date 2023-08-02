import { ref } from 'vue'
import { defineStore } from 'pinia'
import { updateItemProps } from './utils'
import type Operator from '@/assets/ts/interfaces/Operator'
import type Role from '@/assets/ts/interfaces/Role'

export const useOperator = defineStore('operator', () => {
    const operators = ref<Operator[]>([])
    const roles = [
        {
            text: '지기장',
            value: 1,
            description: '사업장 관리자로써 캠핑장 전체 운영 책임'
        },
        {
            text: '지기',
            value: 2,
            description: '직원으로써 일상 운영에 참여'
        }
    ]  

    let ID = 0
    function getId() {
        return ID++
    }

    function createOperator(): Operator {
        return {
            id: null,
            nickname: '',
            password: '',
            role: {} as Role,

            name: '',
            phoneNumber: '',
            email: '',
            address: '',

            isActive: true,
            franchisees: []
        }
    }

    function getOperator(id: number) {
        return operators.value.filter(x => x.id == id)[0]
    }
    
    function registerOperator(oper: Operator) {
        if (oper.id == null) {
            oper.id = getId()
            operators.value.push(oper)
        } else {
            const oldOper = operators.value.filter(x => x.id == oper.id)[0]
            if (oldOper != null) updateItemProps(oldOper, oper)
        }
    }

    function deleteOperator(oper: Operator) {
        let idx
        operators.value.forEach((x, i) => {
            if (x.id == oper.id) idx = i
        })
        if (idx != null) return operators.value.splice(idx, 1)[0]
    }

    function getRoles(): Role[] {
        return roles  
    }

    return {
        operators,
        
        createOperator, getOperator, registerOperator, deleteOperator,
        getRoles
    }
})