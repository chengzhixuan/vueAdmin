<template>
    <Container menuLeft="/">
        <template v-slot:main>
            <el-main class="RouterPage HomePage">
                <div @click="goPage()">home</div>
            </el-main>
        </template>
    </Container>
</template>
<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const goPage = () => {
    router.push('/ghtt')
}
</script>
