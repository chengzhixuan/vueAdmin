<template>
    <Container menuLeft="/">
        <template v-slot:main>
            <el-main class="RouterPage HomePage">
                <div @click="$router.push('/fsfd')">444444</div>
            </el-main>
        </template>
    </Container>
</template>
<script>
export default {
    name: 'Home',
    components: {},
};
</script>
