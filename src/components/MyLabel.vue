<template>
  <div class="label">
    <div class="headline">兴趣分布</div>
    <div id="div1" v-if="hackReset">
      <a href="#" onclick="return false" v-for="(item, index) in label_data" :class="color(index)" :key="index">{{item.item}}</a>
    </div>
  </div>
</template>
<script>
export default {
  props: {
      label_data: {
        type: Array,
        default(){
          return [
                    {
                        "item": "动植物",
                        "value": 1
                    },
                    {
                        "item": "创意",
                        "value": 1
                    },
                    {
                        "item": "文化教育",
                        "value": 1
                    },
                    {
                        "item": "美食",
                        "value": 3
                    },
                    {
                        "item": "亲子",
                        "value": 2
                    },
                    {
                        "item": "生活",
                        "value": 6
                    },
                    {
                        "item": "辅助标签",
                        "value": 1
                    },
                    {
                        "item": "时尚",
                        "value": 1
                    },
                    {
                        "item": "拍摄",
                        "value": 4
                    },
                    {
                        "item": "旅行",
                        "value": 1
                    }
                ]
        }
      }
  },
  data() {
    return{
      hackReset: true
    }
  },
  methods: {
    color(num){
    var classname
        switch((num+1)%4) {
          case 0:
            classname = '';
            break;
          case 1:
            classname = 'red';
            break;
          case 2:
            classname = 'blue';
            break;
          case 3:
            classname = 'yellow';
            break;
          default:
            console.log('no match',(num+1)%4,num)
        }
      return classname
     },
     hack() {
       this.hackReset = false
       
       this.$nextTick(() => {
       this.hackReset = true
       console.log("nextTick!!!")
       })
     },
     initLabel() {
       var thisVue = this;
       var radius = 120;
       var dtr = Math.PI/180;
       var d=300;
       
       var mcList = [];
       var active = false;
       var lasta = 1;
       var lastb = 1;
       var distr = true;
       //速度
       var tspeed=3;
       var size=250;
       
       var mouseX=0;
       var mouseY=0;
       
       var howElliptical=1;
       
       var aA=null;
       var oDiv=null;
    
    
       var i=0;
       var oTag=null;
    	
    	 oDiv=document.getElementById('div1');
    	 //获取label数组
       aA=oDiv.getElementsByTagName('a');
    	
    	 for(i=0;i<aA.length;i++){
         //将label的value属性加入以决定label的大小
         aA[i].font_size = thisVue.label_data[i].value
 
    	 	oTag={};
    	 	
    	 	oTag.offsetWidth=aA[i].offsetWidth;
    	 	oTag.offsetHeight=aA[i].offsetHeight;
    	 	
    	 	mcList.push(oTag);
       }
     
       var sa, ca, sb, cb, sc, cc
       function sineCosine( a, b, c) {
         	sa = Math.sin(a * dtr);
         	ca = Math.cos(a * dtr);
         	sb = Math.sin(b * dtr);
         	cb = Math.cos(b * dtr);
         	sc = Math.sin(c * dtr);
         	cc = Math.cos(c * dtr);
         }
    	 
    	 sineCosine( 0,0,0 );
    	 
       positionAll();
    	 
    	 oDiv.onmouseover=function () {
    	 	active=true;
    	 };
    	 
    	 oDiv.onmouseout=function () {
    	 	active=false;
    	 };
    	 
    	 oDiv.onmousemove=function (ev){
    	 	var oEvent=window.event || ev;
    	 	
    	 	mouseX=oEvent.clientX-(oDiv.offsetLeft+oDiv.offsetWidth/2);
    	 	mouseY=oEvent.clientY-(oDiv.offsetTop+oDiv.offsetHeight/2);
    	 	
    	 	mouseX/=5;
    	 	mouseY/=5;
    	 };
    	
    	 setInterval(update, 30);
    
    function update(){
    	var a;
    	var b;
    	
    	if(active){
    		a = (-Math.min( Math.max( 90-mouseY, -size ), size ) / radius ) * tspeed;
    		b = (Math.min( Math.max( -mouseX, -size ), size ) / radius ) * tspeed;
    	}
    	else
    	{
    		a = lasta * 0.98;
    		b = lastb * 0.98;
    	}
    	
    	lasta=a;
    	lastb=b;
    	
    	if(Math.abs(a)<=0.01 && Math.abs(b)<=0.01)
    	{
    		return;
    	}
    	
    	var c=0;
    	sineCosine(a,b,c);
    	for(var j=0;j<mcList.length;j++){
    		var rx1=mcList[j].cx;
    		var ry1=mcList[j].cy*ca+mcList[j].cz*(-sa);
    		var rz1=mcList[j].cy*sa+mcList[j].cz*ca;
    		
    		var rx2=rx1*cb+rz1*sb;
    		var ry2=ry1;
    		var rz2=rx1*(-sb)+rz1*cb;
    		
    		var rx3=rx2*cc+ry2*(-sc);
    		var ry3=rx2*sc+ry2*cc;
        var rz3=rz2;
    		
    		mcList[j].cx=rx3;
    		mcList[j].cy=ry3;
    		mcList[j].cz=rz3;
    		
    	  var	per=d/(d+rz3);
    		
    		mcList[j].x=(howElliptical*rx3*per)-(howElliptical*2);
    		mcList[j].y=ry3*per;
    		mcList[j].scale=per;
    		mcList[j].alpha=per;
    		
    		mcList[j].alpha=(mcList[j].alpha-0.6)*(10/6);
    	}
    	
    	doPosition();
    	depthSort();
    }
    
    function depthSort() {
    	var i=0;
    	var aTmp=[];
    	
    	for(i=0;i<aA.length;i++) {
    		aTmp.push(aA[i]);
    	}
    	
    	aTmp.sort(function (vItem1, vItem2)	{
    			if(vItem1.cz>vItem2.cz)
    			{
    				return -1;
    			}
    			else if(vItem1.cz<vItem2.cz)
    			{
    				return 1;
    			}
    			else
    			{
    				return 0;
    			}
    		}
    	);
    	
    	for(i=0;i<aTmp.length;i++) {
    		aTmp[i].style.zIndex=i;
    	}
    }
    
    function positionAll() {
    	var phi=0;
    	var theta=0;
    	var max=mcList.length;
    	var i=0;
    	
    	var aTmp=[];
    	var oFragment=document.createDocumentFragment();
    	
    	//�������
    	for(i=0;i<aA.length;i++) {
    		aTmp.push(aA[i]);
    	}
    	
    	aTmp.sort(function (){
    			return Math.random()<0.5?1:-1;
    		}
    	);
    	
    	for(i=0;i<aTmp.length;i++) {
    		oFragment.appendChild(aTmp[i]);
    	}
    	
    	oDiv.appendChild(oFragment);
    	
    	for( var i=1; i<max+1; i++){
    		if( distr ) {
    			phi = Math.acos(-1+(2*i-1)/max);
    			theta = Math.sqrt(max*Math.PI)*phi;
    		} else {
    			phi = Math.random()*(Math.PI);
    			theta = Math.random()*(2*Math.PI);
    		}
    		//����任
    		mcList[i-1].cx = radius * Math.cos(theta)*Math.sin(phi);
    		mcList[i-1].cy = radius * Math.sin(theta)*Math.sin(phi);
    		mcList[i-1].cz = radius * Math.cos(phi);
    		
    		aA[i-1].style.left=mcList[i-1].cx+oDiv.offsetWidth/2-mcList[i-1].offsetWidth/2+'px';
    		aA[i-1].style.top=mcList[i-1].cy+oDiv.offsetHeight/2-mcList[i-1].offsetHeight/2+'px';
    	}
    }
    
    function doPosition() {
    	var l=oDiv.offsetWidth/2;
      var t=oDiv.offsetHeight/2;
    	for(var i=0;i<mcList.length;i++) {
    		aA[i].style.left=mcList[i].cx+l-mcList[i].offsetWidth/2+'px';
        aA[i].style.top=mcList[i].cy+t-mcList[i].offsetHeight/2+'px';
        aA[i].style.fontSize=Math.ceil(12*mcList[i].scale/2)+ 7 + 2*aA[i].font_size +'px';
    		
    		aA[i].style.filter="alpha(opacity="+100*mcList[i].alpha+")";
    		aA[i].style.opacity=mcList[i].alpha;
    	}
    }
     }
  },
  watch: {
    label_data() {
      this.hack();
      setTimeout(() => {
        this.initLabel();
      }, 10);
      
    }
  },
  mounted() {
    console.log("mounted!!")   

    this.initLabel();
      },
  
}
</script>
<style lang="scss" scoped>
  .label {
    width: 445px;
    position: absolute;
    top: 897px;
    left: 50px;
  }

  body {
    background-color: #eee;
  }
  #div1 {
	position:relative;
	width:350px;
  height:300px;
  margin: 0 30px 20px 90px;
  
  a {
	position:absolute;
	top:0px;
	left:0px;
	font-family: Microsoft YaHei;
	color:rgb(109, 109, 109);
	font-weight:bold;
	text-decoration:none;
	padding: 3px 6px;
  }

  a:hover {
	border: 1px solid #eee;
	background: rgba(0, 0, 0, 0);
   }
  .blue {
  color:rgb(82, 123, 235);
  }
  .yellow {
  color:rgb(221, 180, 45);
  }
  .red {
	color:rgb(216, 68, 68);
 }
}

p {
	font: 16px Microsoft YaHei;
	text-align: center;
  color: #ba0c0c;
  a {
	font-size: 14px;
	color: #ba0c0c;
  }
  a:hover {
	color: red;
  }
}
.headline {
    width: 350px;
    margin-top: 30px;
    font-size: 20px;
    margin-bottom: 15px;
    font-weight: 600;
}


</style>