document.addEventListener('readystatechange',function(){
 if(document.readyState==='complete'){
   var audio=document.querySelector('audio');
   var btnplay=document.querySelector('#btnplay');
     //播放暂停
     btnplay.onclick=function(){
     	if(audio.paused){
     		audio.play();
     	}else{
     		audio.pause();
     	}
     }
     audio.onplay=function(){
     	btnplay.className="pause_bt"
     }
     audio.onpause=function(){
     	btnplay.className="play_bt"
     }

     //音量
     var vol=document.querySelector('#spanvolumeop');
     var vol2=document.querySelector('#spanvolumebar');
     var spanmute=document.querySelector('#spanmute');
     var spanvolume=document.querySelector('#spanvolume');
     spanvolume.onclick=function(ev){
     	var v=ev.offsetX/this.offsetWidth;
     	audio.volume=v;
     }
     vol.onclick=function(ev){
        ev.stopPropagation();
    }
    audio.onvolumechange=function(){

      if(audio.volume===0){
         spanmute.className='volume_mute';
     }else{
         spanmute.className='volume_icon';
     }
     vol.style.left=audio.volume*100+"%";
     vol2.style.width=audio.volume*100+"%";

 }
     //静音

     spanmute.onclick=(function(){
        var oldvolume;
        return function(){
         if(audio.volume!=0){
            oldvolume=audio.volume;
            audio.volume=0;

        }else{
            audio.volume=oldvolume;
        } 
    }
})();
    // 音乐库
    var divsonglist=document.querySelector('#divsonglist');
    var yinyueku=[
    {name:"好久不见",src:"./001.mp3",geshou:"陈奕迅",duration:"4:10"},
    {name:"十年",src:"./002.mp3",geshou:"陈奕迅",duration:"3:24"},
    {name:"闹够了没有",src:"./003.mp3",geshou:"赖伟峰",duration:"3:58"},
    {name:"一千年以后",src:"./004.mp3",geshou:"林俊杰",duration:"3:47"},
    {name:'胡歌 - 忘记时间',src:'005.mp3',geshou:'胡歌',duration:'4:32'},
    {name:'模特',src:'006.mp3',geshou:'李荣浩',duration:'5:06'},
    {name:'张敬轩-吻得太逼真',src:'007.mp3',geshou:'张敬轩',duration:'3:51'}
    ];
    var currentsongindex;//记录当前几首歌
    var LIEBIAO=3,SHUNXU=2,DANQU=1,SUIJI=4;
    var currentbofangway=LIEBIAO;
     var lis=divsonglist.firstElementChild.children;
    var createList = function(){
        var el='';
        for(var i=0;i<yinyueku.length;i++){
           var ac=(i==currentsongindex)?'play_current':'';
           el+='<li mid="j0" class="'+ac+'" > <strong class="music_name" title="'+yinyueku[i].name+'">'+yinyueku[i].name+'</strong> <strong class="singer_name">'+yinyueku[i].geshou+'</strong> <strong class="play_time">'+yinyueku[i].duration+'</strong><div class="list_cp"><strong class="btn_like" title="喜欢" name="myfav_0038RM350w8m1V" mid="0038RM350w8m1V"><span>我喜欢</span></strong><strong class="btn_share" title="分享"><span>分享</span></strong><strong class="btn_fav" title="收藏到歌单"><span>收藏</span></strong><strong class="btn_del" title="从列表中删除"><span>删除</span></strong></div></li>';
       }
       divsonglist.firstElementChild.innerHTML=el;
       spansongnum1.innerHTML='<span>'+yinyueku.length+'</span>';

    for(var i=0;i<lis.length;i++){
        lis[i].index=i;
        lis[i].onclick=function(){
            audio.src=yinyueku[this.index].src;
            currentsongindex=this.index;
            audio.play();
            onsongchange();
        }
        //隐藏
        lis[i].onmouseover=function(){
            this.classList.add('play_hover')
        }
        lis[i].onmouseout=function(){
            this.classList.remove('play_hover')
        }
    }
        //删除
        var dels=document.querySelectorAll('.btn_del');
        for(var i=0;i<dels.length;i++){
            dels[i].index=i;
            dels[i].onclick=function(e){
                e.stopPropagation();
                var newarr=[];
                for(var i=0;i<yinyueku.length;i++){
                    if(yinyueku[this.index]!=yinyueku[i]){
                       newarr.push(yinyueku[i]);
                   }
               }
               yinyueku=newarr;
               if(this.index<currentsongindex){
                currentsongindex-=1;
            }
            createList();
            if(this.index==currentsongindex){
                if(this.index==yinyueku.length){
                    audio.src='';
                    uireset();
                }else if(this.index!=currentsongindex){
                    audio.src=yinyueku[currentsongindex].src;
                    audio.play();
                    onsongchange();
                }

            }
                /*var that=this;
                yinyueku=yinyueku.filter(function(value){
                    return yinyueku[that.index]!=value;
                })*/
 
    }
}
 
}
createList();//调用
//清空列表
clear_list.onclick=function(){
    yinyueku=[];
    createList();
    uireset();
}
var uireset=function(){
    document.querySelector('.music_name').innerHTML='<span>听我想听的歌</span>';
    document.querySelector('.singer_name').innerHTML='<span>QQ音乐</span>';
    ptime.innerHTML='';
    document.querySelector('.music_op').style.display='none';
    btnplay.className='play_bt';
    audio.src='';
    spanprogress_op.style.left=0;
    spanplaybar.style.width=0;
}

   //换歌
   var onsongchange=function(){
    for(var i=0;i<lis.length;i++){
        lis[i].classList.remove('play_current');
    }
    lis[currentsongindex].classList.add('play_current');

    document.querySelector('.music_name').innerHTML=yinyueku[currentsongindex].name;
    document.querySelector('.singer_name').innerHTML=yinyueku[currentsongindex].geshou;
    document.querySelector('.music_op').style.display='block';
    document.querySelector('.play_date').innerHTML=yinyueku[currentsongindex].duration;

}
    // 切歌
    var nextSong=function(){
        if(currentsongindex==undefined)
            return;
        if(currentbofangway==SUIJI){
            randomSong();
            return;
        }
        currentsongindex+=1;
        currentsongindex=(currentsongindex==yinyueku.length)?0:currentsongindex;
        audio.src=yinyueku[currentsongindex].src;
        audio.play();
        onsongchange();
    }
    var prevSong=function(){
        if(currentsongindex==undefined)
            return;
        if(currentbofangway==SUIJI){
            randomSong();
            return;
        }
        currentsongindex-=1;
        currentsongindex=(currentsongindex==-1)?yinyueku.length-1:currentsongindex;
        audio.src=yinyueku[currentsongindex].src;
        audio.play();
        onsongchange();
    }
    document.querySelector('.next_bt').onclick=nextSong;
    document.querySelector('.prev_bt').onclick=prevSong;


    //进度条时间显示
    var timeShow= document.querySelector('.time_show');
    var zhuanhuan=function(time){
        var minutes=parseInt(time/60);
        var s=parseInt(time-minutes*60);
        minutes=(minutes<10)?('0'+minutes):minutes;
        s=(s<10)?('0'+s):s;
        return minutes+':'+s;
    }
    //进度条
    downloadbar.onmouseover=spanplaybar.onmouseover=function(ev){
        timeShow.style.display='block';
        timeShow.style.left=ev.offsetX-timeShow.offsetWidth/2+"px";
        var time=ev.offsetX/spanplayer_bgbar.offsetWidth*audio.duration;
        timeShow.firstElementChild.innerHTML=zhuanhuan(time);
        downloadbar.onmousemove=function(ev){
            timeShow.style.left=ev.offsetX-timeShow.offsetWidth/2+'px';
            var time=ev.offsetX/spanplayer_bgbar.offsetWidth*audio.duration;
            timeShow.firstElementChild.innerHTML=zhuanhuan(time);
        }
    }
    downloadbar.onmouseout = spanplaybar.onmouseout = function (ev){
        timeShow.style.display = "none"
    }
    downloadbar.onclick=function(ev){
        audio.currentTime=ev.offsetX/spanplayer_bgbar.offsetWidth*audio.duration;
    }
    spanplaybar.onclick=function(ev){
        audio.currentTime=ev.offsetX/spanplayer_bgbar.offsetWidth*audio.duration;
    }
    audio.ontimeupdate=function(){
        spanprogress_op.style.left=this.currentTime/this.duration*100+'%';
        spanplaybar.style.width=this.currentTime/this.duration*100+'%';
        

        if(audio.ended){
            if(currentbofangway==DANQU){
                audio.play();
            }else if(currentbofangway==LIEBIAO){
                nextSong();
            }else if(currentbofangway==SUIJI){
                randomSong();
            }else if(currentbofangway==SHUNXU){
                if(currentsongindex!=yinyueku.length-1){
                    nextSong();
                }
            }
        } 
    }
    var randomSong=function(){
        currentsongindex=Math.floor(Math.random()*yinyueku.length);
        audio.src=yinyueku[currentsongindex].src;
        audio.play();
        onsongchange();
    }
    
    

    //播放顺序
    btnPlayway.onclick=function(){
       divselect.style.display='block';  
   }
   setbofangway=function(num){
    currentbofangway=num;
    divselect.style.display='none';
    var date={
            1:'cycle_single_bt',//单曲
            2:'ordered_bt',//顺序
            3:'cycle_bt',  //列表
            4:'unordered_bt'//随机
        }
        btnPlayway.className=date[num];
    }
 //收起
 

     var flag=true;
    btnfold.onclick=function(){
      if(flag){
        divplayframe.style.display="none"; 
        animate(divplayframe,{opacity:0},300);
        animate(divplayer,{left:-540},500,Tween.Linear);
        //divplayer.style.left="-540px";
        divplayer.classList.add("m_player_folded");
        flag=false;
      }else{
        animate(divplayer,{left:0},500,Tween.Linear);
        //divplayer.style.left="0px";
        divplayer.classList.remove("m_player_folded");
        flag=true;
      }
      
    }
     var flag1=true;
     spansongnum1.onclick=function(){
       if(flag1){
         divplayframe.style.display="block";
         animate(divplayframe,{opacity:1},300);

         flag1=false;
       }else{
         divplayframe.style.display="none";
         animate(divplayframe,{opacity:0},300);
         flag1=true;
       }
   
     }
btnclose.onclick=function(){
    divplayframe.style.display="none";
         animate(divplayframe,{opacity:0},300);
   }


}
},false)