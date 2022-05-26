<template>
    <Container menuLeft="/editor">
        <template v-slot:main>
            <el-main class="RouterPage EditorLine">
                <Editor v-model="content" api-key="0mfe3zktpeq7p77e1lprk9aust6b2n4lyvdyqfljwy05iozi" :init="init" />
                <el-button @click="save()" class="self-btn-28" type="primary">
                    保存
                </el-button>
            </el-main>
        </template>
    </Container>
</template>
<script setup>
import Editor from '@tinymce/tinymce-vue'
import { onMounted, ref } from 'vue';
let content = ref('')
let init = ref({
    width: 900,
    height: 500,
    language: 'zh_CN',
    images_upload_handler: (e) => setupEdit(e),
    // plugins: 'preview powerpaste casechange importcss tinydrive searchreplace autolink autosave save directionality advcode visualblocks visualchars fullscreen image link media mediaembed template codesample table pagebreak nonbreaking anchor tableofcontents insertdatetime advlist lists checklist wordcount tinymcespellchecker a11ychecker editimage help formatpainter permanentpen pageembed charmap tinycomments mentions quickbars linkchecker emoticons advtable export'
    plugins: 'preview autosave save image link media table nonbreaking lists wordcount help quickbars emoticons'
})
onMounted(() => {
})
const save = () => {
    console.log('编辑内容:' + content.value);
}
const setupEdit = (v) => {
    console.log('图片名称:' + v.filename());
}
</script>
<style lang="less" scoped>
.EditorLine {
    padding: 20px;

    align-items: flex-start;
}
</style>
