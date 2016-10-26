(function($,w,d){
        function WishWall (){
            this.flag =false;
            this.footer =$("#footer");
            this.winW =$(window).width()-220;
            this.winH =$(window).height()-400;
            this.textArr=["加油....","学如逆水行舟","孙家瑞最帅"];//初始化文本
            this.init();
        }
        WishWall.prototype = {
            init:function(){
                var _this =this;
                this.createWish();
                this.eventDarg(_this);
                this.eachWish();
            },
            getColor:function(){  //获取颜色值
                var color="#";
                var colorArr=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];
                for(var i=0;i<6;i++){
                    var cur=randomNum(15,0);
                    color+=colorArr[cur];
                }
                function randomNum(max,min){
                    return Math.floor(Math.random()*(max-min+1)+min)
                }
                return color;
            },
            moldbox:function(top,left,col,text){ // 许愿模板
                var  moldbox='<div class="box" style="top:'+top+'px; left:'+left+'px;background:'+col+'">'+
                    '<span>×</span>'+
                    '<p class="close">'+text+'</p>'+
                    '</div>';
                this.footer.append(moldbox);
            },
            createWish:function(){		//创建许愿
                var  _this = this;
                $(".text").bind('keyup', function (e) {
                    var key = e.which;
                    if (key == 13) {
                        if(!$(".text").val()==""){
                            e.preventDefault();
                            var color =_this.getColor();
                            var text =$(".text").val();
                            var top =parseInt(Math.random()*_this.winH); //获取随机数X 轴坐标
                            var left=parseInt(Math.random()*_this.winW); //获取随机数Y 轴坐标
                            $(".text").val("");
                            _this.moldbox(top,left,color,text);
                            _this.closeWish();
                            return false
                        }else{
                            return false;

                        }
                    }
                });
            },
            eventDarg:function(m){  //拖动事件
                $(document).delegate(".box","mousedown",function(e){
                    var  event = e || event;
                    $this=$(this);
                    m.flag =true;
                    T= e.pageY - $(this).offset().top;
                    L= e.pageX - $(this).offset().left;
                    $(document).mousemove(function(e){
                        if(m.flag){
                            var  event = e || event;
                            X=	event.clientX -L;
                            Y=	event.clientY -T;
                            if(X<0){
                                X=0
                            }else if(X>m.winW){
                                X =m.winW;
                            }
                            if(Y<0){
                                Y=0
                            }else if(Y> m.winH){
                                Y = m.winH;
                            }
                            $this.css({
                                "top":Y+"px",
                                "left":X+"px",
                                "z-index":"1"
                            });
                            $this.siblings().css({ "z-index":"0"  });
                        }
                    });
                });
                $(document).on("mouseup",function(){
                    m.flag =false;
                });
            },
            closeWish:function(){   //移除许愿事件
                $(".box").on("click","span",function(){
                    $(this).parent().remove();
                });
            },
            eachWish:function(){   //随机创建许愿文本
                var _this =this;
                $.each(_this.textArr,function(i,d){
                    var col=_this.getColor();
                    var top =parseInt(Math.random()*_this.winH); //获取随机数X 轴坐标
                    var left=parseInt(Math.random()*_this.winW);  //获取随机数Y 轴坐
                    _this.moldbox(top,left,col,d);
                    _this.closeWish();
                });
            }
        };
        window.WishWall=WishWall
    })(jQuery,window,document);
