<template>
    <div class="view-content" ref="viewContent">

    </div>
</template>
<script>
// @ is an alias to /src
import scriptLoad from '@/utils/loadScript';

export default {
    name: "ht",
    data(){
        return {
            dataModel:null,
            graph:null,
            dm:null,
            domElement:null
        }
    },
    mounted() {
        this.htSetDefault();
    },
    methods: {
        drawPage(){
            let node1 = this.createNode(550, 70, {'shape': 'rect'});
            let node2 = this.createNode(700, 70, {'shape': 'rect'});
            node1.setSize(80, 100);
            node2.setSize(80, 100);
            this.createEdge(node1, node2,{
                'edge.type': 'points',
                'edge.offset': 0,
                'edge.source.position': 8,
                'edge.source.offset.x': -10,
                'edge.source.offset.y': 10,
                'edge.target.position': 6,
                'edge.target.offset.x': 10,
                'edge.target.offset.y': 10
            });
        },
        htInit(){
            this.dataModel = new ht.DataModel();
            this.graph = window.graph = new ht.graph.GraphView(this.dataModel);
            this.dm = window.dm = this.graph.dm();
            this.domElement = this.graph.getView();
            this.$refs.viewContent.appendChild(this.domElement);
            this.drawPage();
        },
        htSetDefault(){
            scriptLoad('ht','http://localhost:8888/demo/lib/ht.js', (err) => {
                if (err) {
                    return
                }

                window.dataModel = new ht.DataModel();
                window.graphView = new ht.graph.GraphView(dataModel);
                window.view = graphView.getView();
                window.view.className = 'main';
                document.body.appendChild(window.view);
                window.addEventListener('resize', function (e) {
                    window.graphView.invalidate();
                }, false);

                var node = createNode(150, 150);
                node.setSize(50, 50);
                node.setStyle('shape', 'circle');
                node.setStyle('shape.background', 'red');
                node.setStyle('shape.gradient', 'radial.center');
                node.setStyle('label.max', 260);
                node.setStyle('label.position', 17);
                node.setStyle('label.font', '15px Arial');
                node.setStyle('note', 'Drag me to rotate label');

                var angle = Math.PI/3;
                node.setStyle('label.rotation', angle);

                window.graphView.getLabel = function(data){
                    if(data === node){
                        var p = data.getPosition();
                        return 'Position x:' + p.x + ', y:' + p.y + ', Pretty long long long long long label';
                    }
                    return data.getName();
                };

                window.graphView.addInteractorListener(function(e){
                    if(window.graphView.isSelected(node) && e.kind === 'betweenMove'){
                        angle -= Math.PI/20;
                        node.setStyle('label.rotation', angle);
                    }
                });

                let n1 = createNode(500, 100, 'source');
                let n2 = createNode(300, 200, 'target');
                let n3 = createNode(800, 100, 'source');
                let n4 = createNode(600, 200, 'target');

                createEdge(n1, n2, 'HT', 'yellow');
                createEdge(n1, n2, 'HT for Web', 'yellow');
                createEdge(n1, n2, 'www.hightopo.com', 'yellow');

                createEdge(n3, n4, 'HT', 'pink', true);
                createEdge(n3, n4, 'HT for Web', 'pink', true);
                createEdge(n3, n4, 'www.hightopo.com', 'pink', true);

                function createNode(x, y, name){
                    var node = new window.ht.Node();
                    node.setPosition(x, y);
                    node.setName(name);
                    window.dataModel.add(node);
                    return node;
                }

                function createEdge(n1, n2, name, background, fixed){
                    var edge = new window.ht.Edge(n1, n2);
                    edge.setName(name);
                    edge.setStyle('edge.gap', 30);
                    edge.setStyle('label.position.fixed', fixed);
                    edge.setStyle('label.background', background);
                    window.dataModel.add(edge);
                    return edge;
                }


                return
                ht.Default.setImage('toArrow', {
                    width: 100,
                    height: 50,
                    comps: [
                        {
                            type: 'shape',
                            points: [2, 25, 30, 25],
                            borderWidth: 4,
                            borderColor: 'rgba(255, 0, 0, 0.9)'
                        },
                        {
                            type: 'shape',
                            points: [30, 10, 30, 40, 50, 25, 30, 10],
                            background: 'rgba(255, 0, 0, 0.9)',
                            borderWidth: 1,
                            borderColor: 'red',
                            gradient: 'spread.vertical',
                            gradientColor: 'rgba(255, 255, 255, 0.9)'
                        }
                    ]
                });
                ht.Default.setImage('fromArrow', {
                    width: 100,
                    height: 50,
                    comps: [
                        {
                            type: 'image',
                            name: 'toArrow',
                            rect: [0, 0, 100, 50],
                            rotation: Math.PI
                        }
                    ]
                });
                ht.Default.setImage('basic', {
                    width: 200,
                    height: 200,
                    comps: [
                        {
                            type: 'star',
                            rect: [17, 180, 180],
                            background: 'red',
                            gradient: 'radial.center',
                            gradientColor: 'yellow',
                            borderWidth: 5,
                            dashOffset: {
                                func: function (data) {
                                    return data.s("vector.dash.offset");
                                }
                            },
                            dash: true,
                            dashPattern: [10, 10],
                            dashColor: '#1abc9c',
                            borderColor: '#0069d6'
                        }
                    ]
                });
                this.htInit();
            })
        },
        createNode(x, y, style){
            let node = new ht.Node();
            node.s({
                'shape': 'rect',
                'opacity': 0.5
            });
            node.setPosition(x, y);
            node.setSize(20, 20);
            if(style){
                node.s(style);
            }
            this.dataModel.add(node);
            return node;
        },
        createEdge(sourceNode, targetNode, typeOrStyle) {
            let edge = new ht.Edge(sourceNode, targetNode);
            if (typeof typeOrStyle === 'object') {
                edge.s(typeOrStyle);
            } else {
                edge.s('edge.type', typeOrStyle);
            }
            this.dataModel.add(edge);
            return edge;
        }
    }
};
</script>
<style lang="scss" scoped>
    .view-content{position: absolute;width: 100%;height: 100%;top:0;left:0;}
</style>
