<template>
    <Container menuLeft="/">
        <template v-slot:main>
            <el-main class="RouterPage HomePage">
                <div @click="goPage()">home</div>
                {{ userMsg }}
                {{ getUserMsg }}
            </el-main>
        </template>
    </Container>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import { PublicStore } from '@/store/Public'
import { storeToRefs } from 'pinia'
const store = PublicStore()
const { userMsg, getUserMsg } = storeToRefs(store)
const router = useRouter()
const goPage = () => {
    store.setUserMsg({
        userName: '54hs34',
        token: 34523462456342563456,
    })
}
</script>
