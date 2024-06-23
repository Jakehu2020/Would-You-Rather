var buttons = [document.querySelector(".replit-auth-button"),document.querySelector(".rather1"),document.querySelector(".rather2")];
function showRates(v1,v2,clc){
  if(USERNAME == ""){
    notify("You aren't logged in yet.")
  }
  console.log(clc==1?clc:0);
  v1 = Math.abs(v1);
  v1 += clc==1?1:0;
  v2 = Math.abs(v2);
  v2 += clc==2?1:0;
  let v1Percentage = ((v1)/(v1+v2))*100; // v1 = 1, v2 = 1 => v1 Percentage = (1/(1+1))*100 = (0.5)*100 = 50!
  let v2Percentage = 100-v1Percentage // easier calculation so they add to 100, e.g. 33% and 66% = 99%...
  buttons[1].innerHTML = Math.round(v1Percentage) + "%";
  buttons[2].innerHTML = Math.round(v2Percentage) + "%";
  fetch(location.href.endsWith("/")?"/":"/question/"+ID, {
            method: "POST",
            body: JSON.stringify({
              clc
            }),
            headers: {
              "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
        }).then(res => res.text()).then(result => {
            console.log(result);
        });
  fetch("/answered/"+ID, {
    method: "POST",
  }).then(res => res.text()).then(result => {
    if(result == "y"){
      notify("You have already answered this question.")
    }
  })
}

let notifications = [];
function notify(text){
  let k = notifications.length * 1
  const ele = document.createElement("div");
  ele.className = "notification"
  ele.innerHTML = text;
  ele.style.top = `${notifications.length * 100 + 40}px`;
  ele.style.right = `-30px`; // 55
  ele.right = -30
  let i = setInterval(()=>{
    ele.right += (25 - ele.right)/5;
    ele.style.right = `${ele.right}px`;
    if (ele.right == 25){
      clearInterval(i)
    }
  }, 5);
  ele.addEventListener("click",()=>{
    ele.remove();
    notifications.splice(notifications.indexOf(ele), 1);
  })
  const timer = document.createElement("div");
  timer.className = "timer_notify";
  timer.width = 100;
  ele.appendChild(timer);
  let I = setInterval(()=>{
    if(timer.width < 0){
      clearInterval(I);
      ele.remove();
      notifications.splice(notifications.indexOf(ele), 1);
    }
    timer.width -= 1;
    ele.style.top = `${notifications.indexOf(ele) * 100 + 40}px`;
    timer.style.width = timer.width + "%"
  },15)
  document.body.appendChild(ele);
  notifications.push(ele);
}

let menu = document.querySelector(".menu"), opened = false;
function openMenu(){
  opened = true
  document.querySelector('.menu').classList.add('menuopen');
  document.querySelectorAll('.b').forEach(e => e.style.opacity = 1)
}
function closeMenu(){
  opened = false
  document.querySelector('.menu').classList.remove('menuopen');
  document.querySelectorAll('.b').forEach(e => e.style.opacity = "0")
}
function toggle(){
  if(opened){ closeMenu() }
  else { openMenu() }
}
menu.addEventListener("mouseover",toggle);
menu.addEventListener("mouseout",toggle);
document.querySelector(".b1").addEventListener('click',()=>{ location.href = "/new" });
document.querySelector(".b2").addEventListener('click',()=>{ location.href = "/gallery" });
document.querySelector(".b3").addEventListener('click',()=>{ location.href = "/" });