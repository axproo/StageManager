import { useRouter } from 'vue-router'
import { authService } from '@/services/auth.service'

export function useCheckAccount() {
  const router = useRouter()

  const checkAccount = async (email: string) => {
    const exists = await authService.checkAccount(email)

    if (exists) {
      await router.push('/login')
    } else {
      await router.push('/complete-profile')
    }
  }

  return {
    checkAccount,
  }
}