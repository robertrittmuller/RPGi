//	HYPE.documents["RPGi"]

(function(){(function k(){function l(a,b,d){var c=!1;null==window[a]&&(null==window[b]?(window[b]=[],window[b].push(k),a=document.getElementsByTagName("head")[0],b=document.createElement("script"),c=h,false==!0&&(c=""),b.type="text/javascript",b.src=c+"/"+d,a.appendChild(b)):window[b].push(k),c=!0);return c}var h="RPGi.hyperesources",c="RPGi",e="rpgi_hype_container";if(false==!1)try{for(var f=document.getElementsByTagName("script"),
a=0;a<f.length;a++){var b=f[a].src;if(null!=b&&-1!=b.indexOf("rpgi_hype_generated_script.js")){h=b.substr(0,b.lastIndexOf("/"));break}}}catch(n){}if(false==!1&&(a=navigator.userAgent.match(/MSIE (\d+\.\d+)/),a=parseFloat(a&&a[1])||null,a=l("HYPE_552","HYPE_dtl_552",!0==(null!=a&&10>a||false==!0)?"HYPE-552.full.min.js":"HYPE-552.thin.min.js"),false==!0&&(a=a||l("HYPE_w_552","HYPE_wdtl_552","HYPE-552.waypoints.min.js")),a))return;
f=window.HYPE.documents;if(null!=f[c]){b=1;a=c;do c=""+a+"-"+b++;while(null!=f[c]);for(var d=document.getElementsByTagName("div"),b=!1,a=0;a<d.length;a++)if(d[a].id==e&&null==d[a].getAttribute("HYP_dn")){var b=1,g=e;do e=""+g+"-"+b++;while(null!=document.getElementById(e));d[a].id=e;b=!0;break}if(!1==b)return}b=[];b=[{name:"hypeStartStream",source:"function(hypeDocument, element, event) {\t// startStream()\n\tsocket.emit('start-stream');\n}",identifier:"42"},{name:"toggleDoor",source:"function(hypeDocument, element, event) {\t// this function sends the command to toggle the door open/closed\n\tsocket.emit('openclose-door');\n\t\n}",identifier:"53"}];d={};g={};for(a=0;a<b.length;a++)try{g[b[a].identifier]=b[a].name,d[b[a].name]=eval("(function(){return "+b[a].source+"})();")}catch(m){window.console&&window.console.log(m),
d[b[a].name]=function(){}}a=new HYPE_552(c,e,{"7":{p:1,n:"Pasted-1.png",g:"38",t:"@1x"},"3":{p:1,n:"Pasted-4.png",g:"22",t:"@1x"},"8":{p:1,n:"Pasted-8.png",g:"49",t:"@1x"},"4":{p:1,n:"Pasted-5.png",g:"24",t:"@1x"},"0":{p:1,n:"Pasted.jpg",g:"9",o:true,t:"@1x"},"9":{p:1,n:"Pasted-9.png",g:"64",t:"@1x"},"5":{p:1,n:"Pasted-6.png",g:"26",t:"@1x"},"1":{p:1,n:"Pasted-2.png",g:"17",t:"@1x"},"6":{p:1,n:"Pasted-7.png",g:"28",t:"@1x"},"2":{p:1,n:"Pasted-3.png",g:"19",t:"@1x"}},h,[],d,[{n:"MainUI",o:"1",X:[0]}],[{o:"3",p:"600px",x:0,cA:false,Z:736,Y:414,c:"#000000",L:[],bY:1,d:414,U:{},T:{"34":{i:"34",n:"Activate",z:6,b:[],a:[{f:"c",y:0,z:2,i:"f",e:-855,s:-585,o:"89"},{f:"c",y:0,z:2,i:"e",e:1,s:0,o:"82"},{f:"c",y:0,z:2,i:"e",e:1,s:0,o:"91"},{f:"c",y:0,z:2.03,i:"f",e:125,s:30,o:"75"},{f:"c",y:0,z:2,i:"e",e:1,s:0,o:"77"},{f:"c",y:2,z:4,i:"f",e:-585,s:-855,o:"89"},{y:2,i:"e",s:1,z:0,o:"91",f:"c"},{y:2,i:"e",s:1,z:0,o:"82",f:"c"},{y:2,i:"e",s:1,z:0,o:"77",f:"c"},{y:2.03,i:"f",s:125,z:0,o:"75",f:"c"},{y:6,i:"f",s:-585,z:0,o:"89",f:"c"}],f:30},"41":{i:"41",n:"ShowCamera",z:2,b:[],a:[{f:"c",y:0,z:2,i:"e",e:1,s:0,o:"82"},{f:"c",y:0,z:2,i:"e",e:1,s:0,o:"91"},{f:"c",y:0,z:2,i:"e",e:1,s:0,o:"77"},{y:2,i:"e",s:1,z:0,o:"91",f:"c"},{y:2,i:"e",s:1,z:0,o:"82",f:"c"},{y:2,i:"e",s:1,z:0,o:"77",f:"c"}],f:30},kTimelineDefaultIdentifier:{i:"kTimelineDefaultIdentifier",n:"Main Timeline",z:0,b:[],a:[],f:30},"68":{i:"68",n:"DoorOpen",z:2,b:[],a:[{f:"c",y:0,z:1,i:"e",e:0.60000000000000009,s:0.22171677215189861,o:"79"},{f:"c",y:1,z:1,i:"e",e:0.22054984177215201,s:0.60000000000000009,o:"79"},{y:2,i:"e",s:0.22054984177215201,z:0,o:"79",f:"c"}],f:30}},bZ:180,O:["81","90","79","82","77","92","85","84","86","87","80","78","89","83","75","76","88","74","91"],v:{"84":{G:"#02FDFF",aU:8,aV:8,r:"inline",e:0.63988330696202533,s:"Arial,Helvetica,Sans-Serif",bD:"auto",t:10,Z:"break-word",v:"bold",i:"doorStatus",w:"CHECKING DOOR<br>",j:"absolute",x:"visible",yy:"nowrap",k:"div",y:"preserve",z:15,aS:8,aT:8,a:289,F:"center",b:139},"89":{w:"",h:"28",p:"no-repeat",x:"visible",a:69,q:"100% 100%",b:200,j:"absolute",r:"inline",aA:{a:[{b:"34",p:3,z:false,symbolOid:"2"},{p:4,h:"42"},{p:4,h:"53"}]},z:9,k:"div",d:271,c:273,aP:"pointer",f:-585,bD:"auto"},"74":{h:"9",p:"repeat",x:"visible",a:-84,b:0,j:"absolute",r:"inline",c:583,k:"div",z:2,d:737,e:0.5,aP:"pointer"},"80":{h:"26",p:"no-repeat",x:"visible",a:197,q:"100% 100%",b:321,j:"absolute",r:"inline",c:26,k:"div",z:11,d:13},"79":{c:28,d:28,I:"Solid",e:0.22171677215189861,J:"Solid",K:"Solid",g:"#FF0300",L:"Solid",M:1,i:"doorStatusOpen",N:1,aI:"50%",A:"#D8DDE4",x:"visible",O:1,j:"absolute",aJ:"50%",k:"div",C:"#D8DDE4",z:20,B:"#D8DDE4",D:"#D8DDE4",aK:"50%",P:1,a:326,aL:"50%",b:178},"85":{G:"#02FDFF",aU:8,aV:8,r:"inline",e:0.63988330696202533,s:"Arial,Helvetica,Sans-Serif",t:10,Z:"break-word",v:"bold",w:"CAMERA<br>",j:"absolute",x:"visible",yy:"nowrap",k:"div",y:"preserve",z:16,aS:8,aT:8,a:25,b:497},"90":{c:28,d:28,I:"Solid",cY:"1",e:0.78214003164556944,J:"Solid",K:"Solid",g:"#60B400",L:"Solid",M:1,i:"doorStatusClosed",N:1,aI:"50%",A:"#D8DDE4",O:1,x:"visible",j:"absolute",aJ:"50%",k:"div",C:"#D8DDE4",z:21,B:"#D8DDE4",D:"#D8DDE4",aK:"50%",P:1,a:326,aL:"50%",b:178},"81":{h:"64",p:"no-repeat",x:"visible",a:20,q:"100% 100%",b:432,j:"absolute",r:"inline",aA:{a:[{b:"41",p:3,z:false,symbolOid:"2"},{p:4,h:"42"}]},k:"div",z:22,d:70,c:71,aP:"pointer",bD:"auto"},"75":{h:"19",p:"no-repeat",x:"visible",a:175,q:"100% 100%",b:302,j:"absolute",r:"inline",c:66,k:"div",z:7,d:66,f:30},"86":{h:"38",p:"no-repeat",x:"visible",a:310,q:"100% 100%",b:166,j:"absolute",r:"inline",z:14,k:"div",c:63,d:59,e:1,aP:"pointer"},"91":{aV:8,w:"LOADING VIDEO...<br>",a:147,x:"visible",Z:"break-word",b:553,y:"preserve",j:"absolute",z:1,yy:"nowrap",s:"Helvetica,Arial,Sans-Serif",aT:8,k:"div",aS:8,e:0,t:12,G:"#29AAE1",aU:8,r:"inline"},"92":{G:"#02FDFF",aU:8,aV:8,r:"inline",e:0.63988330696202533,s:"Arial,Helvetica,Sans-Serif",t:10,Z:"break-word",v:"bold",w:"V2.0 BETA<br>",j:"absolute",x:"visible",yy:"nowrap",k:"div",y:"preserve",z:17,aS:8,aT:8,a:269,b:708},"76":{w:"",h:"17",p:"no-repeat",x:"visible",a:0,q:"100% 100%",b:22,j:"absolute",aW:0,z:6,k:"div",c:386,d:303,r:"inline",cQ:1,e:0.24317642405063289,f:-180,cR:1},"82":{h:"49",p:"no-repeat",x:"visible",a:91,q:"100% 100%",b:493,j:"absolute",i:"videoWindow",z:19,k:"div",cY:"0",d:181,c:237,r:"inline",e:0},"87":{aU:8,G:"#02FDFF",aV:8,r:"inline",e:0.53392009493670889,s:"Helvetica,Arial,Sans-Serif",X:0,t:10,Z:"break-word",v:"bold",w:"Raspberry Pi Garage Interface<br>",j:"absolute",yy:"nowrap",x:"visible",k:"div",y:"preserve",Q:0,z:12,aS:8,R:"#02FDFF",S:0,a:163,aT:8,T:0,b:33},"77":{p:"no-repeat",c:209,q:"100% 100%",d:159,I:"None",e:0,J:"None",K:"None",L:"None",h:"17",M:0,i:"stream",N:0,A:"#D8DDE4",x:"visible",j:"absolute",B:"#D8DDE4",k:"div",O:0,C:"#D8DDE4",z:18,P:0,D:"#D8DDE4",a:105,b:503},"83":{h:"22",p:"no-repeat",x:"visible",a:197,q:"100% 100%",b:324,j:"absolute",r:"inline",c:21,k:"div",z:8,d:21},"88":{h:"17",p:"no-repeat",x:"visible",a:28,q:"100% 100%",aW:0,j:"absolute",b:432,z:5,k:"div",c:386,d:303,r:"inline",e:0.24317642405063289},"78":{h:"24",p:"no-repeat",x:"visible",a:192,q:"100% 100%",b:328,j:"absolute",r:"inline",c:30,k:"div",z:10,d:23}}}],{},g,{},null,false,true,-1,true,true,true,true);f[c]=a.API;document.getElementById(e).setAttribute("HYP_dn",
c);a.z_o(this.body)})();})();
