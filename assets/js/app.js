
const legacyData = [
  {label:"創團", generation:"創團", president:"闕玉婷 Michelle", sponsor:"傅聰敏", chair:"闕河生"},
  {label:"02", generation:"第二屆", president:"蔡俊賢 Otis", sponsor:"唐得君 Elec", chair:"崔宏興 Insurance"},
  {label:"03", generation:"第三屆", president:"楊明勳 Mitch", sponsor:"闕河生", chair:"林朝廷"},
  {label:"04", generation:"第四屆", president:"蘇柏瑋 Po", sponsor:"廖信雄 Stephen", chair:"林光裕"},
  {label:"05", generation:"第五屆", president:"林雅雯 Wendy", sponsor:"詹信忠 Water", chair:"唐得君 Elec"},
  {label:"06", generation:"第六屆", president:"高暐盈 Willie", sponsor:"蕭錦權 Franklin", chair:"林鍵誠 Jason"},
  {label:"07", generation:"第七屆", president:"李炯毅 Jerry", sponsor:"崔宏興 Insurance", chair:"廖信雄 Stephen"},
  {label:"08", generation:"第八屆", president:"高嘉珮 Peggy", sponsor:"陳賜榮 Kevin", chair:"詹信忠 Water"},
  {label:"09", generation:"第九屆", president:"黃慶雲 Ricky", sponsor:"黃文峰 Eric", chair:"蕭錦權 Franklin"},
  {label:"10", generation:"第十屆", president:"林茂荃 Jimmy", sponsor:"薛錫樑 House", chair:"陳賜榮 Kevin"},
  {label:"11", generation:"第十一屆", president:"楊閔 Yamil", sponsor:"楊承儒 Office", chair:"黃文峰 Eric"},
  {label:"12", generation:"第十二屆", president:"周辰汶 Wendy", sponsor:"游文杰 Motor", chair:"薛錫樑 House"},
  {label:"13", generation:"第十三屆", president:"陳奕勳 Jack", sponsor:"林鍵誠 Jason", chair:"楊承儒 Office"},
  {label:"14", generation:"第十四屆", president:"黃政瑋 Paul", sponsor:"王世欽 Keith", chair:"王世欽 Keith"},
  {label:"15", generation:"第十五屆", president:"賴恩廷 Rex", sponsor:"顏仲謙 Andy", chair:"林鍵誠 Jason"},
  {label:"16", generation:"第十六屆", president:"韓一晴 Alice", sponsor:"林孟盛 Jack", chair:"王世欽 Keith"},
  {label:"17", generation:"第十七屆", president:"詹湘樺 Katherine", sponsor:"葉銘功 Lawyer", chair:"顏仲謙 Andy"},
  {label:"18", generation:"第十八屆", president:"許惠渝 Stella", sponsor:"楊文良 Young", chair:"林孟盛 Jack"},
  {label:"19", generation:"第十九屆", president:"林宏宇 Frank", sponsor:"梁世倫 Allen", chair:"葉銘功 Lawyer"},
  {label:"20", generation:"第二十屆", president:"葉一鳴 Kevin", sponsor:"程普中 Mercedes", chair:"楊文良 Young"},
  {label:"21", generation:"第二十一屆", president:"陳鈺聖 Arcen", sponsor:"李成偉 Chuck", chair:"梁世倫 Allen"},
  {label:"22", generation:"第二十二屆", president:"呂姵萱 Melody", sponsor:"黃立忠 Alex", chair:"程普中 Mercedes"},
  {label:"23", generation:"第二十三屆", president:"吳任哲 Eric", sponsor:"陳力豪 Howard", chair:"李成偉 Chuck"},
  {label:"24", generation:"第二十四屆", president:"孫恩毅 Leo", sponsor:"許福源 Terry", chair:"黃立忠 Alex"}
];


function shortName(full){
  const parts = full.split(" ");
  return parts.length > 1 ? parts[parts.length - 1] : full.slice(0,2);
}
function renderLegacy(activeIndex = legacyData.length - 1){
  const tabs = document.querySelector(".legacy-tabs");
  const card = document.querySelector(".legacy-card");
  tabs.innerHTML = legacyData.map((item,i)=>`<button class="legacy-tab ${i===activeIndex ? "active" : ""}" data-i="${i}">${item.label}｜${shortName(item.president)}</button>`).join("");
  const item = legacyData[activeIndex];
  card.innerHTML = `<div><h3>${item.generation}</h3><div class="president">${item.president}</div></div><div class="legacy-meta"><div><b>輔導社社長</b>${item.sponsor}</div><div><b>扶青社主委</b>${item.chair}</div></div>`;
  tabs.querySelectorAll("button").forEach(btn => btn.addEventListener("click",()=>renderLegacy(Number(btn.dataset.i))));
}

let musicPlayer;
let musicRequested = false;

function setMusicButton(isPlaying){
  const button = document.querySelector(".music-btn");
  if(!button) return;
  button.classList.toggle("is-playing", isPlaying);
  button.setAttribute("aria-pressed", String(isPlaying));
  button.setAttribute("aria-label", isPlaying ? "暫停背景音樂" : "播放背景音樂");
  button.title = isPlaying ? "暫停背景音樂" : "播放背景音樂";
}

window.onYouTubeIframeAPIReady = function(){
  musicPlayer = new YT.Player("youtube-music-player", {
    videoId:"Ip7uh4gbW8k",
    playerVars:{autoplay:0,controls:0,disablekb:1,loop:1,playlist:"Ip7uh4gbW8k",playsinline:1},
    events:{
      onReady:event=>{
        event.target.setVolume(45);
        if(musicRequested) event.target.playVideo();
      },
      onStateChange:event=>setMusicButton(event.data === YT.PlayerState.PLAYING),
      onError:()=>{
        const button = document.querySelector(".music-btn");
        setMusicButton(false);
        if(button) button.title = "這首音樂目前無法播放";
      }
    }
  });
};

function setup(){
  renderLegacy();

  const progress = document.querySelector(".progress");
  const topBtn = document.querySelector(".top-btn");
  const musicBtn = document.querySelector(".music-btn");
  const heroBg = document.querySelector(".hero-bg");
  const heroCard = document.querySelector(".hero-card");
  const navLinks = [...document.querySelectorAll(".nav a")];
  const sections = navLinks.map(a => document.querySelector(a.getAttribute("href"))).filter(Boolean);

  let ticking = false;
  function onScroll(){
    if(ticking) return;
    ticking = true;
    requestAnimationFrame(()=>{
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const y = window.scrollY || 0;
      progress.style.width = `${Math.min(100, y / max * 100)}%`;
      if(heroBg) heroBg.style.transform = `scale(1.03) translateY(${Math.min(44, y * .055)}px)`;
      topBtn.style.display = y > 420 ? "block" : "none";
      let current = sections[0]?.id;
      sections.forEach(sec => { if(sec.getBoundingClientRect().top < window.innerHeight * .42) current = sec.id; });
      navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === `#${current}`));
      ticking = false;
    });
  }
  window.addEventListener("scroll", onScroll, {passive:true});
  topBtn.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));
  musicBtn?.addEventListener("click",()=>{
    if(!musicPlayer?.getPlayerState){
      musicRequested = true;
      return;
    }
    const isPlaying = musicPlayer.getPlayerState() === YT.PlayerState.PLAYING;
    musicRequested = !isPlaying;
    isPlaying ? musicPlayer.pauseVideo() : musicPlayer.playVideo();
  });

  if(heroCard){
    window.addEventListener("mousemove",(e)=>{
      if(window.innerWidth < 821) return;
      const x = (e.clientX / window.innerWidth - .5) * 8;
      const y = (e.clientY / window.innerHeight - .5) * -8;
      heroCard.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    });
  }

  const detail = document.querySelector(".details-toggle");
  if(detail){
    const summary = detail.querySelector("summary");
    detail.addEventListener("toggle",()=>summary.textContent = detail.open ? "收起完整典禮流程 ▲" : "查看完整典禮流程 ▼");
  }

  document.querySelectorAll(".story").forEach(story=>{
    story.addEventListener("toggle",()=>{
      if(story.open){
        document.querySelectorAll(".story").forEach(other=>{ if(other !== story) other.open = false; });
      }
    });
  });

  const io = new IntersectionObserver(entries => entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add("visible"); }), {threshold:.12});
  document.querySelectorAll(".reveal").forEach(el=>io.observe(el));
}
document.addEventListener("DOMContentLoaded", setup);
