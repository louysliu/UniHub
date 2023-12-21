<template>
    <div class="file-manager">
        <!-- 左侧第一个侧边栏 -->
        <div class="sidebar">
            <div class="user-info">
                <!-- 头像和昵称 -->
                <img :src="avatarUrl" alt="Avatar" class="avatar">
                <p class="nickname">{{ userData.userDataFromMySQL.nickname }}</p>
            </div>
            <!-- 文件管理器和作业管理器按钮 -->
            <div class="navigation">
                <button @click="showFileManager">文件管理器</button>
                <button @click="showHomeworkManager">作业管理器</button>
            </div>
        </div>

        <!-- 左侧第二个侧边栏 -->
        <div class="sidebar" :style="{ width: sidebarWidth + 'px' }">
            <TreeView :data="userFoldersAndFiles" @folderClick="toggleFolder" @documentClick="showDocument" />
        </div>

        <!-- 右侧空白页面 -->
        <div class="main-content">
            <div v-if="selectedDocument">
                <div class="document-header">
                    <h2>{{ selectedDocument.file_name }}</h2>
                    <button @click="startEditing" v-if="!isEditing">编辑</button><!-- 编辑按钮 -->
                    <button @click="saveDocumentChanges" v-if="isEditing">保存</button> <!-- 保存按钮 -->
                </div>
                <div class="document-content">
                    <!-- 文档内容 -->
                    <textarea v-model="documentContent" :disabled="!isEditing"></textarea>
                </div>
            </div>
            <div v-else>
                请选择一个文档来显示内容。
            </div>
        </div>
    </div>
</template>
  
<script>
import TreeView from './TreeView.vue'; // 导入树形组件
import { mapState } from 'vuex';

export default {
    components: {
        TreeView,
    },
    data() {
        return {
            avatarUrl: require('../assets/logo.png'),
            isEditing: false, // 标记是否处于编辑模式
            documentContent: '', // 文档内容
        };
    },
    computed: {
        ...mapState({
            userData: state => state.userData.UserHomeData,
            userFoldersAndFiles: state => state.userData.UserHomeData.userFoldersAndFiles,
            selectedDocument: state => state.selectedDocument, // 获取选中的文档
            // 可以根据需要继续映射其他状态
        }),
        sidebarWidth() {
            return this.calculateSidebarWidth(this.userFoldersAndFiles);
        },
    },
    methods: {
        showFileManager() {
            this.$router.push('file-manager'); // 跳转到文件管理器页面
        },
        showHomeworkManager() {
            this.$router.push('ddl-manager'); // 跳转到作业管理器页面
        },
        toggleFolder(folder) {
            this.$store.commit('TOGGLE_FOLDER_EXPANDED', folder);
        },
        showDocument(document) {
            this.$store.commit('SET_SELECTED_DOCUMENT', document); // 设置选中的文档
            this.selectedDocument = document; // 更新选中文档
            this.documentContent = document.content; // 更新文档内容
            this.$store.commit('UPDATE_SELECTED_DOCUMENT_CONTENT', document); // 更新 Vuex 中选中文档内容

        },
        startEditing() {
            this.isEditing = true; // 开始编辑
            // 将文档内容初始化为选中文档的内容
            this.documentContent = this.selectedDocument.content; // 这里假设选中文档的内容存储在 content 属性中，请根据实际情况修改
        },
        saveDocumentChanges() {
            // 保存文档内容的逻辑
            // 将编辑后的文档内容保存到选中文档的属性中
            this.selectedDocument.content = this.documentContent; // 更新文档内容
            this.isEditing = false; // 退出编辑模式

            // 提交 mutation 更新 Vuex 中的选中文档内容
            this.$store.commit('UPDATE_SELECTED_DOCUMENT_CONTENT', this.selectedDocument);
        },
        calculateSidebarWidth(items) {
            let maxWidth = 200; // 最小宽度
            function calculateMaxWidthRecursive(items) {
                for (const item of items) {
                    maxWidth = Math.max(maxWidth, 200 + (item.expanded ? calculateMaxWidthRecursive(item.children) : 0));
                }
                return maxWidth;
            }
            return calculateMaxWidthRecursive(items);
        },
    },
};
</script>
  
<style>
/* 样式可以根据需要进行调整 */
.file-manager {
    display: flex;
    height: 100vh;
}

.sidebar {
    border-right: 1px solid #ccc;
    padding: 20px;
    overflow-x: hidden;
    transition: width 0.3s ease;
}

.user-info {
    text-align: center;
    margin-bottom: 20px;
}

.avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
}

.navigation {
    display: flex;
    flex-direction: column;
}

.main-content {
    flex: 1;
    padding: 20px;
}
</style>
  