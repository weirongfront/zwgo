<template>
    <div class="menu-panel">
        <el-button type="success">生成数据</el-button>
        <el-tree
            class="menu-tree"
            :data="data"
            node-key="id"
            default-expand-all
            :expand-on-click-node="false">
            <div class="custom-tree-node" slot-scope="{ node, data }">
                <el-input class="menu-title" v-model="node.label"></el-input>
                <span>
                    <el-button
                        type="success"
                        size="mini"
                        @click="() => addContent(node,data)">
                        选择内容
                    </el-button>
                    <el-button
                    type="warning"
                    size="mini"
                    @click="() => append(data)">
                    添加子节点
                    </el-button>
                    <el-button
                    type="danger"
                    size="mini"
                    @click="() => remove(node, data)">
                    删除
                    </el-button>
                </span>
            </div>
        </el-tree>
    </div>
</template>
<script>
// @ is an alias to /src
let id=1000;
export default {
    name: "tool-menu",
    data() {
        const data = [{
            id: 1,
            label: '一级 1',
            children: [{
                id: 4,
                label: '二级 1-1',
                children: [{
                    id: 9,
                    label: '三级 1-1-1'
                }, {
                    id: 10,
                    label: '三级 1-1-2'
                }]
            }]
        }, {
            id: 2,
            label: '一级 2',
            children: [{
                id: 5,
                label: '二级 2-1'
            }, {
                id: 6,
                label: '二级 2-2'
            }]
        }, {
            id: 3,
            label: '一级 3',
            children: [{
                id: 7,
                label: '二级 3-1'
            }, {
                id: 8,
                label: '二级 3-2'
            }]
        }];
        return {
            data: JSON.parse(JSON.stringify(data))
        }
    },
    methods: {
        addContent(node,data){
            console.log(node, data);
        },
        append(data) {
            const newChild = {id: id++, label: 'testtest', children: []};
            if (!data.children) {
                this.$set(data, 'children', []);
            }
            data.children.push(newChild);
        },
        remove(node, data) {
            const parent = node.parent;
            const children = parent.data.children || parent.data;
            const index = children.findIndex(d => d.id === data.id);
            children.splice(index, 1);
        }
    }
};
</script>
<style lang="scss">
    .menu-panel {
        .el-tree-node__content{padding-top: 20px!important;padding-bottom: 20px!important;}
        .el-input__inner{height:30px;line-height: 30px;}
    }
</style>
<style lang="scss" scoped>
    .menu-panel {
        .menu-tree{width: 800px;margin: 0 auto;}
        .custom-tree-node {
            .menu-title{width: 400px;}
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 14px;
            padding:20px 8px 20px 0;
        }
    }
</style>
