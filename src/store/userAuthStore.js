import { defineStore } from "pinia"

export const useAuthStore = defineStore(('userStore'), {
    state: () => {
        return {
            authUser: 'Suzuki'
        }
    }
})